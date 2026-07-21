// eslint-disable-next-line import/no-unresolved
import { React } from 'uebersicht';
import { error } from 'console';

import css from './src/global-css';
import clock from './src/clock.jsx';
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
  cpu: '',
  day: '',
  disk: '',
  time: '',
  wifi: '',
  memory: '',
  volume: '',
  battery: '',
  playing: '',
  brightness: '',
  weather: 'Loading...',
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

export const updateState = (event, previousState) => {
  switch (event.type) {
    case clock.type:
      return { ...previousState, time: event.data };
    case weather.type:
      return { ...previousState, weather: event.data };
    case cpuUsage.type:
      return { ...previousState, cpu: event.data };
    case diskUsage.type:
      return { ...previousState, disk: event.data };
    case wifiSignal.type:
      return { ...previousState, wifi: event.data };
    case nowPlaying.type:
      return { ...previousState, playing: event.data };
    case dayProgress.type:
      return { ...previousState, day: event.data };
    case memoryUsage.type:
      return { ...previousState, memory: event.data };
    case volumeLevel.type:
      return { ...previousState, volume: event.data };
    case batteryLevel.type:
      return { ...previousState, battery: event.data };
    case brightnessLevel.type:
      return { ...previousState, brightness: event.data };
    default:
      return previousState;
  }
};

function Widget(state) {
  return (
    <React.Fragment>
      <clock.widget output={state.time} />
      <weather.widget output={state.weather} />
      <cpuUsage.widget output={state.cpu} />
      <diskUsage.widget output={state.disk} />
      <wifiSignal.widget output={state.wifi} />
      <nowPlaying.widget output={state.playing} />
      <dayProgress.widget output={state.day} />
      <memoryUsage.widget output={state.memory} />
      <volumeLevel.widget output={state.volume} />
      <batteryLevel.widget output={state.battery} />
      <brightnessLevel.widget output={state.brightness} />
    </React.Fragment>
  );
}

export const render = (state) => Widget(state);
