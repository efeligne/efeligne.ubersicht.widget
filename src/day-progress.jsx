// eslint-disable-next-line import/no-unresolved
import { React } from 'uebersicht';
import config from '../lib/config.js';
import ProgressBar from './progress-bar.jsx';

const topOffset = config.positions.dayProgress;
const type = 'SET_DAY_PROGRESS';

function widget({ output }) {
  const val = output ? Number(output) : NaN;
  const percentage = Number.isNaN(val) ? 'N/A' : val;

  return (
    <ProgressBar
      label={config.icons.dayProgress}
      percentage={percentage}
      top={topOffset}
      side="right"
    />
  );
}

export default {
  refreshTimeout: config.refresh.dayProgress,
  type,
  runner: (dispatch) => () => {
    const now = new Date();
    const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
    const totalMinutesInDay = 24 * 60;
    const percentage = (minutesSinceMidnight / totalMinutesInDay) * 100;
    dispatch({ type, data: String(percentage.toFixed(1)) });
  },
  widget: React.memo(widget),
};
