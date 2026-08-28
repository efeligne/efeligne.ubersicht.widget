import { createWidget } from '../helpers/widget-factory';
import { dateHandler, getDaySuffix } from '../helpers/date-helpers';
import { config } from '../../lib/config';

export default createWidget({
  cmd: 'date "+%A_%d_%B_%l_%M_%p"',
  refreshTimeout: config.refresh.clock,
  type: 'SET_TIME',
  stateKey: 'time',
  widget: ({ output, theme }) => {
    if (!output) return null;

    const [dayName, day, month, hours, minutes, dayHalf] = dateHandler(output);
    const suffix = getDaySuffix(Number(day));

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
