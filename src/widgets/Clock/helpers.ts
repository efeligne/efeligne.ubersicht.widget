const DAY_NAME_INDEX = 0;
const DAY_HALF_INDEX = 5;

const FIRST = 1;
const TWENTY_FIRST = 21;
const THIRTY_FIRST = 31;

const SECOND = 2;
const TWENTY_SECOND = 22;

const THIRD = 3;
const TWENTY_THIRD = 23;

const NUM_DAYS_RULES: [string, number[]][] = [
  ['st', [FIRST, TWENTY_FIRST, THIRTY_FIRST]],
  ['nd', [SECOND, TWENTY_SECOND]],
  ['rd', [THIRD, TWENTY_THIRD]],
];

export const getDaySuffix = (day: number): string => {
  for (const [suffix, days] of NUM_DAYS_RULES) {
    if (days.includes(day)) {
      return suffix;
    }
  }

  return 'th';
};

export const dateHandler = (date: string) =>
  date.split('_').map((part, i) => {
    const trimmed = part.trim();
    if (i === DAY_NAME_INDEX) {
      return trimmed.toUpperCase();
    }

    if (i === DAY_HALF_INDEX) {
      return ` ${trimmed}`;
    }

    return trimmed;
  });
