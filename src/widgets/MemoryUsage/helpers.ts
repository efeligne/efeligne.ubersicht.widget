import { MAX_PERCENTAGE } from '@/helpers/const';

export const getPercentage = (output?: string) => {
  const percents = Number(output?.trim());

  if (Number.isNaN(percents)) {
    return 'N/A';
  }

  return `${MAX_PERCENTAGE - percents}%`;
};
