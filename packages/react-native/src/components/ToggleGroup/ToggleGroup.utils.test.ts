import { describe, expect, it } from 'vitest';
import { getNextToggleGroupValue, isToggleGroupItemSelected } from './ToggleGroup.utils';

describe('isToggleGroupItemSelected', () => {
  it('matches a single string value', () => {
    expect(isToggleGroupItemSelected('one', 'one')).toBe(true);
    expect(isToggleGroupItemSelected('one', 'two')).toBe(false);
  });

  it('checks membership of an array value', () => {
    expect(isToggleGroupItemSelected(['one', 'three'], 'three')).toBe(true);
    expect(isToggleGroupItemSelected(['one', 'three'], 'two')).toBe(false);
  });

  it('treats an empty or missing value as nothing selected', () => {
    expect(isToggleGroupItemSelected(undefined, 'one')).toBe(false);
    expect(isToggleGroupItemSelected('', 'one')).toBe(false);
    expect(isToggleGroupItemSelected([], 'one')).toBe(false);
  });
});

describe('getNextToggleGroupValue', () => {
  describe('single', () => {
    it('selects the pressed item', () => {
      expect(getNextToggleGroupValue('single', undefined, 'one')).toBe('one');
      expect(getNextToggleGroupValue('single', 'one', 'two')).toBe('two');
    });

    it('clears the value when the selected item is pressed again', () => {
      expect(getNextToggleGroupValue('single', 'one', 'one')).toBe('');
    });
  });

  describe('multiple', () => {
    it('adds an unselected item, keeping press order', () => {
      expect(getNextToggleGroupValue('multiple', undefined, 'one')).toEqual(['one']);
      expect(getNextToggleGroupValue('multiple', ['two'], 'one')).toEqual(['two', 'one']);
    });

    it('removes a selected item', () => {
      expect(getNextToggleGroupValue('multiple', ['one', 'two'], 'one')).toEqual(['two']);
    });

    it('does not mutate the current value', () => {
      const current = ['one'];
      getNextToggleGroupValue('multiple', current, 'two');
      expect(current).toEqual(['one']);
    });
  });
});
