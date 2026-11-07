import type { React } from 'uebersicht';

export type IconProps = React.SVGProps<SVGSVGElement>;

export const Icon: React.FC<IconProps> = ({ children, ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    width={24}
    height={24}
    fill='currentColor'
    aria-hidden='true'
    {...props}
  >
    {children}
  </svg>
);
