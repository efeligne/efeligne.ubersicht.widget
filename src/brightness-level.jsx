// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import config from '../lib/config.js';
import ProgressBar from './progress-bar.jsx';

const topOffset = '7.5rem';
const type = 'SET_BRIGHTNESS_LEVEL';
const cmd = 'efeligne.ubersicht.widget/exec/BrightnessCLI';

function widget({ output }) {
  return (
    <ProgressBar
      label={config.icons.brightness}
      percentage={Number(output.trim())}
      top={topOffset}
      side="right"
    />
  );
}

export default {
  refreshTimeout: config.refresh.brightnessLevel,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
