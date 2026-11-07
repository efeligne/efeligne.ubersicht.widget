import { useTheme } from '@/helpers/context';
import { WifiLine } from '@/icons';
import { getConfig } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';
import { getPercentage } from '@/widgets/WifiSignal/helpers';

export const WifiSignal: InputWidget = ({ output }) => {
  const theme = useTheme();
  const { top, side } = getConfig().positions.wifi;

  return <ProgressBar icon={WifiLine} percentage={getPercentage(output)} top={top} side={side} theme={theme} />;
};
