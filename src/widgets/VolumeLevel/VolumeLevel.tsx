import { getPercentage } from '@/helpers/getPercentage';
import { config } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

const { icons, positions } = config;
const { top, side } = positions.volume;

export const VolumeLevel: InputWidget = ({ output, theme }) => (
  <ProgressBar label={icons.volume} percentage={getPercentage(output)} top={top} side={side} theme={theme} />
);
