import { NO_DATA } from '@/helpers/const';
import { useTheme } from '@/helpers/context';
import type { InputWidget } from '@/widgets/Factory/types';
import { getWeatherIcon } from '@/widgets/Weather/helpers';

const NIGHT_START = 20;
const NIGHT_END = 7;

const isNightNow = () => {
  const hour = new Date().getHours();

  return hour >= NIGHT_START || hour < NIGHT_END;
};

export const Weather: InputWidget = ({ output }) => {
  const theme = useTheme();
  let raw = `${NO_DATA}|${NO_DATA}`;

  if (output) {
    raw = output.trim();
  }

  const [condition, temperature] = raw.split('|');
  const Icon = getWeatherIcon(condition, isNightNow());

  return (
    <aside className={`weather ${theme}`}>
      <span className='icon'>
        <Icon />
      </span>
      <span>{temperature}</span>
    </aside>
  );
};
