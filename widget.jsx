// eslint-disable-next-line import/no-unresolved
import { React } from 'uebersicht';
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

export const init = (dispatch) => {
  // run at startup
  clock.runner(dispatch)();
  weather.runner(dispatch)();
  cpuUsage.runner(dispatch)();
  diskUsage.runner(dispatch)();
  wifiSignal.runner(dispatch)();
  nowPlaying.runner(dispatch)();
  dayProgress.runner(dispatch)();
  memoryUsage.runner(dispatch)();
  volumeLevel.runner(dispatch)();
  batteryLevel.runner(dispatch)();
  brightnessLevel.runner(dispatch)();

  // run every refresh frequency
  const intervals = [
    setInterval(clock.runner(dispatch), clock.refreshTimeout),
    setInterval(weather.runner(dispatch), weather.refreshTimeout),
    setInterval(cpuUsage.runner(dispatch), cpuUsage.refreshTimeout),
    setInterval(diskUsage.runner(dispatch), diskUsage.refreshTimeout),
    setInterval(wifiSignal.runner(dispatch), wifiSignal.refreshTimeout),
    setInterval(nowPlaying.runner(dispatch), nowPlaying.refreshTimeout),
    setInterval(dayProgress.runner(dispatch), dayProgress.refreshTimeout),
    setInterval(memoryUsage.runner(dispatch), memoryUsage.refreshTimeout),
    setInterval(volumeLevel.runner(dispatch), volumeLevel.refreshTimeout),
    setInterval(batteryLevel.runner(dispatch), batteryLevel.refreshTimeout),
    setInterval(brightnessLevel.runner(dispatch), brightnessLevel.refreshTimeout),
  ];

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
