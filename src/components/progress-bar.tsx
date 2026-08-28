import { React } from 'uebersicht';
import { config } from '../../lib/config';

interface ProgressBarProps {
  label: string;
  percentage: number | string;
  top: number | string;
  side?: string;
  theme?: string;
}


const ProgressBar: React.FC<ProgressBarProps> = ({ label, percentage, top, side = 'left', theme = 'light' }) => {
  const isValid = typeof percentage === 'number' && !Number.isNaN(percentage);
  const displayValue = isValid ? `${percentage}%` : percentage;
  const progressBar = `progressBar ${theme} ${side}`;
  const width = `${isValid ? percentage : 0}%`;

  const { height } = config.progressBar;

  return (
    <aside className={progressBar} style={{ top }}>
      <div className="label">
        <span className="value">{displayValue}</span>
        <span className="icon">{label}</span>
      </div>
      <div className="track" style={{ height }}>
        <div className="bar" style={{ width, height }} />
      </div>
    </aside>
  );
};

export const ProgressBarMemo = React.memo(ProgressBar);
