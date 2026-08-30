import { React } from 'uebersicht';
import { config } from '@/lib/config';
import { getCurrentWidth } from '@/widgets/ProgressBar/helpers';
import type { ProgressBarProps } from '@/widgets/ProgressBar/types';

const Component: React.FC<ProgressBarProps> = ({ label, percentage, top, side = 'left', theme = 'light' }) => {
  const classNames = `progressBar ${theme} ${side}`;
  const width = getCurrentWidth(percentage);
  const { height } = config.progressBar;

  return (
    <aside className={classNames} style={{ top }}>
      <div className='label'>
        <span className='value'>{percentage}</span>
        <span className='icon'>{label}</span>
      </div>
      <div className='track' style={{ height }}>
        <div className='bar' style={{ width, height }} />
      </div>
    </aside>
  );
};

export const ProgressBar = React.memo(Component);
