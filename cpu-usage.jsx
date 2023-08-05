import { ProgressBar, styles } from './disk-usage.jsx';

export const refreshFrequency = 1000;
export const command = 'top -l 1 | grep -E "^CPU" | grep -Eo "\\d+\\.\\d+% idle" | cut -d% -f1';
export const className = styles('10rem');
export const render = ({ output }) => ProgressBar('\udb83\udee0', Math.floor(100 - output.trim()));
