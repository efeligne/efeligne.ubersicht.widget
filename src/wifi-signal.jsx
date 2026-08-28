import createWidget from './widget-factory.jsx';
import ProgressBar from './progress-bar.jsx';
import config from '../lib/config.js';

const { icons, refresh, positions } = config;
const { top, side } = positions.wifi;

export default createWidget({
  cmd: 'system_profiler SPAirPortDataType -detailLevel 0 | grep Signal | awk \'{print $4}\'',
  refreshTimeout: refresh.wifiSignal,
  type: 'SET_WIFI_SIGNAL',
  stateKey: 'wifi',
  widget: ({ output, theme }) => {
    const outputString = output ? String(output).trim() : '';
    const signal = parseInt(outputString, 10);
    const percentage = Number.isNaN(signal) ? 'N/A' : Math.min((signal + 100) * 2, 100);

    return (
      <ProgressBar label={icons.wifi} percentage={percentage} top={top} side={side} theme={theme} />
    );
  },
});
