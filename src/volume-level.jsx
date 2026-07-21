// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import config from '../lib/config.js';
import ProgressBar from './progress-bar.jsx';

const topOffset = config.positions.volume;
const type = 'SET_VOLUME_LEVEL';
const cmd = 'osascript -e "return output volume of (get volume settings)"';

function widget({ output }) {
  const vol = output ? Number(output.trim()) : NaN;
  const percentage = Number.isNaN(vol) ? 'N/A' : vol;

  return (
    <ProgressBar label={config.icons.volume} percentage={percentage} top={topOffset} side="right" />
  );
}

export default {
  refreshTimeout: config.refresh.volumeLevel,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
