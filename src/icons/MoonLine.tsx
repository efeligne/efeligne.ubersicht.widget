import type { React } from 'uebersicht';
import { Icon, type IconProps } from '@/icons/Icon';

export const MoonLine: React.FC<IconProps> = (props) => (
  <Icon {...props}>
    <path
      fillRule='evenodd'
      d='M13.574 3.137a1.01 1.01 0 0 0-1.097 1.409 6 6 0 0 1-7.931 7.931 1.01 1.01 0 0 0-1.409 1.097A9 9 0 0 0 21 12c0-4.434-3.206-8.118-7.426-8.863m1.307 2.481A7.002 7.002 0 0 1 12 19a7.002 7.002 0 0 1-6.382-4.12 8 8 0 0 0 9.263-9.263Z'
    />
  </Icon>
);
