import { useTheme } from '@/helpers/context';
import { getPercentage } from '@/helpers/getPercentage';
import { VolumeLine } from '@/icons';
import { getConfig } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

export const VolumeLevel: InputWidget = ({ output }) => {
  const theme = useTheme();
  const { top, side } = getConfig().positions.volume;

  return <ProgressBar icon={VolumeLine} percentage={getPercentage(output)} top={top} side={side} theme={theme} />;
};
