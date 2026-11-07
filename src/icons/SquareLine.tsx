import type { React } from 'uebersicht';
import { Icon, type IconProps } from '@/icons/Icon';

export const SquareLine: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path fillRule='evenodd' d='M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2zm16 0H5v14h14z' />
  </Icon>
);
