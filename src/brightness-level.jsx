// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import config from '../lib/config.js';
import ProgressBar from './progress-bar.jsx';

const topOffset = config.positions.brightness;
const type = 'SET_BRIGHTNESS_LEVEL';
const cmd = 'efeligne.ubersicht.widget/exec/BrightnessCLI';

function widget({ output }) {
  const trimmed = output?.trim();
  const percentage = trimmed ? Number(trimmed) : NaN;

  return (
    <ProgressBar
      label={config.icons.brightness}
      percentage={Number.isNaN(percentage) ? 'N/A' : percentage}
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
