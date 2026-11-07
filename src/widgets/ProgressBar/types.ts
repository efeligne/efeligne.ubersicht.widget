import type { React } from 'uebersicht';
import type { IconProps } from '@/icons';

export interface ProgressBarProps {
  icon: React.ComponentType<IconProps>;
  percentage: string;
  top: number | string;
  side?: string;
  theme?: string;
}
