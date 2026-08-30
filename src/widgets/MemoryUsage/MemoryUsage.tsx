import { config } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { getPercentage } from '@/widgets/MemoryUsage/helpers';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

const { icons, positions } = config;
const { top, side } = positions.memory;

export const MemoryUsage: InputWidget = ({ output, theme }) => (
  <ProgressBar label={icons.memory} percentage={getPercentage(output)} top={top} side={side} theme={theme} />
);
