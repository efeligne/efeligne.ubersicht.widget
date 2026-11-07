import type { Config } from '@/lib/config';
import { create } from '@/widgets/Factory/create';
import { buildCmd, TYPE } from '@/widgets/Weather/helpers';
import { Weather } from '@/widgets/Weather/Weather';

export const createWeather = (cfg: Config) =>
  create({
    cmd: buildCmd(cfg),
    refreshTimeout: cfg.refresh.weather,
    stateKey: 'weather',
    type: TYPE,
    widget: Weather,
  });
