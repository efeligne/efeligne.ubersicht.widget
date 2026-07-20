// eslint-disable-next-line import/no-unresolved
import { React, run } from 'uebersicht';
import dispatcher from './dispatcher';

const getSuffix = (numDay) => {
  if (numDay === 1 || numDay === 21 || numDay === 31) return 'st';
  if (numDay === 2 || numDay === 22) return 'nd';
  if (numDay === 3 || numDay === 23) return 'rd';
  return 'th';
};

const dateHandler = (dateString) =>
  dateString.split('_').map((part, i) => {
    const trimmed = part.trim();
    if (i === 0) return trimmed.toUpperCase();
    if (i === 5) return ` ${trimmed}`;
    return trimmed;
  });

const parentBlockStyle = {
  color: '#111111',
  fontFamily: 'Snell Roundhand',
  fontSize: '2rem',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',

  position: 'absolute',
  width: '26rem',
  height: '15rem',
  top: '2rem',
  left: 'calc(50% - 13.05rem)',
  borderRadius: '1rem',
};

const hrStyle = {
  flexGrow: 1,
  height: '2px',
  border: 0,
  backgroundColor: '#111111',
};

const timeBlockStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '80%',
  gap: '1rem',
  marginTop: '0.5rem',
  fontFamily: 'Courier New',
};

const colonStyle = {
  fontFamily: 'Courier New',
  animation: 'blink 1s linear infinite',
};

const dayNameStyle = {
  letterSpacing: '0.25rem',
  fontSize: '4rem',
  fontFamily: 'New York',
  paddingLeft: '0.3rem',
};

function widget({ output }) {
  if (!output) return null;
  const [dayName, day, month, hours, minutes, dayHalf] = dateHandler(output);
  const suffix = getSuffix(Number(day));

  return (
    <aside style={parentBlockStyle}>
      <span>
        The {day} <sup>{suffix}</sup> of {month}
      </span>
      <span style={dayNameStyle}>{dayName}</span>
      <div style={timeBlockStyle}>
        <hr style={hrStyle} />
        <div>
          <span>{hours}</span>
          <span style={colonStyle}>:</span>
          <span>{minutes}</span>
          <span>{dayHalf}</span>
        </div>
        <hr style={hrStyle} />
      </div>
    </aside>
  );
}

const runner = (dispatch) => () => {
  const cmd = 'date "+%A_%d_%B_%l_%M_%p"';
  const type = 'SET_TIME';
  run(cmd).then(dispatcher(type, dispatch));
};

export default { refreshTimeout: 1000, runner, widget };
