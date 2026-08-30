import { config } from '@/lib/config';
import { DayProgress } from '@/widgets/DayProgress/DayProgress';
import { createRunner as runner, TYPE } from '@/widgets/DayProgress/helpers';
import { create } from '@/widgets/Factory/create';

export const dayProgress = create({
  refreshTimeout: config.refresh.dayProgress,
  type: TYPE,
  stateKey: 'day',
  widget: DayProgress,
  runner,
});
