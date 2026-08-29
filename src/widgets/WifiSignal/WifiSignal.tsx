import { config } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';
import { getPercentage } from '@/widgets/WifiSignal/helpers';

const { icons, positions } = config;
const { top, side } = positions.wifi;

export const WifiSignal: InputWidget = ({ output, theme }) => (
  <ProgressBar label={icons.wifi} percentage={getPercentage(output)} top={top} side={side} theme={theme} />
);
