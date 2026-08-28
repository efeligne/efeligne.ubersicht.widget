import createWidget from './widget-factory.jsx';
import config from '../lib/config.js';

const { refresh } = config;

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

export default createWidget({
  cmd: 'date "+%A_%d_%B_%l_%M_%p"',
  refreshTimeout: refresh.clock,
  type: 'SET_TIME',
  stateKey: 'time',
  widget: ({ output, theme }) => {
    if (!output) return null;

    const [dayName, day, month, hours, minutes, dayHalf] = dateHandler(output);
    const suffix = getSuffix(Number(day));

    return (
      <aside className={`clock ${theme}`}>
        <span>
          The {day} <sup>{suffix}</sup> of {month}
        </span>
        <span className="dayName">{dayName}</span>
        <div className="timeBlock">
          <hr />
          <div>
            <span>{hours}</span>
            <span className="colon">:</span>
            <span>{minutes}</span>
            <span>{dayHalf}</span>
          </div>
          <hr />
        </div>
      </aside>
    );
  },
});
