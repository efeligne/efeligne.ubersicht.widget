import type { React } from 'uebersicht';

import { ThemeProvider } from '@/helpers/context';
import { initialize } from '@/helpers/init';
import { type State, useState } from '@/helpers/state';
import { styles } from '@/helpers/styles';
import { getConfig } from '@/lib/config';
import { getWidgets } from '@/widgets';

const DOCK_INSET = 14;
const DEFAULT_THEME = 'light';
const ORIENTATION = /"?orientation"?\s*=\s*(\w+)/;
const AUTOHIDE = /"?autohide"?\s*=\s*(\d+)/;
const TILE_SIZE = /"?tilesize"?\s*=\s*(\d+)/;

interface DockShift {
  bottom: number;
  left: number;
  right: number;
}

const NO_SHIFT: DockShift = { bottom: 0, left: 0, right: 0 };

const getDockShift = (dock: string | undefined): DockShift => {
  const raw = dock ?? '';

  if (AUTOHIDE.exec(raw)?.[1] === '1') {
    return NO_SHIFT;
  }

  const tileSize = Number.parseInt(TILE_SIZE.exec(raw)?.[1] ?? '', 10);

  if (Number.isNaN(tileSize)) {
    return NO_SHIFT;
  }

  const size = tileSize + DOCK_INSET;
  const orientation = ORIENTATION.exec(raw)?.[1];

  if (orientation === 'left') {
    return { bottom: 0, left: size, right: 0 };
  }

  if (orientation === 'right') {
    return { bottom: 0, left: 0, right: size };
  }

  return { bottom: size, left: 0, right: 0 };
};

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
  const components = getWidgets().map(({ widget: Component, stateKey }) => {
    if (Component) {
      return <Component key={stateKey} output={state[stateKey]} />;
    }
    return null;
  });

  const shift = getDockShift(state.dock);
  const { colors } = getConfig();
  const dockStyle = {
    '--fg': colors.fg,
    '--fg-dark': colors.fgDark,
    '--track': colors.track,
    '--track-dark': colors.trackDark,
    '--dock-bottom-extra': `${shift.bottom}px`,
    '--dock-left-extra': `${shift.left}px`,
    '--dock-right-extra': `${shift.right}px`,
  } as React.CSSProperties;

  return (
    <ThemeProvider value={state.theme ?? DEFAULT_THEME}>
      <div style={dockStyle}>{components}</div>
    </ThemeProvider>
  );
}
