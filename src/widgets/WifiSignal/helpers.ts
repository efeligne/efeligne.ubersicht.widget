import { MAX_PERCENTAGE } from '@/helpers/const';

export const getPercentage = (output?: string): string => {
  const signal = Number.parseInt(output?.trim() ?? '', 10);

  if (Number.isNaN(signal)) {
    return 'N/A';
  }

  return `${Math.min((signal + MAX_PERCENTAGE) * 2, MAX_PERCENTAGE)}%`;
};
