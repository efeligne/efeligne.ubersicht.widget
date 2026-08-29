import { NO_DATA } from '@/helpers/const';
import { config } from '@/lib/config';
import type { InputWidget } from '@/widgets/Factory/types';
import { getWeatherIcon } from '@/widgets/Weather/helpers';

const { weather } = config.icons;

export const Weather: InputWidget = ({ output, theme }) => {
  let raw = `${NO_DATA}|${NO_DATA}`;

  if (output) {
    raw = output.trim();
  }

  const [condition, temperature] = raw.split('|');

  return (
    <aside className={`weather ${theme}`}>
      <span className='icon'>{getWeatherIcon(condition, weather)}</span>
      <span>{temperature}</span>
    </aside>
  );
};
