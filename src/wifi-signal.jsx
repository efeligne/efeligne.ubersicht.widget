// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import config from '../lib/config.js';
import ProgressBar from './progress-bar.jsx';

const topOffset = '10rem';
const type = 'SET_WIFI_SIGNAL';
const cmd = `system_profiler SPAirPortDataType -detailLevel 0 | grep Signal | awk '{print $4}'`;

function widget({ output }) {
  const outputString = output ? String(output).trim() : '';
  const signal = parseInt(outputString, 10);
  const percentage = Number.isNaN(signal) ? 'N/A' : Math.min((signal + 100) * 2, 100);

  return (
    <ProgressBar label={config.icons.wifi} percentage={percentage} top={topOffset} side="right" />
  );
}

export default {
  refreshTimeout: config.refresh.wifiSignal,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
