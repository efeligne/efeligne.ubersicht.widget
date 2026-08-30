import { type Dispatch, safeInterval, safeRun } from '@/helpers/dispatcher';
import { widgets } from '@/widgets';

const dispatchers = (dispatch: Dispatch) => {
  for (const widget of widgets) {
    safeRun(() => widget.runner(dispatch));
  }

  return widgets.map((widget) => safeInterval(() => widget.runner(dispatch), widget.refreshTimeout));
};

const destroy = (intervals: (NodeJS.Timeout | string | number | undefined)[]) => {
  intervals.forEach(clearInterval);
};

export const initialize = { dispatchers, destroy };
