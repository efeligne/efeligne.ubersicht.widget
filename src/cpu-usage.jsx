import { ProgressBar, styles } from './disk-usage.jsx';

export const refreshFrequency = 5000;
export const command = 'top -l 1 | grep -E "^CPU" | grep -Eo "\\d+\\.\\d+% idle" | cut -d% -f1';
export const className = styles('10rem');
export const render = ({ output }) => {
  const idle = output ? Number(output.trim()) : NaN;
  return ProgressBar('\udb83\udee0', Number.isNaN(idle) ? 'N/A' : Math.floor(100 - idle));
};
