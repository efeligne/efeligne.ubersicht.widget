import type { DispatchProps } from '@/helpers/dispatcher';
import { widgets } from '@/widgets';

const init = Object.fromEntries(widgets.map((widget) => [widget.stateKey, 'Loading...']));
const reducers = new Map(widgets.map((widget) => [widget.type, widget.reducer]));

export type State = Record<string, string>;

export const update = (event: DispatchProps, previousState: State) => {
  const reducer = reducers.get(event.type);
  if (reducer) {
    return reducer(event, previousState);
  }
  return previousState;
};

export const useState = { init, update };
