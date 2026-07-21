// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import config from '../lib/config.js';
import ProgressBar from './progress-bar.jsx';

const topOffset = '10rem';
const type = 'SET_CPU_USAGE';
const cmd = 'top -l 1 | grep -E "^CPU" | grep -Eo "\\d+\\.\\d+% idle" | cut -d% -f1';

function widget({ output }) {
  const idle = output ? Number(output.trim()) : NaN;
  const percentage = Number.isNaN(idle) ? 'N/A' : Math.floor(100 - idle);

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
