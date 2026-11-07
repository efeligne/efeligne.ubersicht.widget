import { useTheme } from '@/helpers/context';
import { getPercentage } from '@/helpers/getPercentage';
import { Battery4Line } from '@/icons';
import { getConfig } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

export const BatteryLevel: InputWidget = ({ output }) => {
  const theme = useTheme();
  const { top, side } = getConfig().positions.battery;

  return <ProgressBar icon={Battery4Line} percentage={getPercentage(output)} top={top} side={side} theme={theme} />;
};
