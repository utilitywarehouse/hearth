import { describe, expect, it } from 'vitest';
import { EMOJI_LIST, getEmojiForValue } from './Rating.utils';

describe('EMOJI_LIST', () => {
  it('has exactly 5 emojis mapped to values 1-5', () => {
    expect(EMOJI_LIST).toHaveLength(5);
    expect(EMOJI_LIST.map(e => e.value)).toEqual([1, 2, 3, 4, 5]);
  });

  it('each entry has an emoji character and an accessibility label', () => {
    for (const entry of EMOJI_LIST) {
      expect(entry.emoji).toBeTruthy();
      expect(entry.accessibilityLabel).toBeTruthy();
    }
  });
});

describe('getEmojiForValue', () => {
  it('returns the correct emoji for a given value', () => {
    expect(getEmojiForValue(1).emoji).toBe('\u{1F61E}');
    expect(getEmojiForValue(5).emoji).toBe('\u{1F604}');
  });

});
