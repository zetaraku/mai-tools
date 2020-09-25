<template>
  <div class="SongScoreTable">
    <table>
      <thead>
        <tr>
          <th rowspan="2" class="note-type">NOTE 類型</th>
          <th rowspan="2" class="note-count">NOTE 數量</th>
          <th colspan="2">舊版 maimai 計分方式</th>
          <th colspan="2">新版 maimai DX 計分方式</th>
          <th colspan="2">新版 DX SCORE 計分方式</th>
        </tr>
        <tr>
          <th class="unit-score">單位分數</th>
          <th class="group-score">整體佔分</th>
          <th class="unit-score">單位分數</th>
          <th class="group-score">整體佔分</th>
          <th class="unit-score">單位分數</th>
          <th class="group-score">整體佔分</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="noteType in Constants.noteTypes" :key="noteType">
          <th name="note-type">
            {{ noteType }}
          </th>
          <td name="note-count" :class="isNoteCountValid(noteType) || 'invalid-note-count'">
            <input type="number"
              :min="noteType === 'BREAK' ? 1 : 0"
              v-model.number="songScoring.noteCounts[noteType]"
            >
            <vue-slider
              :min="noteType === 'BREAK' ? 1 : 0" :max="1000"
              v-model.number="songScoring.noteCounts[noteType]"
              drag-on-click
            ></vue-slider>
          </td>
          <td name="maimaifinale-score">
            <div name="text">
              {{
                Constants.noteToBaseScore[noteType]
              }}<template v-if="noteType === 'BREAK'"> + {{
                songScoring.breakBonusScore_Finale
              }}</template>
              <br />
              <template v-if="noteType !== 'BREAK'">(<b>{{
                songScoring.noteBaseAchievementsOf(noteType).toFixed(2)
              }}%</b>)</template>
              <template v-else>(<b>{{
                (
                  songScoring.noteBaseAchievementsOf(noteType)
                  + songScoring.breakBonusAchievement_Finale
                ).toFixed(2)
              }}%</b>)</template>
            </div>
            <div name="bar">
              <progress-bar
                :max="1.0 * 100"
                :val="songScoring.noteBaseAchievementsOf(noteType) * 100"
              ></progress-bar>
              <template v-if="noteType === 'BREAK'">
                <progress-bar
                  :max="1.0 * 100"
                  bar-color="yellow" bg-color="darkgray"
                  :val="songScoring.breakBonusAchievement_Finale * 100"
                ></progress-bar>
              </template>
            </div>
          </td>
          <td name="maimaifinale-group-score">
            <div name="text">
              <b>{{
                songScoring.noteBaseScoreSubtotalsOf(noteType).toFixed(0)
              }}</b><template v-if="noteType === 'BREAK'"> + <b>{{
                songScoring.totalBonusScore_Finale
              }}</b></template>
              <br />
              (<b>{{
                songScoring.noteBaseAchievementSubtotalsOf(noteType).toFixed(2)
              }}%</b><template v-if="noteType === 'BREAK'"> + <b>{{
                songScoring.bonusAchievementSubtotalsOf_Finale.toFixed(2)
              }}%</b></template>)
            </div>
            <div name="bar">
              <progress-bar
                :max="100.0 * 100"
                :val="songScoring.noteBaseAchievementSubtotalsOf(noteType) * 100"
              ></progress-bar>
              <template v-if="noteType === 'BREAK'">
                <progress-bar
                  :max="100.0 * 100"
                  bar-color="yellow" bg-color="darkgray"
                  :val="songScoring.bonusAchievementSubtotalsOf_Finale * 100"
                ></progress-bar>
              </template>
            </div>
          </td>
          <td name="maimaidx-score">
            <div name="text">
              {{
                Constants.noteToBaseScore[noteType]
              }}<template v-if="noteType === 'BREAK'"> + <b>{{
                songScoring.breakBonusScore_DX.toFixed(0)
              }}</b></template>
              <br />
              (<b>{{
                songScoring.noteBaseAchievementsOf(noteType).toFixed(4)
              }}%</b><template v-if="noteType === 'BREAK'"> + <b>{{
                songScoring.breakBonusAchievement_DX.toFixed(4)
              }}</b></template>)
            </div>
            <div name="bar">
              <progress-bar
                :max="100"
                :val="songScoring.noteBaseAchievementsOf(noteType) * 100.0"
              ></progress-bar>
              <template v-if="noteType === 'BREAK'">
                <progress-bar
                  :max="100"
                  bar-color="yellow" bg-color="darkgray"
                  :val="songScoring.breakBonusAchievement_DX * 100.0"
                ></progress-bar>
              </template>
            </div>
          </td>
          <td name="maimaidx-group-score">
            <div name="text">
              <b>{{
                songScoring.noteBaseScoreSubtotalsOf(noteType).toFixed(0)
              }}</b><template v-if="noteType === 'BREAK'"> + <b>{{
                songScoring.totalBonusScore_DX
              }}</b></template>
              <br />
              (<b>{{
                songScoring.noteBaseAchievementSubtotalsOf(noteType).toFixed(4)
              }}%</b><template v-if="noteType === 'BREAK'"> + {{
                songScoring.bonusAchievementSubtotalsOf_DX.toFixed(4)
              }}%</template>)
            </div>
            <div name="bar">
              <progress-bar
                :max="100.0 * 100"
                :val="songScoring.noteBaseAchievementSubtotalsOf(noteType) * 100"
              ></progress-bar>
              <template v-if="noteType === 'BREAK'">
                <progress-bar
                  :max="100.0 * 100"
                  bar-color="yellow" bg-color="darkgray"
                  :val="songScoring.bonusAchievementSubtotalsOf_DX * 100"
                ></progress-bar>
              </template>
            </div>
          </td>
          <td name="maimaidx-deluxe-score">
            <div name="text">
              {{ Constants.noteToBaseDeluxeScore[noteType] }}
              <br />
              <!-- (<b>{{
                songScoring.noteBaseDeluxeAchievementsOf(noteType).toFixed(4)
              }}%</b>) -->
            </div>
            <div name="bar">
              <progress-bar
                :max="100"
                :val="songScoring.noteBaseDeluxeAchievementsOf(noteType) * 100.0"
              ></progress-bar>
            </div>
          </td>
          <td name="maimaidx-group-deluxe-score">
            <div name="text">
              <b>{{
                songScoring.noteDeluxeScoreSubtotalsOf(noteType).toFixed(0)
              }}</b>
              <br />
              <!-- (<b>{{
                songScoring.noteDeluxeAchievementSubtotalsOf(noteType).toFixed(2)
              }}%</b>) -->
            </div>
            <div name="bar">
              <progress-bar
                :max="100.0 * 100"
                :val="songScoring.noteDeluxeAchievementSubtotalsOf(noteType) * 100"
              ></progress-bar>
            </div>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <th>總計</th>
          <td>
            <b>{{ songScoring.totalNoteCount }}</b>
          </td>
          <td colspan="2">
            <div>
              <b>{{
                songScoring.totalBaseScore
              }}</b> + <b>{{
                songScoring.totalBonusScore_Finale
              }}</b>
            </div>
            <div>
              ({{
                songScoring.totalBaseAchievement.toFixed(2)
              }}% + <b>{{
                songScoring.totalBonusAchievement_Finale.toFixed(2)
              }}%</b>)
            </div>
          </td>
          <td colspan="2">
            <div>
              <b>{{
                songScoring.totalBaseScore
              }}</b> + <b>{{
                songScoring.totalBonusScore_DX
              }}</b>
            </div>
            <div>
              ({{
                songScoring.totalBaseAchievement.toFixed(4)
              }}% + {{
                songScoring.totalBonusAchievement_DX.toFixed(4)
              }}%)
            </div>
          </td>
          <td colspan="2">
            <div>
              <b>{{ songScoring.totalBaseDeluxeScore }}</b>
            </div>
            <div>
              ({{ songScoring.totalBaseDeluxeAchievement.toFixed(4) }}%)
            </div>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import ProgressBar from 'vue-simple-progress';
import * as Constants from '@/assets/constants';

export default {
  components: {
    VueSlider,
    ProgressBar,
  },
  props: ['songScoring'],
  data() {
    return {
      Constants,
    };
  },
  methods: {
    isNoteCountValid(noteType) {
      if (noteType === 'BREAK' && this.songScoring.noteCounts[noteType] < 1) {
        return false;
      }
      return true;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
