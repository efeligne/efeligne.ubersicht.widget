// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './src/dispatcher';
import css from './src/global-css';
import clock from './src/clock.jsx';

// disable standard Ubersicht refreshFrequency and command,
// cause "use" function is used instead
export const command = undefined;
export const refreshFrequency = false;

export const className = css;

export const initialState = {
  time: '',
  weather: 'Загрузка...',
};

const weatherRefreshFrequency = 1800000;
const weatherRunner = (dispatch) => () => {
  const cmd = 'curl -s "wttr.in/?format=1"';
  const type = 'SET_WEATHER';
  run(cmd).then(dispatcher(type, dispatch));
};

export const init = (dispatch) => {
  // run at startup
  clock.runner(dispatch)();
  weatherRunner(dispatch)();

  // run every refreshFrequency
  setInterval(clock.runner(dispatch), clock.refreshTimeout);
  setInterval(weatherRunner(dispatch), weatherRefreshFrequency);
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
  const { time, weather } = state;
  return (
    <>
      <clock.widget output={time} />
      <div className="weather-section" style={{ fontSize: '14px', marginTop: '5px' }}>
        {weather}
      </div>
    </>
  );
}

export const render = (state) => Widget(state);
