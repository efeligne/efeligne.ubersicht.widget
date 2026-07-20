// eslint-disable-next-line import/no-unresolved
import { React } from 'uebersicht';
import css from './src/global-css';
import clock from './src/clock.jsx';
import weather from './src/weather.jsx';

// disable standard Ubersicht refreshFrequency and command,
// cause "use" function is used instead
export const command = undefined;
export const refreshFrequency = false;

export const className = css;

export const initialState = {
  time: '',
  weather: 'Загрузка...',
};

export const init = (dispatch) => {
  // run at startup
  clock.runner(dispatch)();
  weather.runner(dispatch)();

  // run every refreshFrequency
  setInterval(clock.runner(dispatch), clock.refreshTimeout);
  setInterval(weather.runner(dispatch), weather.refreshTimeout);
};

export const updateState = (event, previousState) => {
  switch (event.type) {
    case 'SET_TIME':
      return { ...previousState, time: event.data };
    case 'SET_WEATHER':
      return { ...previousState, weather: event.data };
    default:
      return previousState;
  }
};

function Widget(state) {
  return (
    <React.Fragment>
      <clock.widget output={state.time} />
      <weather.widget output={state.weather} />
    </React.Fragment>
  );
}

export const render = (state) => Widget(state);
