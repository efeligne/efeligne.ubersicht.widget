import { getPercentage } from '@/helpers/getPercentage';
import { config } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

const { icons, positions } = config;
const { top, side } = positions.brightness;

export const BrightnessLevel: InputWidget = ({ output, theme }) => (
  <ProgressBar label={icons.brightness} percentage={getPercentage(output)} top={top} side={side} theme={theme} />
);
