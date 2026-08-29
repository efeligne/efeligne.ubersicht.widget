import { MAX_PERCENTAGE, TOTAL_MINUTES_IN_DAY } from '@/helpers/const';
import type { Dispatch } from '@/helpers/dispatcher';

export const TYPE = 'SET_DAY_PROGRESS';

export const createRunner = (dispatch: Dispatch) => {
  const now = new Date();
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
  const percentage = (minutesSinceMidnight / TOTAL_MINUTES_IN_DAY) * MAX_PERCENTAGE;
  const data = String(percentage.toFixed(0));
  dispatch({ type: TYPE, data });
};
