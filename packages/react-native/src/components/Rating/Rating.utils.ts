import type { RatingValue } from './Rating.props';

export interface EmojiEntry {
  value: Exclude<RatingValue, 0>;
  emoji: string;
  accessibilityLabel: string;
}

export const EMOJI_LIST: EmojiEntry[] = [
  { value: 1, emoji: '\u{1F61E}', accessibilityLabel: 'Very dissatisfied' },
  { value: 2, emoji: '\u{1F615}', accessibilityLabel: 'Dissatisfied' },
  { value: 3, emoji: '\u{1F610}', accessibilityLabel: 'Neutral' },
  { value: 4, emoji: '\u{1F642}', accessibilityLabel: 'Satisfied' },
  { value: 5, emoji: '\u{1F604}', accessibilityLabel: 'Very satisfied' },
];

