// eslint-disable-next-line import/no-unresolved
import { React } from 'uebersicht';
import css from './src/global-css';
import clock from './src/clock.jsx';
import weather from './src/weather.jsx';
import nowPlaying from './src/now-playing.jsx';
import diskUsage from './src/disk-usage.jsx';
import batteryLevel from './src/battery-level.jsx';

// disable standard Ubersicht refreshFrequency and command,
// cause "use" function is used instead
export const command = undefined;
export const refreshFrequency = false;

export const className = css;

export const initialState = {
  time: '',
  weather: 'Загрузка...',
  playing: '',
  disk: '',
  battery: '',
};

export const init = (dispatch) => {
  // run at startup
  clock.runner(dispatch)();
  weather.runner(dispatch)();
  nowPlaying.runner(dispatch)();
  diskUsage.runner(dispatch)();
  batteryLevel.runner(dispatch)();

  // run every refreshFrequency
  setInterval(clock.runner(dispatch), clock.refreshTimeout);
  setInterval(weather.runner(dispatch), weather.refreshTimeout);
  setInterval(nowPlaying.runner(dispatch), nowPlaying.refreshTimeout);
  setInterval(diskUsage.runner(dispatch), diskUsage.refreshTimeout);
  setInterval(batteryLevel.runner(dispatch), batteryLevel.refreshTimeout);
};

export const updateState = (event, previousState) => {
  switch (event.type) {
    case clock.type:
      return { ...previousState, time: event.data };
    case weather.type:
      return { ...previousState, weather: event.data };
    case nowPlaying.type:
      return { ...previousState, playing: event.data };
    case diskUsage.type:
      return { ...previousState, disk: event.data };
    case batteryLevel.type:
      return { ...previousState, battery: event.data };
    default:
      return previousState;
  }
};

function Widget(state) {
  return (
    <React.Fragment>
      <clock.widget output={state.time} />
      <weather.widget output={state.weather} />
      <nowPlaying.widget output={state.playing} />
      <diskUsage.widget output={state.disk} />
      <batteryLevel.widget output={state.battery} />
    </React.Fragment>
  );
}

export const render = (state) => Widget(state);
