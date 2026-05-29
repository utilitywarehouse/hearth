import type { RatingValue } from './Rating.props';

export interface EmojiEntry {
  value: Exclude<RatingValue, 0>;
  accessibilityLabel: string;
}

export const EMOJI_LIST: EmojiEntry[] = [
  { value: 1, accessibilityLabel: 'Very dissatisfied' },
  { value: 2, accessibilityLabel: 'Dissatisfied' },
  { value: 3, accessibilityLabel: 'Neutral' },
  { value: 4, accessibilityLabel: 'Satisfied' },
  { value: 5, accessibilityLabel: 'Very satisfied' },
];
