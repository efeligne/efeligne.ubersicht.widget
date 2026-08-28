export interface DispatchProps {
  type: string;
  data: string;
  output?: string;
}

export type Dispatch = (event: DispatchProps) => void;

export const dispatcher = (type: string, dispatch: Dispatch) => (output?: string) => dispatch({ type, data: (output ?? '').trim() });
