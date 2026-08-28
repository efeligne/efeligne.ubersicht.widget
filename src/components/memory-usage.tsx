import { ProgressBarMemo } from './progress-bar';
import { createWidget } from '../helpers/widget-factory';
import { config } from '../../lib/config';

const { icons, refresh, positions } = config;
const { top, side } = positions.memory;

export default createWidget({
  cmd: 'memory_pressure | grep System-wide | grep -Eo "\\d+%" | cut -d% -f1',
  refreshTimeout: refresh.memoryUsage,
  type: 'SET_MEMORY_USAGE',
  stateKey: 'memory',
  widget: ({ output, theme }) => {
    const val = output ? Number(output.trim()) : NaN;
    const percentage = Number.isNaN(val) ? 'N/A' : 100 - val;

    return (
      <ProgressBarMemo
        label={icons.memory}
        percentage={percentage}
        top={top}
        side={side}
        theme={theme}
      />
    );
  },
});
