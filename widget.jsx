import { React } from 'uebersicht';
import { error } from 'console';

import css from './src/global-css';
import clock from './src/clock.jsx';
import theme from './src/theme.js';
import weather from './src/weather.jsx';
import nowPlaying from './src/now-playing.jsx';
import diskUsage from './src/disk-usage.jsx';
import batteryLevel from './src/battery-level.jsx';
import brightnessLevel from './src/brightness-level.jsx';
import cpuUsage from './src/cpu-usage.jsx';
import dayProgress from './src/day-progress.jsx';
import wifiSignal from './src/wifi-signal.jsx';
import memoryUsage from './src/memory-usage.jsx';
import volumeLevel from './src/volume-level.jsx';

// disable standard Ubersicht refreshFrequency and command,
// cause "use" function is used instead
export const command = undefined;
export const refreshFrequency = false;

export const className = css;

export const initialState = {
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

const safeRun = (fn) => {
  try {
    fn();
  } catch (e) {
    error(e);
  }
};

const safeInterval = (fn, ms) => {
  try {
    return setInterval(fn, ms);
  } catch (e) {
    error(e);
    return null;
  }
};

export const init = (dispatch) => {
  safeRun(clock.runner(dispatch));
  safeRun(theme.runner(dispatch));
  safeRun(weather.runner(dispatch));
  safeRun(cpuUsage.runner(dispatch));
  safeRun(diskUsage.runner(dispatch));
  safeRun(wifiSignal.runner(dispatch));
  safeRun(nowPlaying.runner(dispatch));
  safeRun(dayProgress.runner(dispatch));
  safeRun(memoryUsage.runner(dispatch));
  safeRun(volumeLevel.runner(dispatch));
  safeRun(batteryLevel.runner(dispatch));
  safeRun(brightnessLevel.runner(dispatch));

  const intervals = [
    safeInterval(clock.runner(dispatch), clock.refreshTimeout),
    safeInterval(theme.runner(dispatch), theme.refreshTimeout),
    safeInterval(weather.runner(dispatch), weather.refreshTimeout),
    safeInterval(cpuUsage.runner(dispatch), cpuUsage.refreshTimeout),
    safeInterval(diskUsage.runner(dispatch), diskUsage.refreshTimeout),
    safeInterval(wifiSignal.runner(dispatch), wifiSignal.refreshTimeout),
    safeInterval(nowPlaying.runner(dispatch), nowPlaying.refreshTimeout),
    safeInterval(dayProgress.runner(dispatch), dayProgress.refreshTimeout),
    safeInterval(memoryUsage.runner(dispatch), memoryUsage.refreshTimeout),
    safeInterval(volumeLevel.runner(dispatch), volumeLevel.refreshTimeout),
    safeInterval(batteryLevel.runner(dispatch), batteryLevel.refreshTimeout),
    safeInterval(brightnessLevel.runner(dispatch), brightnessLevel.refreshTimeout),
  ].filter(Boolean);

  return intervals;
};

export const destroy = (intervals) => {
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

export const updateState = (event, previousState) => {
  if (reducers.has(event.type)) {
    return reducers.get(event.type)(event, previousState);
  }

  return previousState;
};

function Widget(state) {
  return (
    <React.Fragment>
      <clock.widget output={state.time} theme={state.theme} />
      <weather.widget output={state.weather} theme={state.theme} />
      <cpuUsage.widget output={state.cpu} theme={state.theme} />
      <diskUsage.widget output={state.disk} theme={state.theme} />
      <wifiSignal.widget output={state.wifi} theme={state.theme} />
      <nowPlaying.widget output={state.playing} theme={state.theme} />
      <dayProgress.widget output={state.day} theme={state.theme} />
      <memoryUsage.widget output={state.memory} theme={state.theme} />
      <volumeLevel.widget output={state.volume} theme={state.theme} />
      <batteryLevel.widget output={state.battery} theme={state.theme} />
      <brightnessLevel.widget output={state.brightness} theme={state.theme} />
    </React.Fragment>
  );
}

export const render = (state) => Widget(state);
