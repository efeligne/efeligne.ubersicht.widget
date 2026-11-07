import { type Dispatch, safeInterval, safeRun } from '@/helpers/dispatcher';
import { LOADING } from '@/helpers/state';
import { loadConfig } from '@/lib/config';
import { getWidgets, registerWidgets } from '@/widgets';

let intervals: (NodeJS.Timeout | string | number | undefined)[] = [];

const dispatchers = (dispatch: Dispatch) => {
  loadConfig().then((cfg) => {
    registerWidgets(cfg);

    for (const widget of getWidgets()) {
      dispatch({ type: widget.type, data: LOADING });
    }

    for (const widget of getWidgets()) {
      safeRun(() => widget.runner(dispatch));
    }

    intervals = getWidgets().map((widget) => safeInterval(() => widget.runner(dispatch), widget.refreshTimeout));
  });
};

const destroy = () => {
  intervals.forEach(clearInterval);
  intervals = [];
};

export const initialize = { dispatchers, destroy };
