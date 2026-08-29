import { MAX_PERCENTAGE } from '@/helpers/const';
import { toGb } from '@/helpers/toGb';

const DELIMETER_REGEX = /\r?\n/;

export const getPercentage = (output?: string) => {
  if (!output) {
    return 'N/A';
  }

  const outputLines = output.split(DELIMETER_REGEX).slice(1).filter(Boolean);

  if (outputLines.length === 0) {
    return 'N/A';
  }

  const size = outputLines[0] ?? '';
  const [, sizeString] = size.split(' ').filter(Boolean);
  const sizeGb = toGb(Number(sizeString));

  const totalUsed = outputLines.reduce((accumulator, current) => {
    const [, , used] = current.split(' ').filter(Boolean);
    return accumulator + Number(used);
  }, 0);

  const percentage = Math.round((toGb(totalUsed) * MAX_PERCENTAGE) / sizeGb);

  return `${percentage}%`;
};
