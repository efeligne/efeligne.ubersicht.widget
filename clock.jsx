// eslint-disable-next-line import/no-unresolved
import { React } from 'uebersicht';

export const refreshFrequency = 1000; // ms

export const command = 'date';

export const className = {
  boxSizing: 'border-box',
  position: 'absolute',
  width: '640px',
  height: '300px',
  top: 'calc(40% - 200px)',
  right: 'calc(50% - 320px)',
  backgroundColor: 'rgba(251, 251, 253, 0.01)',
  borderRadius: '1rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'space-around',
};

const dayNames = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
  'Saturday', 'Sunday',
];

const monthNames = [
  'January', 'February', 'March',
  'April', 'May', 'June',
  'July', 'August', 'September',
  'October', 'November', 'December',
];

const getSuffix = (numDay) => {
  if (numDay === 1 || numDay === 21 || numDay === 31) return 'st';
  if (numDay === 2 || numDay === 22) return 'nd';
  if (numDay === 3 || numDay === 23) return 'rd';
  return 'th';
};

const toFullName = (shortName, fullNames) => fullNames.find((fullName) => {
  const lowerShortName = shortName?.toLowerCase();
  const lowerFullName = fullName.toLowerCase();
  return lowerFullName.startsWith(lowerShortName);
}) ?? '';

export const render = ({ output }) => {
  const dateParts = output.split(' ');

  const fullTime = dateParts[3];
  const dayName = toFullName(dateParts[0], dayNames);
  const day = dateParts[2];
  const suffix = getSuffix(Number(day));
  const month = toFullName(dateParts[1], monthNames);
  const year = dateParts[5];

  return (
    <aside style={{
      color: 'rgba(251, 251, 253, .64)',
      fontFamily: 'Courier New',
      fontWeight: 'lighter',
      fontSize: '3rem',
      textTransform: 'uppercase',
      letterSpacing: '0.12rem',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}
    >
      <span>{fullTime}</span>
      <span>
        {dayName} The {day}
        <sup>{suffix}</sup>
      </span>
      <span>
        {month}, {' '}
        {year}
      </span>
    </aside>
  );
};
