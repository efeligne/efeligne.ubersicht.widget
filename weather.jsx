// eslint-disable-next-line import/no-unresolved
import { React, css } from 'uebersicht';

export const refreshFrequency = 600000;

export const location = 'Saint_Petersburg,Russia';

const url = location
  ? `wttr.in/${location}?format=%C|%t`
  : 'wttr.in/?format=%C|%t';

export const command = `curl -fsS '${url}' 2>/dev/null || echo "N/A|N/A"`;

export const className = css`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  color: #111111;
  font-family: 'JetBrainsMono Nerd Font', 'Courier New', monospace;
  font-size: 0.85rem;
  letter-spacing: 0.08rem;
  white-space: nowrap;
`;

const getWeatherIcon = (condition) => {
  const c = condition.toLowerCase();
  if (c.includes('clear') || c.includes('sunny')) return '';
  if (c.includes('cloud') || c.includes('overcast')) return '';
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return '';
  if (c.includes('snow') || c.includes('sleet') || c.includes('blizzard')) return '';
  if (c.includes('thunder') || c.includes('storm')) return '';
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return '';
  return '';
};

export const render = ({ output }) => {
  const raw = output ? output.trim() : 'N/A|N/A';
  const [condition, temp] = raw.split('|');
  if (!condition || condition === 'N/A') return <span> N/A</span>;
  return (
    <span>
      {getWeatherIcon(condition)} {temp}
    </span>
  );
};
