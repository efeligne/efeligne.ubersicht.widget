// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import ProgressBar from './progress-bar.jsx';

const offset = '12.5rem';
const type = 'SET_BATTERY_LEVEL';
const cmd = 'pmset -g batt | grep -Eo "\\d+%" | cut -d% -f1';

function widget({ output }) {
  const val = output ? Number(output.trim()) : NaN;
  const percentage = Number.isNaN(val) ? 'N/A' : Math.min(100, Math.max(0, val));
  return <ProgressBar label={'\udb84\udea3'} percentage={percentage} top={offset} />;
}

export default {
  refreshTimeout: 60000,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
