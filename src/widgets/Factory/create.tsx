import { checkWidget, createRunner, reduce } from '@/widgets/Factory/helpers';
import type { CreateWidget } from '@/widgets/Factory/types';

export const create: CreateWidget = ({ cmd, refreshTimeout, type, stateKey, widget, runner }) => ({
  refreshTimeout,
  stateKey,
  type,
  runner: createRunner(type, runner, cmd),
  reducer: reduce(stateKey),
  widget: checkWidget(widget),
});
