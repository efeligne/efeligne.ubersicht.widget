export interface DispatchProps {
  type: string;
  data: string;
  output?: string;
}

export const safeRun = (fn: () => void) => {
  try {
    fn();
  } catch (e) {
    console.error(e);
  }
};

export const safeInterval = (fn: () => void, ms: number) => {
  try {
    return setInterval(fn, ms);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export type Dispatch = (event: DispatchProps) => void;

export const dispatcher = (type: string, dispatch: Dispatch) => (output?: string) =>
  dispatch({ type, data: (output ?? '').trim() });
