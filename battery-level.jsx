import { ProgressBar, styles } from './disk-usage.jsx';

export const refreshFrequency = 60000;
export const command = 'pmset -g batt | grep -Eo "\\d+%" | cut -d% -f1';
export const className = styles('12.5rem');
export const render = ({ output }) => ProgressBar('\udb84\udea3', Number(output.trim()));
