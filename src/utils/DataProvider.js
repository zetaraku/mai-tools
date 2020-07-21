import emptyTestCase from '@/assets/empty_test_case.json';
import testCases from '@/assets/test_cases.json';

function deepCopy(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getEmptySongNoteCounts() {
  return deepCopy(emptyTestCase.songNoteCounts);
}

export function getEmptyPlayerPerformance() {
  return deepCopy(emptyTestCase.playerPerformance);
}

export function getTestSongNoteCounts(index) {
  return deepCopy(testCases[index].songNoteCounts);
}

export function getTestPlayerPerformance(index) {
  return deepCopy(testCases[index].playerPerformance);
}
