import { MAX_PERCENTAGE, NO_DATA } from '@/helpers/const';

export const getPercentage = (output?: string): string => {
  const val = Number(output?.trim());

  if (Number.isNaN(val)) {
    return NO_DATA;
  }

  return `${Math.min(MAX_PERCENTAGE, Math.max(0, val))}%`;
};
