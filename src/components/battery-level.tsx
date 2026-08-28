import { ProgressBarMemo } from './progress-bar';
import { createWidget } from '../helpers/widget-factory';
import { config } from '../../lib/config';

const { icons, refresh, positions } = config;
const { top, side } = positions.battery;

export default createWidget({
  cmd: 'pmset -g batt | grep -Eo "\\d+%" | cut -d% -f1',
  refreshTimeout: refresh.batteryLevel,
  type: 'SET_BATTERY_LEVEL',
  stateKey: 'battery',
  widget: ({ output, theme }) => {
    const val = output ? Number(output.trim()) : NaN;
    const percentage = Number.isNaN(val)
      ? 'N/A'
      : Math.min(100, Math.max(0, val));

    return (
      <ProgressBarMemo
        label={icons.battery}
        percentage={percentage}
        top={top}
        side={side}
        theme={theme}
      />
    );
  },
});
