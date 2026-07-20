import { ProgressBar } from './disk-usage.jsx';

export const refreshFrequency = 60000;

export const className = `
  top: 12.5rem;
  right: 1rem;
`;

export const render = () => {
  const now = new Date();
  const minutesSinceMidnight = now.getHours() * 60 + now.getMinutes();
  const totalMinutesInDay = 24 * 60;
  const percentage = (minutesSinceMidnight / totalMinutesInDay) * 100;

  return ProgressBar('󱑸', percentage.toFixed(1));
};
