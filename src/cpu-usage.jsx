// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import ProgressBar from './progress-bar.jsx';

const topOffset = '10rem';
const type = 'SET_CPU_USAGE';
const cmd = 'top -l 1 | grep -E "^CPU" | grep -Eo "\\d+\\.\\d+% idle" | cut -d% -f1';

function widget({ output }) {
  const idle = output ? Number(output.trim()) : NaN;
  const percentage = Number.isNaN(idle) ? 'N/A' : Math.floor(100 - idle);

  return <ProgressBar label={'\udb83\udee0'} percentage={percentage} top={topOffset} />;
}

export default {
  refreshTimeout: 5000,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
