import { ProgressBar, styles } from './disk-usage.jsx';

export const refreshFrequency = 5000;
export const command = 'memory_pressure | grep System-wide | grep -Eo "\\d+%" | cut -d% -f1';
export const className = styles('7.5rem');
export const render = ({ output }) => {
  const val = output ? Number(output.trim()) : NaN;
  return ProgressBar('\udb80\udf5b', Number.isNaN(val) ? 'N/A' : 100 - val);
};
