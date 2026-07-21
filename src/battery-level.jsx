// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import config from '../lib/config.js';
import ProgressBar from './progress-bar.jsx';

const topOffset = '12.5rem';
const type = 'SET_BATTERY_LEVEL';
const cmd = 'pmset -g batt | grep -Eo "\\d+%" | cut -d% -f1';

function widget({ output }) {
  const val = output ? Number(output.trim()) : NaN;
  const percentage = Number.isNaN(val) ? 'N/A' : Math.min(100, Math.max(0, val));
  return <ProgressBar label={config.icons.battery} percentage={percentage} top={topOffset} />;
}

export default {
  refreshTimeout: config.refresh.batteryLevel,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
