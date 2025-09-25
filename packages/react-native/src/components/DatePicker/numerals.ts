import { Numerals } from './types';

export const numeralSystems: Record<Numerals, readonly string[]> = {
  latn: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
} as const;
