import { useTheme } from '@/helpers/context';
import { StorageLine } from '@/icons';
import { getConfig } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { getPercentage } from '@/widgets/DiskUsage/helpers';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

export const DiskUsage: InputWidget = ({ output }) => {
  const theme = useTheme();
  const { top, side } = getConfig().positions.disk;

  return <ProgressBar icon={StorageLine} percentage={getPercentage(output)} top={top} theme={theme} side={side} />;
};
