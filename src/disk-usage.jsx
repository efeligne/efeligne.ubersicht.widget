// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import ProgressBar from './progress-bar.jsx';

const topOffset = '5rem';
const type = 'SET_DISK_USAGE';
const cmd = 'df -k -t apfs';

const toGB = (kb) => Math.round(kb / 1024 ** 2);

function widget({ output }) {
  const outputLines = output?.split(/\r?\n/).slice(1).filter(Boolean);

  if (!outputLines || outputLines.length === 0) {
    return <ProgressBar label={'\udb80\udeca'} percentage="N/A" top={topOffset} />;
  }

  const size = outputLines[0] ?? '';
  const sizeGB = toGB(+size.split(' ').filter(Boolean)[1]);

  const totalUsed = outputLines.reduce((accumulator, current) => {
    const [, , used] = current.split(' ').filter(Boolean);
    return accumulator + +used;
  }, 0);

  const used = Math.round((toGB(totalUsed) * 100) / sizeGB);

  return <ProgressBar label={'\udb80\udeca'} percentage={used} top={topOffset} />;
}

export default {
  refreshTimeout: 120000,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
