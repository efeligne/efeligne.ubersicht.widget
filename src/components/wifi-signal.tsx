import { ProgressBarMemo } from './progress-bar';
import { createWidget } from '../helpers/widget-factory';
import { config } from '../../lib/config';

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
    const percentage = !Number.isNaN(signal)
      ? Math.min((signal + 100) * 2, 100)
      : 'N/A';

    return (
      <ProgressBarMemo
        label={icons.wifi}
        percentage={percentage}
        top={top}
        side={side}
        theme={theme}
      />
    );
  },
});
