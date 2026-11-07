import { useTheme } from '@/helpers/context';
import { getPercentage } from '@/helpers/getPercentage';
import { TimeDurationLine } from '@/icons';
import { getConfig } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

export const DayProgress: InputWidget = ({ output }) => {
  const theme = useTheme();
  const { top, side } = getConfig().positions.dayProgress;

  return <ProgressBar icon={TimeDurationLine} percentage={getPercentage(output)} top={top} side={side} theme={theme} />;
};
