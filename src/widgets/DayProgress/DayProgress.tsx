import { getPercentage } from '@/helpers/getPercentage';
import { config } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

const { positions, icons } = config;
const { top, side } = positions.dayProgress;

export const DayProgress: InputWidget = ({ output, theme }) => (
  <ProgressBar label={icons.dayProgress} percentage={getPercentage(output)} top={top} side={side} theme={theme} />
);
