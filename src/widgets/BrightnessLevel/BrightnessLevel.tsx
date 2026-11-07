import { useTheme } from '@/helpers/context';
import { getPercentage } from '@/helpers/getPercentage';
import { BrightnessLine } from '@/icons';
import { getConfig } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { ProgressBar } from '@/widgets/ProgressBar/ProgressBar';

export const BrightnessLevel: InputWidget = ({ output }) => {
  const theme = useTheme();
  const { top, side } = getConfig().positions.brightness;

  return <ProgressBar icon={BrightnessLine} percentage={getPercentage(output)} top={top} side={side} theme={theme} />;
};
