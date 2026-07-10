import { describe, expect, it } from 'vitest';
import { filterOptionsByLabel } from './Select.utils';

const options = [
  { label: 'Broadband', value: 'broadband' },
  { label: 'Mobile', value: 'mobile' },
  { label: 'Home Insurance', value: 'insurance' },
];

describe('filterOptionsByLabel', () => {
  it('returns all options for an empty search', () => {
    expect(filterOptionsByLabel(options, '')).toEqual(options);
  });

  it('filters by a case-insensitive label substring', () => {
    expect(filterOptionsByLabel(options, 'mob')).toEqual([{ label: 'Mobile', value: 'mobile' }]);
    expect(filterOptionsByLabel(options, 'INSUR')).toEqual([
      { label: 'Home Insurance', value: 'insurance' },
    ]);
  });

  it('returns an empty array when nothing matches', () => {
    expect(filterOptionsByLabel(options, 'energy')).toEqual([]);
  });
});
