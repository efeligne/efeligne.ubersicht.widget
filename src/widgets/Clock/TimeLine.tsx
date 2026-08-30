import type { TimeProps } from '@/widgets/Clock/types';

export const TimeLine = ({ hours, minutes, dayHalf }: TimeProps) => {
  const delimeter = ':';

  return (
    <div className='timeBlock'>
      <hr />
      <div>
        <span>{hours}</span>
        <span className='colon'>{delimeter}</span>
        <span>{minutes}</span>
        <span>{dayHalf}</span>
      </div>
      <hr />
    </div>
  );
};
