export const getDaySuffix = (numDay: number) => {
  if (numDay === 1 || numDay === 21 || numDay === 31) return 'st';
  if (numDay === 2 || numDay === 22) return 'nd';
  if (numDay === 3 || numDay === 23) return 'rd';
  return 'th';
};

export const dateHandler = (date: string) =>
  date.split('_').map((part, i) => {
    const trimmed = part.trim();
    if (i === 0) return trimmed.toUpperCase();
    if (i === 5) return ` ${trimmed}`;
    return trimmed;
  });

