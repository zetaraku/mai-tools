import { shallowMount } from '@vue/test-utils';
import ScoreCalc from '@/views/ScoreCalc.vue';
import * as Constants from '@/assets/constants';
import {
  getTestSongNoteCounts,
  getTestPlayerPerformance,
} from '@/utils/DataProvider';

describe('ScoreCalc.vue', () => {
  let wrapper = shallowMount(ScoreCalc);
  let { vm } = wrapper;

  const index = 0;
  vm.songScoring.noteCounts = getTestSongNoteCounts(index);
  vm.playerScoring.playerPerformance = getTestPlayerPerformance(index);

  describe('songScoring', () => {
    it('calculate total note count', () => {
      /* Total note count */
      expect(vm.songScoring.totalNoteCount).toBe(634);
    });
    it('calculate total base', () => {
      expect(vm.songScoring.totalBaseScore).toBe(507000);
      expect(vm.songScoring.totalBaseAchievement).toBe(100.0);
      expect(vm.songScoring.totalBaseDeluxeScore).toBe(1902);
    });
    it('calculate total bonus', () => {
      expect(vm.songScoring.totalBonusScore_Finale).toBe(400);
      expect(vm.songScoring.totalBonusScore_DX).toBe(5070);
      expect(vm.songScoring.totalBonusAchievement_Finale.toFixed(2)).toBe('0.08');
      expect(vm.songScoring.totalBonusAchievement_DX.toFixed(4)).toBe('1.0000');
    });
    it('calculate note base achievement', () => {
      expect(
        Constants.noteTypes
          .map(noteType => [
            noteType,
            vm.songScoring.noteBaseAchievementsOf(noteType).toFixed(2),
          ])
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {}),
      ).toMatchObject({
        TAP: '0.10',
        HOLD: '0.20',
        SLIDE: '0.30',
        TOUCH: '0.10',
        BREAK: '0.49',
      });
      expect(
        Constants.noteTypes
          .map(noteType => [
            noteType,
            vm.songScoring.noteBaseAchievementsOf(noteType).toFixed(4),
          ])
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {}),
      ).toMatchObject({
        TAP: '0.0986',
        HOLD: '0.1972',
        SLIDE: '0.2959',
        TOUCH: '0.0986',
        BREAK: '0.4931',
      });
      expect(
        Constants.noteTypes
          .map(noteType => [
            noteType,
            vm.songScoring.noteBaseDeluxeAchievementsOf(noteType).toFixed(4),
          ])
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {}),
      ).toMatchObject({
        TAP: '0.1577',
        HOLD: '0.1577',
        SLIDE: '0.1577',
        TOUCH: '0.1577',
        BREAK: '0.1577',
      });
    });
    it('calculate break bonus', () => {
      expect(vm.songScoring.breakBonusScore_Finale).toBe(100);
      expect(vm.songScoring.breakBonusScore_DX.toFixed(0)).toBe('1268');
      expect(vm.songScoring.breakBonusAchievement_Finale.toFixed(2)).toBe('0.02');
      expect(vm.songScoring.breakBonusAchievement_DX.toFixed(4)).toBe('0.2500');
    });
  });
  describe('playerScoring', () => {
    it('calculate player note counts', () => {
      expect(
        Constants.noteTypes
          .map(noteType => [
            noteType,
            vm.playerScoring.noteCountsOf(noteType),
          ])
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {}),
      ).toMatchObject({
        TAP: 432,
        HOLD: 32,
        SLIDE: 166,
        TOUCH: 0,
        BREAK: 4,
      });
    });
    it('calculate player score', () => {
      expect(vm.playerScoring.playerScore_Finale).toBe(500850);
      expect(vm.playerScoring.playerScore_DX.toFixed(0)).toBe('504986');
      expect(vm.playerScoring.playerDeluxeScore).toBe(1586);
    });
    it('calculate player achievement', () => {
      expect(vm.playerScoring.playerAchievement_Finale.toFixed(2)).toBe('98.79');
      expect(vm.playerScoring.playerAchievement_DX.toFixed(4)).toBe('99.6028');
      expect(vm.playerScoring.playerDeluxeAchievement.toFixed(4)).toBe('83.3859');
    });
    it('calculate player performance overview', () => {
      expect(
        Constants.judgementTypes
          .map(judgementType => [
            judgementType,
            vm.playerScoring.playerPerformanceOverview(judgementType),
          ])
          .reduce((acc, [key, value]) => {
            acc[key] = value;
            return acc;
          }, {}),
      ).toMatchObject({
        CRITICAL: 359, PERFECT: 237, GREAT: 35, GOOD: 3, MISS: 0,
      });
    });
  });
});
