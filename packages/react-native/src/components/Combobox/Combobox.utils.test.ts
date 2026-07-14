import { describe, expect, it } from 'vitest';
import { defaultFilterOption } from './Combobox.utils';

const option = { label: 'United Kingdom', value: 'uk', keywords: ['Britain', 'England'] };

describe('defaultFilterOption', () => {
  it('matches every option for an empty or whitespace query', () => {
    expect(defaultFilterOption(option, '')).toBe(true);
    expect(defaultFilterOption(option, '   ')).toBe(true);
  });

  it('matches on a case-insensitive label substring', () => {
    expect(defaultFilterOption(option, 'united')).toBe(true);
    expect(defaultFilterOption(option, 'KINGDOM')).toBe(true);
  });

  it('matches on keywords', () => {
    expect(defaultFilterOption(option, 'britain')).toBe(true);
    expect(defaultFilterOption(option, 'engl')).toBe(true);
  });

  it('rejects non-matching queries', () => {
    expect(defaultFilterOption(option, 'france')).toBe(false);
  });

  it('trims the query before matching', () => {
    expect(defaultFilterOption(option, '  united  ')).toBe(true);
  });

  it('works for options without keywords', () => {
    expect(defaultFilterOption({ label: 'France', value: 'fr' }, 'fra')).toBe(true);
    expect(defaultFilterOption({ label: 'France', value: 'fr' }, 'uk')).toBe(false);
  });
});
