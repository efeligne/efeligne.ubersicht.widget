// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';

const location = 'Saint_Petersburg,Russia';
const url = location ? `wttr.in/${location}?format=%C|%t` : 'wttr.in/?format=%C|%t';
const cmd = `curl -fsS '${url}' 2>/dev/null || echo "N/A|N/A"`;
const type = 'SET_WEATHER';

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

const weatherStyle = {
  position: 'absolute',
  bottom: '1rem',
  right: '1rem',
  color: '#111111',
  fontFamily: "'JetBrainsMono Nerd Font', 'Courier New', monospace",
  fontSize: '0.85rem',
  letterSpacing: '0.08rem',
  whiteSpace: 'nowrap',
  display: 'flex',
  gap: '0.5rem',
};

function widget({ output }) {
  const raw = output ? output.trim() : 'N/A|N/A';
  const [condition, temp] = raw.split('|');
  if (!condition || condition === 'N/A') return <span style={weatherStyle}> N/A</span>;
  return (
    <aside style={weatherStyle}>
      <span>{getWeatherIcon(condition)}</span>
      <span>{temp}</span>
    </aside>
  );
}

export default {
  refreshTimeout: 600000,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
