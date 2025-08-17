import { ProgressBar } from './disk-usage.jsx';

export const className = `
  top: 5rem;
  right: 1rem;
`;

export const refreshFrequency = 5000;
export const command = 'osascript -e "output volume of (get volume settings)"';
export const render = ({ output }) => ProgressBar('', Number(output.trim()));
