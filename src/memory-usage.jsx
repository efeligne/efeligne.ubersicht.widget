// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import ProgressBar from './progress-bar.jsx';

const topOffset = '7.5rem';
const type = 'SET_MEMORY_USAGE';
const cmd = 'memory_pressure | grep System-wide | grep -Eo "\\d+%" | cut -d% -f1';

function widget({ output }) {
  const val = output ? Number(output.trim()) : NaN;
  const percentage = Number.isNaN(val) ? 'N/A' : 100 - val;

  return <ProgressBar label={'\udb80\udf5b'} percentage={percentage} top={topOffset} />;
}

export default {
  refreshTimeout: 5000,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
