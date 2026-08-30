import { getPercentage } from '@/helpers/getPercentage';
import { config } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

const { icons, positions } = config;
const { top, side } = positions.battery;

export const BatteryLevel: InputWidget = ({ output, theme }) => (
  <ProgressBar label={icons.battery} percentage={getPercentage(output)} top={top} side={side} theme={theme} />
);
