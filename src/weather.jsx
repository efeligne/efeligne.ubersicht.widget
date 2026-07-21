// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';
import config from '../lib/config.js';

const { location } = config.weather;
const url = location ? `wttr.in/${location}?format=%C|%t` : 'wttr.in/?format=%C|%t';
const cmd = `curl -fsS '${url}' 2>/dev/null || echo "N/A|N/A"`;
const type = 'SET_WEATHER';

const getWeatherIcon = (condition) => {
  const c = condition.toLowerCase();
  if (c.includes('clear') || c.includes('sunny')) return config.icons.weather.clear;
  if (c.includes('cloud') || c.includes('overcast')) return config.icons.weather.cloudy;
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower'))
    return config.icons.weather.rain;
  if (c.includes('snow') || c.includes('sleet') || c.includes('blizzard'))
    return config.icons.weather.snow;
  if (c.includes('thunder') || c.includes('storm')) return config.icons.weather.thunder;
  if (c.includes('fog') || c.includes('mist') || c.includes('haze'))
    return config.icons.weather.fog;
  return config.icons.weather.unknown;
};

const weatherStyle = {
  position: 'absolute',
  bottom: '1rem',
  right: '1rem',
  color: config.colors.foreground,
  fontFamily: "'JetBrainsMono Nerd Font', 'Courier New', monospace",
  fontSize: '1rem',
  letterSpacing: '0.08rem',
  whiteSpace: 'nowrap',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
};

const iconStyle = {
  fontSize: '1.25rem',
};

function widget({ output }) {
  const raw = output ? output.trim() : 'N/A|N/A';
  const [condition, temp] = raw.split('|');
  if (!condition || condition === 'N/A')
    return (
      <span style={weatherStyle}>
        <span style={iconStyle}>{config.icons.weather.unknown}</span>
        <span>N/A</span>
      </span>
    );
  return (
    <aside style={weatherStyle}>
      <span style={iconStyle}>{getWeatherIcon(condition)}</span>
      <span>{temp}</span>
    </aside>
  );
}

export default {
  refreshTimeout: config.refresh.weather,
  type,
  runner: (dispatch) => () => {
    run(cmd).then(dispatcher(type, dispatch));
  },
  widget: React.memo(widget),
};
