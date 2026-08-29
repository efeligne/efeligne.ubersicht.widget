import type { DateProps } from '@/widgets/Clock/types';

export const DateLine = ({ day, suffix, month }: DateProps) => {
  const dayText = `The ${day}`;
  const monthText = `of ${month}`;

  return (
    <span>
      {dayText} <sup>{suffix}</sup> {monthText}
    </span>
  );
};
