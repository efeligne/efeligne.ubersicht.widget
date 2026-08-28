import { React } from 'uebersicht';

import theme from './helpers/theme';
import css from './helpers/global-css';

import clock from './components/clock';
import weather from './components/weather';
import nowPlaying from './components/now-playing';
import diskUsage from './components/disk-usage';
import batteryLevel from './components/battery-level';
import brightnessLevel from './components/brightness-level';
import cpuUsage from './components/cpu-usage';
import dayProgress from './components/day-progress';
import wifiSignal from './components/wifi-signal';
import memoryUsage from './components/memory-usage';
import volumeLevel from './components/volume-level';

import { Dispatch, DispatchProps } from './helpers/dispatcher';
import { State } from './helpers/widget-factory';

// disable standard Ubersicht refreshFrequency and command,
// cause "use" function is used instead
export const command = undefined;
export const refreshFrequency = false;

export const className = css;

export const initialState: State = {
  [cpuUsage.stateKey]: '',
  [dayProgress.stateKey]: '',
  [diskUsage.stateKey]: '',
  [clock.stateKey]: '',
  [wifiSignal.stateKey]: '',
  [theme.stateKey]: '',
  [memoryUsage.stateKey]: '',
  [volumeLevel.stateKey]: '',
  [batteryLevel.stateKey]: '',
  [nowPlaying.stateKey]: '',
  [brightnessLevel.stateKey]: '',
  [weather.stateKey]: 'Loading...',
};

const safeRun = (fn: () => void) => {
  try {
    fn();
  } catch (e) {
    console.error(e);
  }
};

const safeInterval = (fn: () => void, ms: number) => {
  try {
    return setInterval(fn, ms);
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const init = (dispatch: Dispatch) => {
  safeRun(() => clock.runner(dispatch));
  safeRun(() => theme.runner(dispatch));
  safeRun(() => weather.runner(dispatch));
  safeRun(() => cpuUsage.runner(dispatch));
  safeRun(() => diskUsage.runner(dispatch));
  safeRun(() => wifiSignal.runner(dispatch));
  safeRun(() => nowPlaying.runner(dispatch));
  safeRun(() => dayProgress.runner(dispatch));
  safeRun(() => memoryUsage.runner(dispatch));
  safeRun(() => volumeLevel.runner(dispatch));
  safeRun(() => batteryLevel.runner(dispatch));
  safeRun(() => brightnessLevel.runner(dispatch));

  const intervals = [
    safeInterval(() => clock.runner(dispatch), clock.refreshTimeout),
    safeInterval(() => theme.runner(dispatch), theme.refreshTimeout),
    safeInterval(() => weather.runner(dispatch), weather.refreshTimeout),
    safeInterval(() => cpuUsage.runner(dispatch), cpuUsage.refreshTimeout),
    safeInterval(() => diskUsage.runner(dispatch), diskUsage.refreshTimeout),
    safeInterval(() => wifiSignal.runner(dispatch), wifiSignal.refreshTimeout),
    safeInterval(() => nowPlaying.runner(dispatch), nowPlaying.refreshTimeout),
    safeInterval(() => dayProgress.runner(dispatch), dayProgress.refreshTimeout),
    safeInterval(() => memoryUsage.runner(dispatch), memoryUsage.refreshTimeout),
    safeInterval(() => volumeLevel.runner(dispatch), volumeLevel.refreshTimeout),
    safeInterval(() => batteryLevel.runner(dispatch), batteryLevel.refreshTimeout),
    safeInterval(() => brightnessLevel.runner(dispatch), brightnessLevel.refreshTimeout),
  ].filter(Boolean);

  return intervals;
};

export const destroy = (intervals: (NodeJS.Timeout | string | number | undefined)[]) => {
  intervals.forEach(clearInterval);
};

const reducers = new Map([
  [weather.type, weather.reducer],
  [cpuUsage.type, cpuUsage.reducer],
  [diskUsage.type, diskUsage.reducer],
  [wifiSignal.type, wifiSignal.reducer],
  [nowPlaying.type, nowPlaying.reducer],
  [dayProgress.type, dayProgress.reducer],
  [memoryUsage.type, memoryUsage.reducer],
  [volumeLevel.type, volumeLevel.reducer],
  [batteryLevel.type, batteryLevel.reducer],
  [brightnessLevel.type, brightnessLevel.reducer],
  [theme.type, theme.reducer],
  [clock.type, clock.reducer],
]);

export const updateState = (event: DispatchProps, previousState: State) => {
  const reducer = reducers.get(event.type);
  if (reducer) return reducer(event, previousState);
  return previousState;
};

function Widget(state: State) {
  const widgets = [
    clock, weather, cpuUsage,
    diskUsage, wifiSignal, nowPlaying,
    dayProgress, memoryUsage, volumeLevel,
    batteryLevel, brightnessLevel,
  ];

  return (
    <React.Fragment>
      {widgets.map(({ widget: Component, stateKey }) => {
        return Component && <Component output={state[stateKey]} theme={state.theme} />;
      })}
    </React.Fragment>
  );
}

export const render = (state: State) => Widget(state);
