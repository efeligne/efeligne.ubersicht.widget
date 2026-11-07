import type { React } from 'uebersicht';
import { Icon, type IconProps } from '@/icons/Icon';

export const StorageLine: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path d='M19 4a2 2 0 0 1 1.995 1.85L21 6v4a2 2 0 0 1-1.85 1.995L19 12H5a2 2 0 0 1-1.995-1.85L3 10V6a2 2 0 0 1 1.85-1.995L5 4zm0 2H5v4h14zm-9 1a1 1 0 0 1 .117 1.993L10 9H8a1 1 0 0 1-.117-1.993L8 7zm9 6a2 2 0 0 1 1.995 1.85L21 15v4a2 2 0 0 1-1.85 1.995L19 21H5a2 2 0 0 1-1.995-1.85L3 19v-4a2 2 0 0 1 1.85-1.995L5 13zm0 2H5v4h14zm-9 1a1 1 0 1 1 0 2H8a1 1 0 1 1 0-2z' />
  </Icon>
);
