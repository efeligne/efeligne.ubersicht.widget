import { React, run } from 'uebersicht';
import { dispatcher, DispatchProps, Dispatch } from './dispatcher';

interface ComponentProps {
  theme: string;
  output: string;
}

interface WidgetProps {
  cmd?: string;
  refreshTimeout: number;
  type: string;
  stateKey: string;
  widget?: (props: ComponentProps) => React.ReactElement | null;
  runner?: (dispatch: Dispatch) => void;
}

interface Widget {
  refreshTimeout: number;
  type: string;
  stateKey: string;
  runner: (dispatch: Dispatch) => void;
  reducer: (event: DispatchProps, previousState: State) => State;
  widget: React.ComponentType<ComponentProps> | null;
}

export type State = Record<string, string>;

export const createWidget = ({ cmd, refreshTimeout, type, stateKey, widget, runner }: WidgetProps): Widget => {
  return {
    refreshTimeout,
    stateKey,
    type,
    runner:
      runner ??
      ((dispatch) => {
        cmd && run(cmd).then(dispatcher(type, dispatch));
      }),
    reducer: (event: DispatchProps, previousState: State) => ({ ...previousState, [stateKey]: event.data }),
    widget: widget ? React.memo(widget) : null,
  };
};
