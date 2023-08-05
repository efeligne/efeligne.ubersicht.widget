// eslint-disable-next-line import/no-unresolved
import { React, css } from 'uebersicht';

export const refreshFrequency = 1000;

export const command = 'date "+%w %d %B %l:%M %p"';

export const className = css`
  @keyframes blink {
    50% {
      opacity: 0;
    }
  }

  box-sizing: border-box;
  position: absolute;
  width: 26rem;
  height: 15rem;
  top: 2rem;
  left: calc(50% - 13rem);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
`;

const parentBlockStyle = {
  color: '#112c42',
  fontFamily: 'Snell Roundhand',
  fontSize: '2rem',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
};

const hrStyle = {
  flexGrow: 1,
  height: '2px',
  border: 0,
  backgroundColor: '#112c42',
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

const monthStyle = {
  letterSpacing: '0.25rem',
  fontSize: '4rem',
  fontFamily: 'New York',
  paddingLeft: '0.3rem',
};

const dayNameStyle = {
  fontSize: '3rem',
  letterSpacing: '0.25rem',
};

const dayNames = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
  'Saturday', 'Sunday',
];

const getSuffix = (numDay) => {
  if (numDay === 1 || numDay === 21 || numDay === 31) return 'st';
  if (numDay === 2 || numDay === 22) return 'nd';
  if (numDay === 3 || numDay === 23) return 'rd';
  return 'th';
};

export const render = ({ output }) => {
  const dateParts = output.split(' ');
  const [hours, minutes] = dateParts[4].split(':');
  const dayHalf = dateParts[5];
  const dayName = dayNames[dateParts[0] - 1];
  const day = dateParts[1];
  const suffix = getSuffix(Number(day));
  const month = `${dateParts[2]}`;

  return (
    <aside style={parentBlockStyle}>
      <span>
        The {day} <sup>{suffix}</sup>
      </span>
      <svg width="179" height="44" viewBox="0 0 179 44">
        <path d="M3.67464 3.14286H175.325V42H177V2H2V42H3.67464V3.14286Z" stroke="#112c42" strokeWidth="2" />
      </svg>
      <span style={monthStyle}>{month.toUpperCase()}</span>
      <svg width="179" height="44" viewBox="0 0 179 44">
        <path d="M3.67464 2H2V42H177V2H175.325V40.8571H3.67464V2Z" stroke="#112c42" strokeWidth="2" />
      </svg>
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
};
