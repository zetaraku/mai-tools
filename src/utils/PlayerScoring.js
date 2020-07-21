/* eslint-disable camelcase */

import {
  getEmptyPlayerPerformance,
} from '@/utils/DataProvider';
import * as Constants from '@/assets/constants';

export default class PlayerScoring {
  constructor(
    songScoring,
    playerPerformance = getEmptyPlayerPerformance(),
  ) {
    this.songScoring = songScoring;
    this.playerPerformance = playerPerformance;
  }

  /* Player note counts */

  get totalNoteCount() {
    return Constants.noteTypes
      .map(noteType => this.noteCountsOf(noteType))
      .reduce((acc, e) => acc + e, 0);
  }

  noteCountsOf(noteType) {
    return Constants.judgementTypes
      .map(judgementType => {
        if (noteType !== 'BREAK') {
          return this.playerPerformance[noteType][judgementType];
        }
        return Constants.judgementSubtypes[judgementType]
          .map(
            judgementSubtype => this.playerPerformance[noteType][judgementType][judgementSubtype],
          )
          .reduce((acc, e) => acc + e, 0);
      })
      .reduce((acc, e) => acc + e, 0);
  }

  /* Player score subtotals */

  playerScoreSubtotalsOf_Finale(noteType) {
    return this.calcBasePlayerScoreSubtotals(
      noteType,
      this.songScoring.breakBonusScore_Finale,
      Constants.judgementToBonusRatio_Finale,
    );
  }

  playerScoreSubtotalsOf_DX(noteType) {
    return this.calcBasePlayerScoreSubtotals(
      noteType,
      this.songScoring.breakBonusScore_DX,
      Constants.judgementToBonusRatio_DX,
    );
  }

  playerDeluxeScoreSubtotalsOf(noteType) {
    return Constants.judgementTypes
      .map(judgementType => {
        let unitScore = Constants.judgementToDeluxeScore[judgementType];
        let unitCount = (noteType !== 'BREAK' ?
          this.playerPerformance[noteType][judgementType] :
          Constants.judgementSubtypes[judgementType]
            .map(
              judgementSubtype => this.playerPerformance[noteType][judgementType][judgementSubtype],
            )
            .reduce((acc, e) => acc + e, 0)
        );
        return (unitScore) * unitCount;
      })
      .reduce((acc, e) => acc + e, 0);
  }

  /* Player score subtotal percentages */

  playerScoreSubtotalPercentages_Finale(noteType) {
    let n = this.playerScoreSubtotalsOf_Finale(noteType);
    let d = this.songScoring.noteScoreSubtotalsOf_Finale(noteType);
    return (n / d) * 100;
  }

  playerScoreSubtotalPercentages_DX(noteType) {
    let n = this.playerScoreSubtotalsOf_DX(noteType);
    let d = this.songScoring.noteScoreSubtotalsOf_DX(noteType);
    return (n / d) * 100;
  }

  playerDeluxeScoreSubtotalPercentages(noteType) {
    let n = this.playerDeluxeScoreSubtotalsOf(noteType);
    let d = this.songScoring.noteDeluxeScoreSubtotalsOf(noteType);
    return (n / d) * 100;
  }

  /* Player score */

  get playerScore_Finale() {
    return Constants.noteTypes.reduce(
      (acc, noteType) => acc + this.playerScoreSubtotalsOf_Finale(noteType),
      0,
    );
  }

  get playerScore_DX() {
    return Constants.noteTypes.reduce(
      (acc, noteType) => acc + this.playerScoreSubtotalsOf_DX(noteType),
      0,
    );
  }

  get playerDeluxeScore() {
    return Constants.noteTypes.reduce(
      (acc, noteType) => acc + this.playerDeluxeScoreSubtotalsOf(noteType),
      0,
    );
  }

  /* Player achievement */

  get playerAchievement_Finale() {
    return (this.playerScore_Finale / this.songScoring.totalBaseScore) * 100.0;
  }

