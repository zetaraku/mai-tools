/* eslint-disable camelcase */

export const noteTypes = [
  'TAP',
  'HOLD',
  'SLIDE',
  'TOUCH',
  'BREAK',
];

export const judgementTypes = [
  'CRITICAL',
  'PERFECT',
  'GREAT',
  'GOOD',
  'MISS',
];
export const judgementSubtypes = {
  CRITICAL: [
    '2600',
  ],
  PERFECT: [
    '2550',
    '2500',
  ],
  GREAT: [
    '2000',
    '1500',
    '1250',
  ],
  GOOD: [
    '1000',
  ],
  MISS: [
    '0',
  ],
};

export const noteToBaseScore = {
  TAP: 500,
  HOLD: 1000,
  SLIDE: 1500,
  TOUCH: 500,
  BREAK: 2500,
};
export const noteToBaseDeluxeScore = {
  TAP: 3,
  HOLD: 3,
  SLIDE: 3,
  TOUCH: 3,
  BREAK: 3,
};

export const judgementToScoreRatio_NonBreak = {
  CRITICAL: 1.0,
  PERFECT: 1.0,
  GREAT: 0.8,
  GOOD: 0.5,
  MISS: 0.0,
};
export const judgementToScoreRatio_Break = {
  CRITICAL: {
    2600: 1.0,
  },
  PERFECT: {
    2550: 1.0,
    2500: 1.0,
  },
  GREAT: {
    2000: 0.8,
    1500: 0.6,
    1250: 0.5,
  },
  GOOD: {
    1000: 0.4,
  },
  MISS: {
    0: 0.0,
  },
};
export const judgementToDeluxeScore = {
  CRITICAL: 3,
  PERFECT: 2,
  GREAT: 1,
  GOOD: 0,
  MISS: 0,
};

export const judgementToBonusRatio_Finale = {
  CRITICAL: {
    2600: 1.0,
  },
  PERFECT: {
    2550: 0.5,
    2500: 0.0,
  },
  GREAT: {
    2000: 0.0,
    1500: 0.0,
    1250: 0.0,
  },
  GOOD: {
    1000: 0.0,
  },
  MISS: {
    0: 0.0,
  },
};
export const judgementToBonusRatio_DX = {
  CRITICAL: {
    2600: 1.0,
  },
  PERFECT: {
    2550: 0.75,
    2500: 0.5,
  },
  GREAT: {
    2000: 0.4,
    1500: 0.4,
    1250: 0.4,
  },
  GOOD: {
    1000: 0.3,
  },
  MISS: {
    0: 0.0,
  },
};

export const achievementToRank_Finale = [
  { achievement: Infinity, rank: 'SSS+' }, // AP+ case, manually handled
  { achievement: 100.00, rank: 'SSS' },
  { achievement: 99.50, rank: 'SS+' },
  { achievement: 99.00, rank: 'SS' },
  { achievement: 98.00, rank: 'S+' },
  { achievement: 97.00, rank: 'S' },
  { achievement: 94.00, rank: 'AAA' },
  { achievement: 90.00, rank: 'AA' },
  { achievement: 80.00, rank: 'A' },
  { achievement: 60.00, rank: 'B' },
  { achievement: 40.00, rank: 'C' },
  { achievement: 20.00, rank: 'D' },
  { achievement: 10.00, rank: 'E' },
  { achievement: 0.00, rank: 'F' },
];
export const achievementToRank_DX = [
  { achievement: 100.5000, rank: 'SSS+' },
  { achievement: 100.0000, rank: 'SSS' },
  { achievement: 99.5000, rank: 'SS+' },
  { achievement: 99.0000, rank: 'SS' },
  { achievement: 98.0000, rank: 'S+' },
  { achievement: 97.0000, rank: 'S' },
  { achievement: 94.0000, rank: 'AAA' },
  { achievement: 90.0000, rank: 'AA' },
  { achievement: 80.0000, rank: 'A' },
  { achievement: 75.0000, rank: 'BBB' },
  { achievement: 70.0000, rank: 'BB' },
  { achievement: 60.0000, rank: 'B' },
  { achievement: 50.0000, rank: 'C' },
  { achievement: 0.0000, rank: 'D' },
];
