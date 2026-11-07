import { React } from 'uebersicht';
import { getConfig } from '@/lib/config';
import { getCurrentWidth } from '@/widgets/ProgressBar/helpers';
import type { ProgressBarProps } from '@/widgets/ProgressBar/types';

const Component: React.FC<ProgressBarProps> = ({ icon: Icon, percentage, top, side = 'left', theme = 'light' }) => {
  const classNames = `progressBar ${theme} ${side}`;
  const width = getCurrentWidth(percentage);
  const { height } = getConfig().progressBar;

  return (
    <aside className={classNames} style={{ top }}>
      <div className='label'>
        <span className='value'>{percentage}</span>
        <span className='icon'>
          <Icon />
        </span>
      </div>
      <div className='track' style={{ height }}>
        <div className='bar' style={{ width, height }} />
      </div>
    </aside>
  );
};

export const ProgressBar = React.memo(Component);
