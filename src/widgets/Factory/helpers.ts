import { React, run } from 'uebersicht';
import { dispatcher } from '@/helpers/dispatcher';
import type { InputWidget, OutputWidget, Reducer, Runner } from '@/widgets/Factory/types';

export const reduce =
  (stateKey: string): Reducer =>
  (event, previousState) => ({
    ...previousState,
    [stateKey]: event.data,
  });

export const createRunner = (type: string, runner?: Runner, cmd?: string): Runner =>
  runner ??
  ((dispatch) => {
    if (cmd) {
      run(cmd).then(dispatcher(type, dispatch));
    }
  });

export const checkWidget = (widget?: InputWidget): OutputWidget => {
  if (!widget) {
    return null;
  }

  return React.memo(widget);
};