  get playerAchievement_DX() {
    return (this.playerScore_DX / this.songScoring.totalBaseScore) * 100.0;
  }

  get playerDeluxeAchievement() {
    return (this.playerDeluxeScore / this.songScoring.totalBaseDeluxeScore) * 100.0;
  }

  /* Player performance overview */

  playerPerformanceOverview(judgementType) {
    return Constants.noteTypes.map(noteType => {
      if (noteType !== 'BREAK') {
        return this.playerPerformance[noteType][judgementType];
      }
      return (
        Constants.judgementSubtypes[judgementType]
          .map(
            judgementSubtype => this.playerPerformance[noteType][judgementType][judgementSubtype],
          )
          .reduce((acc, e) => acc + e, 0)
      );
    }).reduce((acc, e) => acc + e, 0);
  }

  /* Player rank */

  get playerRank_Finale() {
    if (this.songScoring.totalBaseScore === 0) {
      return '--';
    }

    if (this.playerScore_Finale >= this.songScoring.totalBaseScore) {
      return 'SSS+';
    }

    let playerAchievement = this.playerAchievement_Finale;
    for (let { achievement, rank } of Constants.achievementToRank_Finale) {
      if (playerAchievement >= achievement) {
        return rank;
      }
    }

    return '--';
  }

  get playerRank_DX() {
    let playerAchievement = this.playerAchievement_DX;
    for (let { achievement, rank } of Constants.achievementToRank_DX) {
      if (playerAchievement >= achievement) {
        return rank;
      }
    }
    return '--';
  }

  get playerComboRank() {
    let breakPerfectCount = Constants.judgementSubtypes.PERFECT
      .map(
        judgementSubtype => this.playerPerformance.BREAK.PERFECT[judgementSubtype],
      )
      .reduce((acc, e) => acc + e, 0);

    if (this.playerPerformanceOverview('MISS') > 0) {
      return '--';
    }
    if (this.playerPerformanceOverview('GOOD') > 0) {
      return 'FC';
    }
    if (this.playerPerformanceOverview('GREAT') > 0) {
      return 'FC+';
    }
    if (breakPerfectCount > 0) {
      return 'AP';
    }
    if (this.playerPerformanceOverview('PERFECT') > 0) {
      return 'AP+';
    }
    if (this.playerPerformanceOverview('CRITICAL') > 0) {
      return 'AP+'; // All Critical Perfect
    }

    return '--';
  }

  /* Helper functions */

  calcBasePlayerScoreSubtotals(noteType, breakBonusScore, judgementToBonusRatio) {
    let baseUnitScore = Constants.noteToBaseScore[noteType];
    return Constants.judgementTypes
      .map(judgementType => {
        if (noteType !== 'BREAK') {
          let unitRatio = Constants.judgementToScoreRatio_NonBreak[judgementType];
          let unitScore = baseUnitScore * unitRatio;
          let unitCount = this.playerPerformance[noteType][judgementType];
          return (unitScore) * unitCount;
        }
        return Constants.judgementSubtypes[judgementType]
          .map(judgementSubtype => {
            let unitRatio = Constants.judgementToScoreRatio_Break[judgementType][judgementSubtype];
            let unitScore = baseUnitScore * unitRatio;
            let unitBonusRatio = judgementToBonusRatio[judgementType][judgementSubtype];
            let unitBonusScore = breakBonusScore * unitBonusRatio;
            let unitCount = this.playerPerformance[noteType][judgementType][judgementSubtype];
            return (unitScore + unitBonusScore) * unitCount;
          })
          .reduce((acc, e) => acc + e, 0);
      })
      .reduce((acc, e) => acc + e, 0);
  }

  isPlayerNoteCountMismatched(noteType) {
    return this.noteCountsOf(noteType) !== this.songScoring.noteCounts[noteType];
  }

  isPlayerTotalNoteCountMismatched() {
    return this.totalNoteCount !== this.songScoring.totalNoteCount;
  }
}
