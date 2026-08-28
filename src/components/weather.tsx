import { run } from 'uebersicht';
import { createWidget } from '../helpers/widget-factory';
import { getWeatherIcon } from '../helpers/weather-helpers';
import { config } from '../../lib/config';

const {
  refresh,
  weather: { location },
  icons: { weather },
} = config;

const url = location ? `wttr.in/${location}?format=%C|%t` : 'wttr.in/?format=%C|%t';
const cmd = `curl -fsS '${url}' 2>/dev/null || echo "N/A|N/A"`;
const type = 'SET_WEATHER';

let cachedOutput: string | null = null;

export default createWidget({
  cmd: `curl -fsS '${url}' 2>/dev/null || echo "N/A|N/A"`,
  refreshTimeout: refresh.weather,
  stateKey: 'weather',
  type,
  runner: (dispatch) => {
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
        <span className="icon">{getWeatherIcon(condition, weather)}</span>
        <span>{temp}</span>
      </aside>
    );
  },
});
