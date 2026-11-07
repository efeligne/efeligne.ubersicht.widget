import type { Config } from '@/lib/config';
import { DayProgress } from '@/widgets/DayProgress/DayProgress';
import { createRunner as runner, TYPE } from '@/widgets/DayProgress/helpers';
import { create } from '@/widgets/Factory/create';

export const createDayProgress = (cfg: Config) =>
  create({
    refreshTimeout: cfg.refresh.dayProgress,
    type: TYPE,
    stateKey: 'day',
    widget: DayProgress,
    runner,
  });
