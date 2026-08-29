import type { Dispatch, DispatchProps } from '@/helpers/dispatcher';
import type { State } from '@/helpers/state';

export interface ComponentProps {
  theme: string;
  output?: string;
}

export type InputWidget = (props: ComponentProps) => React.ReactElement | null;
export type OutputWidget = React.ComponentType<ComponentProps> | null;
export type Runner = (dispatch: Dispatch) => void;
export type Reducer = (event: DispatchProps, previousState: State) => State;

export interface WidgetProps {
  cmd?: string;
  refreshTimeout: number;
  type: string;
  stateKey: string;
  widget?: InputWidget;
  runner?: Runner;
}

export interface WidgetOut {
  refreshTimeout: number;
  type: string;
  stateKey: string;
  runner: Runner;
  reducer: Reducer;
  widget: OutputWidget;
}

export type CreateWidget = (props: WidgetProps) => WidgetOut;
