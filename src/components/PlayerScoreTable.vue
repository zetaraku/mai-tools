<template>
  <div>
    <table>
      <thead>
        <tr>
          <th rowspan="2" class="note-type">NOTE 類型</th>
          <th rowspan="2" class="note-count">NOTE 數量</th>
          <th colspan="5">玩家表現</th>
          <th colspan="3">成績總結</th>
        </tr>
        <tr>
          <th class="judgement-type"
            v-for="judgementType in Constants.judgementTypes" :key="judgementType"
          >
            {{ judgementType }}<br />
            {{
              Constants.judgementToScoreRatio_NonBreak[judgementType] * 100
            }}% / DX: {{
              Constants.judgementToDeluxeScore[judgementType]
            }}<br />
          </th>
          <th class="player-score">
            舊版 maimai<br />計分方式
          </th>
          <th class="player-score">
            新版 maimai DX<br />計分方式
          </th>
          <th class="player-score">
            新版 DX SCORE<br />計分方式
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="noteType in Constants.noteTypes" :key="noteType">
          <th name="note-type">
            {{ noteType.toUpperCase() }}
          </th>
          <td name="note-count"
            :class="playerScoring.isPlayerNoteCountMismatched(noteType) && 'invalid-note-count'"
          >
            <b>{{ playerScoring.noteCountsOf(noteType) }}</b>
            /
            <input type="number" v-model.number="songScoring.noteCounts[noteType]" disabled>
          </td>
          <td v-for="judgementType in Constants.judgementTypes" :key="judgementType">
            <template v-if="noteType !== 'BREAK'">
              <div>
                <input type="number" :min="0"
                  v-model.number="playerScoring.playerPerformance[noteType][judgementType]"
                />
              </div>
            </template>
            <template v-else>
              <div
                v-for="judgementSubtype in Constants.judgementSubtypes[judgementType]"
                :key="judgementSubtype"
              >
                <small><b><i>{{
                  judgementSubtype
                }}pt:
                <br />
                {{
                  Constants.judgementToScoreRatio_Break[judgementType][judgementSubtype] * 100
                }}% [+{{
                  Constants.judgementToBonusRatio_DX[judgementType][judgementSubtype] * 100
                }}%]</i></b></small>
                <input
                  type="number" :min="0"
                  v-model.number="
                    playerScoring.playerPerformance[noteType][judgementType][judgementSubtype]
                  "
                />
                <br />
              </div>
            </template>
          </td>
          <td name="maimai-score-result">
            <b>{{ playerScoring.playerScoreSubtotalsOf_Finale(noteType).toFixed(0) }}</b>
            <progress-bar
              :max="100"
              :val="playerScoring.playerScoreSubtotalPercentages_Finale(noteType)"
            ></progress-bar>
            <!-- <b>{{ songScoring.noteScoreSubtotalsOf_Finale(noteType).toFixed(0) }}</b> -->
          </td>
          <td name="maimaidx-score-result">
            <b>{{ playerScoring.playerScoreSubtotalsOf_DX(noteType).toFixed(0) }}</b>
            <progress-bar
              :max="100"
              :val="playerScoring.playerScoreSubtotalPercentages_DX(noteType)"
            ></progress-bar>
            <!-- <b>{{ songScoring.noteScoreSubtotalsOf_DX(noteType).toFixed(0) }}</b> -->
          </td>
          <td name="maimaidx-deluxe-score-result">
            <b>{{ playerScoring.playerDeluxeScoreSubtotalsOf(noteType).toFixed(0) }}</b>
            <progress-bar
              :max="100"
              :val="playerScoring.playerDeluxeScoreSubtotalPercentages(noteType)"
            ></progress-bar>
            <!-- <b>{{ songScoring.noteDeluxeScoreSubtotalsOf(noteType).toFixed(0) }}</b> -->
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>總計</th>
          <td
            :class="playerScoring.isPlayerTotalNoteCountMismatched() && 'invalid-note-count'"
          >
            <b>{{ playerScoring.totalNoteCount }} / {{ songScoring.totalNoteCount }}</b>
          </td>
          <td v-for="judgementType in Constants.judgementTypes" :key="judgementType">
            <b>{{ playerScoring.playerPerformanceOverview(judgementType) }}</b>
          </td>
          <td class="player-result">
            <b>{{ playerScoring.playerScore_Finale.toFixed(0) }}</b><br />
            <b>({{ playerScoring.playerAchievement_Finale.toFixed(2) }}%)</b><br />
            <b>{{ playerScoring.playerRank_Finale }} / {{ playerScoring.playerComboRank }}</b><br />
          </td>
          <td class="player-result">
            <b>{{ playerScoring.playerScore_DX.toFixed(0) }}</b><br />
            <b>({{ playerScoring.playerAchievement_DX.toFixed(4) }}%)</b><br />
            <b>{{ playerScoring.playerRank_DX }} / {{ playerScoring.playerComboRank }}</b><br />
          </td>
          <td class="player-result">
            <b>{{ playerScoring.playerDeluxeScore }}</b><br />
            <!-- <b>({{ playerScoring.playerDeluxeAchievement.toFixed(4) }}%)</b><br /> -->
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import ProgressBar from 'vue-simple-progress';
import * as Constants from '@/assets/constants';

export default {
  components: {
    ProgressBar,
  },
  props: ['songScoring', 'playerScoring'],
  data() {
    return {
      Constants,
    };
  },
};
</script>

<style lang="scss" scoped>

</style>
