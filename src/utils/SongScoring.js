/* eslint-disable camelcase */

import {
  getEmptySongNoteCounts,
} from '@/utils/DataProvider';
import * as Constants from '@/assets/constants';

export default class SongScoring {
  constructor(
    noteCounts = getEmptySongNoteCounts(),
  ) {
    this.noteCounts = noteCounts;
  }

  /* Total note count */

  get totalNoteCount() {
    return Constants.noteTypes
      .map(noteType => this.noteCounts[noteType])
      .reduce((acc, e) => acc + e, 0);
  }

  /* Total base */

  get totalBaseScore() {
    return Constants.noteTypes
      .map(noteType => Constants.noteToBaseScore[noteType] * this.noteCounts[noteType])
      .reduce((acc, e) => acc + e, 0);
  }

  get totalBaseDeluxeScore() {
    return Constants.noteTypes
      .map(noteType => Constants.noteToBaseDeluxeScore[noteType] * this.noteCounts[noteType])
      .reduce((acc, e) => acc + e, 0);
  }

  // eslint-disable-next-line class-methods-use-this
  get totalBaseAchievement() {
    return 100.0;
  }

  // eslint-disable-next-line class-methods-use-this
  get totalBaseDeluxeAchievement() {
    return 100.0;
  }

  /* Total bonus */

  get totalBonusScore_Finale() {
    return this.breakBonusScore_Finale * this.noteCounts.BREAK;
  }

  get totalBonusScore_DX() {
    return this.totalBaseScore * (this.totalBonusAchievement_DX / 100.0);
  }

  get totalBonusAchievement_Finale() {
    return (this.totalBonusScore_Finale / this.totalBaseScore) * 100.0;
  }

  // eslint-disable-next-line class-methods-use-this
  get totalBonusAchievement_DX() {
    return 1.0;
  }

  /* Note base */

  noteBaseAchievementsOf(noteType) {
    return (Constants.noteToBaseScore[noteType] / this.totalBaseScore) * 100.0;
  }

  noteBaseDeluxeAchievementsOf(noteType) {
    return (Constants.noteToBaseDeluxeScore[noteType] / this.totalBaseDeluxeScore) * 100.0;
  }

  /* Break bonus */

  // eslint-disable-next-line class-methods-use-this
  get breakBonusScore_Finale() {
    return 100;
  }

  get breakBonusScore_DX() {
    return this.totalBonusScore_DX / this.noteCounts.BREAK;
  }

  get breakBonusAchievement_Finale() {
    return (this.breakBonusScore_Finale / this.totalBaseScore) * 100.0;
  }

  get breakBonusAchievement_DX() {
    return this.totalBonusAchievement_DX / this.noteCounts.BREAK;
  }

  /* Note score subtotal */

  noteBaseScoreSubtotalsOf(noteType) {
    let baseUnitScore = Constants.noteToBaseScore[noteType];
    let unitCount = this.noteCounts[noteType];
    return baseUnitScore * unitCount;
  }

  noteScoreSubtotalsOf_Finale(noteType) {
    return (
      this.noteBaseScoreSubtotalsOf(noteType)
      + (noteType === 'BREAK' ? this.totalBonusScore_Finale : 0)
    );
  }

  noteScoreSubtotalsOf_DX(noteType) {
    return (
      this.noteBaseScoreSubtotalsOf(noteType)
      + (noteType === 'BREAK' ? this.totalBonusScore_DX : 0)
    );
  }

  noteDeluxeScoreSubtotalsOf(noteType) {
    let baseUnitScore = Constants.noteToBaseDeluxeScore[noteType];
    let unitCount = this.noteCounts[noteType];
    return baseUnitScore * unitCount;
  }

  /* Note achievement subtotal */

  noteBaseAchievementSubtotalsOf(noteType) {
    return (this.noteBaseScoreSubtotalsOf(noteType) / this.totalBaseScore) * 100.0;
  }

  get bonusAchievementSubtotalsOf_Finale() {
    return (this.totalBonusScore_Finale / this.totalBaseScore) * 100.0;
  }

  get bonusAchievementSubtotalsOf_DX() {
    return (this.totalBonusScore_DX / this.totalBaseScore) * 100.0;
  }

  noteDeluxeAchievementSubtotalsOf(noteType) {
    return (this.noteDeluxeScoreSubtotalsOf(noteType) / this.totalBaseDeluxeScore) * 100.0;
  }
}
