import { config } from '@/lib/config';
import { getPercentage } from '@/widgets/DiskUsage/helpers';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

const { icons, positions } = config;
const { top, side } = positions.disk;

export const DiskUsage: InputWidget = ({ output, theme }) => (
  <ProgressBar label={icons.disk} percentage={getPercentage(output)} top={top} theme={theme} side={side} />
);
