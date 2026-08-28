import { run } from 'uebersicht';
import createWidget from './widget-factory.jsx';
import config from '../lib/config.js';

const {
  refresh,
  weather: { location },
  icons: { weather },
} = config;

const url = location ? `wttr.in/${location}?format=%C|%t` : 'wttr.in/?format=%C|%t';
const cmd = `curl -fsS '${url}' 2>/dev/null || echo "N/A|N/A"`;
const type = 'SET_WEATHER';

const getWeatherIcon = (condition) => {
  const c = condition.toLowerCase();

  if (c.includes('clear') || c.includes('sunny')) return weather.clear;
  if (c.includes('cloud') || c.includes('overcast')) return weather.cloudy;
  if (c.includes('rain') || c.includes('drizzle') || c.includes('shower')) return weather.rain;
  if (c.includes('snow') || c.includes('sleet') || c.includes('blizzard')) return weather.snow;
  if (c.includes('thunder') || c.includes('storm')) return weather.thunder;
  if (c.includes('fog') || c.includes('mist') || c.includes('haze')) return weather.fog;

  return weather.unknown;
};

let cachedOutput = null;

export default createWidget({
  cmd: `curl -fsS '${url}' 2>/dev/null || echo "N/A|N/A"`,
  refreshTimeout: refresh.weather,
  stateKey: 'weather',
  type,
  runner: (dispatch) => () => {
    run(cmd).then((output) => {
      const data = output.trim();
      if (data !== 'N/A|N/A') {
        cachedOutput = data;
        dispatch({ type, data });
      } else if (cachedOutput !== null) {
        dispatch({ type, data: cachedOutput });
      } else {
        dispatch({ type, data: 'N/A|N/A' });
      }
    });
  },
  widget: ({ output, theme }) => {
    const raw = output ? output.trim() : 'N/A|N/A';
    const [condition, temp] = raw.split('|');

    if (!condition || condition === 'N/A') {
      return (
        <span className={`weather ${theme}`}>
          <span className="icon">{weather.unknown}</span>
          <span>N/A</span>
        </span>
      );
    }

    return (
      <aside className={`weather ${theme}`}>
        <span className="icon">{getWeatherIcon(condition)}</span>
        <span>{temp}</span>
      </aside>
    );
  },
});
