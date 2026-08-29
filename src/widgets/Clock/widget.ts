import { config } from '@/lib/config';
import { Clock } from '@/widgets/Clock/Clock';
import { create } from '@/widgets/Factory/create';

export const clock = create({
  cmd: 'date "+%A_%d_%B_%l_%M_%p"',
  refreshTimeout: config.refresh.clock,
  type: 'SET_TIME',
  stateKey: 'time',
  widget: Clock,
});
