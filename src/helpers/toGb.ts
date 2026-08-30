import { KB_IN_MB } from '@/helpers/const';

export const toGb = (kb: number) => Math.round(kb / KB_IN_MB ** 2);
