import { ProgressBar, styles } from './disk-usage.jsx';

export const refreshFrequency = 1000;
export const command = 'memory_pressure | grep System-wide | grep -Eo "\\d+%" | cut -d% -f1';
export const className = styles('7.5rem');
export const render = ({ output }) => ProgressBar('\udb80\udf5b', 100 - output.trim());
