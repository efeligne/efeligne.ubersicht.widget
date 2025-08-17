import { ProgressBar } from './disk-usage.jsx';

export const refreshFrequency = 10000;
export const command = `system_profiler SPAirPortDataType -detailLevel 0 | grep Signal | awk '{print $4}'`;

export const className = `
  top: 10rem;
  right: 1rem;
`;

export const render = ({ output }) => {
  const outputString = output ? String(output).trim() : '0';
  const signal = parseInt(outputString, 10);
  return ProgressBar('󰖩', Math.min((signal + 100) * 2, 100));
};
