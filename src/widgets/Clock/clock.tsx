import { DateLine } from '@/widgets/Clock/DateLine';
import { dateHandler, getDaySuffix } from '@/widgets/Clock/helpers';
import { TimeLine } from '@/widgets/Clock/TimeLine';
import type { InputWidget } from '@/widgets/Factory/types';

export const Clock: InputWidget = ({ output, theme }) => {
  if (output) {
    const [dayName, day, month, hours, minutes, dayHalf] = dateHandler(output);
    const suffix = getDaySuffix(Number(day));

    return (
      <aside className={`clock ${theme}`}>
        <DateLine day={day} suffix={suffix} month={month} />
        <span className='dayName'>{dayName}</span>
        <TimeLine hours={hours} minutes={minutes} dayHalf={dayHalf} />
      </aside>
    );
  }

  return null;
};
