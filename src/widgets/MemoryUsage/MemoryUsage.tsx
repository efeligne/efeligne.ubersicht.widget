import { useTheme } from '@/helpers/context';
import { Server2Line } from '@/icons';
import { getConfig } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { getPercentage } from '@/widgets/MemoryUsage/helpers';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

export const MemoryUsage: InputWidget = ({ output }) => {
  const theme = useTheme();
  const { top, side } = getConfig().positions.memory;

  return <ProgressBar icon={Server2Line} percentage={getPercentage(output)} top={top} side={side} theme={theme} />;
};
