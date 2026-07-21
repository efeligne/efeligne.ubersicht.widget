// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import config from '../lib/config.js';
import ProgressBar from './progress-bar.jsx';

const topOffset = config.positions.cpu;
const type = 'SET_CPU_USAGE';
const cmd = `top -l 2 -n 0 2>/dev/null | awk '/^CPU/{if(++c==2) printf "%.0f\\n", $3+$5}'`;

function widget({ output }) {
  const val = output ? Number(output.trim()) : NaN;
  const percentage = Number.isNaN(val) ? 'N/A' : Math.round(val);

  return <ProgressBar label={config.icons.cpu} percentage={percentage} top={topOffset} />;
}

export default {
  refreshTimeout: config.refresh.cpuUsage,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
