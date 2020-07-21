<template>
  <div class="ScoreCalc">
    <header>
      <h1>maimai 新舊版本成績計算器</h1>
    </header>
    <main>
      <p>
        <button @click="resetForm">重設表單</button>
        &nbsp;
        <button @click="applyTestcase">填入測試資料</button>
      </p>
      <SongScoreTable :songScoring="songScoring" />
      <p>
        ※BREAK加分與基本分分開計算
      </p>
      <PlayerScoreTable :songScoring="songScoring" :playerScoring="playerScoring" />
    </main>
    <footer>
      <b>maimai 新舊版本成績計算器</b> is made by
      <a href="https://github.com/zetaraku/" target="_blank" rel="noopener">Raku Zeta</a>
    </footer>
  </div>
</template>

<script>
import SongScoreTable from '@/components/SongScoreTable.vue';
import PlayerScoreTable from '@/components/PlayerScoreTable.vue';
import SongScoring from '@/utils/SongScoring';
import PlayerScoring from '@/utils/PlayerScoring';
import {
  getEmptySongNoteCounts,
  getEmptyPlayerPerformance,
  getTestSongNoteCounts,
  getTestPlayerPerformance,
} from '@/utils/DataProvider';

export default {
  components: {
    SongScoreTable,
    PlayerScoreTable,
  },
  created() {
    this.applyTestcase();
  },
  data() {
    let songScoring = new SongScoring();
    let playerScoring = new PlayerScoring(songScoring);
    return {
      songScoring,
      playerScoring,
    };
  },
  methods: {
    resetForm() {
      this.songScoring.noteCounts = getEmptySongNoteCounts();
      this.playerScoring.playerPerformance = getEmptyPlayerPerformance();
    },
    applyTestcase() {
      let index = 1;
      this.songScoring.noteCounts = getTestSongNoteCounts(index);
      this.playerScoring.playerPerformance = getTestPlayerPerformance(index);
    },
  },
};
</script>

<style src='vue-slider-component/theme/default.css'></style>
<style lang="scss">

table {
  background-color: lightgray;
  border: 1px darkgray solid;
  margin: 0 auto;

  th, td {
    border: 1px darkgray solid;
    padding: 10px;
    min-width: 125px;

    &.invalid-note-count {
      background-color: red !important;
    }
  }
  thead {
    background-color: sandybrown;

    th {
      &.note-type {
        width: 80px;
      }
      &.note-count {
        width: 140px;
      }
      &.unit-score {
        width: 180px;
      }
      &.group-score {
        width: 180px;
      }
      &.judgement-type {
        width: 120px;
      }
      &.player-score {
        width: 140px;
      }
    }
  }
  tbody {
    th {
      background-color: wheat;
    }
    td {
      background-color: lightgray;
    }
  }
  tfoot {
    th {
      background-color: gold;
    }
    td {
      background-color: gold;

      &.player-result {
        background-color: yellow;
      }
    }
  }
  input[type=number] {
    text-align: center;
    width: 80px;
    font-size: 16px;
  }
}
footer {
  padding: 20px;
}
button {
  font-size: 20px;
}
</style>
