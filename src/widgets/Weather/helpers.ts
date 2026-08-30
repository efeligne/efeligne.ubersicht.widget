import { run } from 'uebersicht';
import { NO_DATA } from '@/helpers/const';
import type { Dispatch } from '@/helpers/dispatcher';
import { config } from '@/lib/config';
import type { WeatherIcons, WeatherRules } from '@/widgets/Weather/types';

const WEATHER_RULES = [
  ['clear', ['clear', 'sunny']],
  ['cloudy', ['cloud', 'overcast']],
  ['rain', ['rain', 'drizzle', 'shower']],
  ['snow', ['snow', 'sleet', 'blizzard']],
  ['thunder', ['thunder', 'storm']],
  ['fog', ['fog', 'mist', 'haze']],
] as const satisfies WeatherRules;

let cachedOutput: string | null = null;

export const TYPE = 'SET_WEATHER';

export const getWeatherIcon = (condition: string, icons: WeatherIcons) => {
  const c = condition.toLowerCase();

  for (const [key, keywords] of WEATHER_RULES) {
    if (keywords.some((keyword) => c.includes(keyword))) {
      return icons[key];
    }
  }

  return icons.unknown;
};

export const cmd = `curl -fsS 'wttr.in/${config.weather.location}?format=%C|%t' 2>/dev/null || echo "N/A|N/A"`;

export const getRunner = (dispatch: Dispatch) => {
  run(cmd).then((output) => {
    const data = output.trim();
    if (data !== `${NO_DATA}|${NO_DATA}` && data !== cachedOutput) {
      cachedOutput = data;
      dispatch({ type: TYPE, data });
    } else if (cachedOutput === null) {
      dispatch({ type: TYPE, data: `${NO_DATA}|${NO_DATA}` });
    } else {
      dispatch({ type: TYPE, data: cachedOutput });
    }
  });
};
