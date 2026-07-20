// eslint-disable-next-line import/no-unresolved
import { React } from 'uebersicht';
import css from './src/global-css';
import clock from './src/clock.jsx';
import weather from './src/weather.jsx';
import nowPlaying from './src/now-playing.jsx';

// disable standard Ubersicht refreshFrequency and command,
// cause "use" function is used instead
export const command = undefined;
export const refreshFrequency = false;

export const className = css;

export const initialState = {
  time: '',
  weather: 'Загрузка...',
  playing: '',
};

export const init = (dispatch) => {
  // run at startup
  clock.runner(dispatch)();
  weather.runner(dispatch)();
  nowPlaying.runner(dispatch)();

  // run every refreshFrequency
  setInterval(clock.runner(dispatch), clock.refreshTimeout);
  setInterval(weather.runner(dispatch), weather.refreshTimeout);
  setInterval(nowPlaying.runner(dispatch), nowPlaying.refreshTimeout);
};

export const updateState = (event, previousState) => {
  switch (event.type) {
    case 'SET_TIME':
      return { ...previousState, time: event.data };
    case 'SET_WEATHER':
      return { ...previousState, weather: event.data };
    case 'SET_NOW_PLAYING':
      return { ...previousState, playing: event.data };
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
    </React.Fragment>
  );
}

export const render = (state) => Widget(state);
