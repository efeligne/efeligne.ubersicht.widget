import { ProgressBarMemo } from './progress-bar';
import { createWidget } from '../helpers/widget-factory';
import { toGB } from '../helpers/to-gb';
import { config } from '../../lib/config';

const { refresh, positions, icons } = config;
const { top, side } = positions.disk;

export default createWidget({
  cmd: 'df -k -t apfs',
  refreshTimeout: refresh.brightnessLevel,
  type: 'SET_DISK_USAGE',
  stateKey: 'disk',
  widget: ({ output, theme }) => {
    const outputLines = output?.split(/\r?\n/).slice(1).filter(Boolean);

    if (!outputLines || outputLines.length === 0) {
      return <ProgressBarMemo label={config.icons.disk} percentage="N/A" top={top} side={side} />;
    }

    const size = outputLines[0] ?? '';
    const sizeGB = toGB(+size.split(' ').filter(Boolean)[1]);

    const totalUsed = outputLines.reduce((accumulator, current) => {
      const [, , used] = current.split(' ').filter(Boolean);
      return accumulator + +used;
    }, 0);

    const used = Math.round((toGB(totalUsed) * 100) / sizeGB);

    return <ProgressBarMemo label={icons.disk} percentage={used} top={top} theme={theme} side={side} />;
  },
});
