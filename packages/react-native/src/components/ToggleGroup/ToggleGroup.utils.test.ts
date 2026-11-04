import { describe, expect, it } from 'vitest';
import {
  getNextToggleGroupValue,
  getRovingFocusIndex,
  isToggleGroupItemSelected,
} from './ToggleGroup.utils';

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

  it('does not select an empty-valued item when a single group is cleared', () => {
    const cleared = getNextToggleGroupValue('single', 'one', 'one');
    expect(isToggleGroupItemSelected(cleared, '')).toBe(false);
    expect(isToggleGroupItemSelected(cleared, 'one')).toBe(false);
  });
});

describe('getRovingFocusIndex', () => {
  it('moves to the next item with ArrowRight and ArrowDown, wrapping at the end', () => {
    expect(getRovingFocusIndex('ArrowRight', 0, 3)).toBe(1);
    expect(getRovingFocusIndex('ArrowDown', 1, 3)).toBe(2);
    expect(getRovingFocusIndex('ArrowRight', 2, 3)).toBe(0);
  });

  it('moves to the previous item with ArrowLeft and ArrowUp, wrapping at the start', () => {
    expect(getRovingFocusIndex('ArrowLeft', 2, 3)).toBe(1);
    expect(getRovingFocusIndex('ArrowUp', 1, 3)).toBe(0);
    expect(getRovingFocusIndex('ArrowLeft', 0, 3)).toBe(2);
  });

  it('moves to the first and last items with Home and End', () => {
    expect(getRovingFocusIndex('Home', 2, 3)).toBe(0);
    expect(getRovingFocusIndex('End', 0, 3)).toBe(2);
  });

  it('ignores other keys and empty groups', () => {
    expect(getRovingFocusIndex('Tab', 0, 3)).toBeNull();
    expect(getRovingFocusIndex(' ', 0, 3)).toBeNull();
    expect(getRovingFocusIndex('ArrowRight', 0, 0)).toBeNull();
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
