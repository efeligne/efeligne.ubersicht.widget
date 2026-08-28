import createWidget from './widget-factory.jsx';
import ProgressBar from './progress-bar.jsx';
import config from '../lib/config.js';

const { refresh, positions, icons } = config;
const { top, side } = positions.dayProgress;

const type = 'SET_DAY_PROGRESS';

export default createWidget({
  refreshTimeout: refresh.dayProgress,
  type,
  stateKey: 'day',
  widget: ({ output, theme }) => {
    const val = output ? Number(output) : NaN;
    const percentage = Number.isNaN(val) ? 'N/A' : val;

    return (
      <ProgressBar
        label={icons.dayProgress}
        percentage={percentage}
        top={top}
        side={side}
        theme={theme}
      />
    );
  },
  runner: (dispatch) => () => {
    const now = new Date();
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    const totalMinutesInDay = 24 * 60;
    const percentage = (minutesSinceMidnight / totalMinutesInDay) * 100;
    dispatch({ type, data: String(percentage.toFixed(0)) });
  },
});
