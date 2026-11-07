import { useTheme } from '@/helpers/context';
import { getPercentage } from '@/helpers/getPercentage';
import { ChipLine } from '@/icons';
import { getConfig } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

export const CpuUsage: InputWidget = ({ output }) => {
  const theme = useTheme();
  const { top, side } = getConfig().positions.cpu;

  return <ProgressBar icon={ChipLine} percentage={getPercentage(output)} side={side} top={top} theme={theme} />;
};
