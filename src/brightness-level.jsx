// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import ProgressBar from './progress-bar.jsx';

const topOffset = '7.5rem';
const type = 'SET_BRIGHTNESS_LEVEL';
const cmd = 'efeligne.ubersicht.widget/src/BrightnessCLI';

function widget({ output }) {
  return <ProgressBar label="󰃟" percentage={Number(output.trim())} top={topOffset} side="right" />;
}

export default {
  refreshTimeout: 5000,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
