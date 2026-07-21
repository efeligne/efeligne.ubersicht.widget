// eslint-disable-next-line import/no-unresolved
import { React } from 'uebersicht';
import ProgressBar from './progress-bar.jsx';

const topOffset = '12.5rem';
const type = 'SET_DAY_PROGRESS';

function widget({ output }) {
  return <ProgressBar label="󱑸" percentage={output} top={topOffset} side="right" />;
}

export default {
  refreshTimeout: 60000,
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
