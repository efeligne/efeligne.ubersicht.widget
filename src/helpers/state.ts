import type { DispatchProps } from '@/helpers/dispatcher';
import { getWidgets } from '@/widgets';

const LOADING = 'Loading...';

export type State = Record<string, string | undefined>;

export const update = (event: DispatchProps, previousState: State) => {
  const reducer = getWidgets().find((widget) => widget.type === event.type)?.reducer;

  if (reducer) {
    return reducer(event, previousState);
  }

  return previousState;
};

export const useState = { init: { theme: 'light' } as State, update };

export { LOADING };
