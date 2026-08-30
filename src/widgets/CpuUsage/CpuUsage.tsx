import { getPercentage } from '@/helpers/getPercentage';
import { config } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

const { positions, icons } = config;
const { top, side } = positions.cpu;

export const CpuUsage: InputWidget = ({ output, theme }) => (
  <ProgressBar label={icons.cpu} percentage={getPercentage(output)} side={side} top={top} theme={theme} />
);
