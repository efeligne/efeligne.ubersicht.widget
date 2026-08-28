import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';

const createWidget = ({ cmd, refreshTimeout, type, stateKey, widget, runner }) => {
  const base = {
    refreshTimeout,
    type,
    runner:
      runner ??
      ((dispatch) => () => {
        run(cmd).then(dispatcher(type, dispatch));
      }),
    reducer: (event, previousState) => ({ ...previousState, [stateKey]: event.data }),
  };

  if (widget) {
    return { ...base, widget: React.memo(widget) };
  }

  return base;
};

export default createWidget;
