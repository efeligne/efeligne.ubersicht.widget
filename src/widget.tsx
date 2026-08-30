import { React } from 'uebersicht';

import { initialize } from '@/helpers/init';
import { type State, useState } from '@/helpers/state';
import { styles } from '@/helpers/styles';
import { widgets } from '@/widgets';

// biome-ignore-start lint/style/useComponentExportOnlyModules: Ubersicht needs to be able to render this widget
// disable standard Ubersicht refreshFrequency and command,
// cause "use" function is used instead
export const command = undefined;
export const refreshFrequency = false;
export const className = styles;
export const { destroy, dispatchers: init } = initialize;
export const { init: initialState, update: updateState } = useState;
export const render = (state: State) => Widget(state);
// biome-ignore-end lint/style/useComponentExportOnlyModules: Ubersicht needs to be able to render this widget

export function Widget(state: State) {
  const components = widgets.map(({ widget: Component, stateKey }) => {
    if (Component) {
      return <Component key={stateKey} output={state[stateKey]} theme={state.theme} />;
    }
    return null;
  });

  return <React.Fragment>{components}</React.Fragment>;
}
