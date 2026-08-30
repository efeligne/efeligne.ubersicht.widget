import { config } from '@/lib/config';
import { create } from '@/widgets/Factory/create';
import { cmd, getRunner, TYPE } from '@/widgets/Weather/helpers';
import { Weather } from '@/widgets/Weather/Weather';

const { refresh } = config;

export const weather = create({
  cmd,
  refreshTimeout: refresh.weather,
  stateKey: 'weather',
  type: TYPE,
  runner: getRunner,
  widget: Weather,
});
