import { describe, expect, it } from 'vitest';
import { toggleSelection } from './PillGroup.utils';

describe('toggleSelection', () => {
  it('adds the pressed value in multiple mode when it is not already selected', () => {
    expect(
      toggleSelection({ currentValue: ['a'], pillValue: 'b', multiple: true })
    ).toEqual(['a', 'b']);
  });

  it('removes the pressed value in multiple mode when it is already selected', () => {
    expect(
      toggleSelection({ currentValue: ['a', 'b'], pillValue: 'a', multiple: true })
    ).toEqual(['b']);
  });

  it('adds the pressed value to an empty selection in multiple mode', () => {
    expect(
      toggleSelection({ currentValue: [], pillValue: 'a', multiple: true })
    ).toEqual(['a']);
  });

  it('removes the only selected value in multiple mode, leaving an empty array', () => {
    expect(
      toggleSelection({ currentValue: ['a'], pillValue: 'a', multiple: true })
    ).toEqual([]);
  });

  it('replaces the current value with the pressed value in single-select mode', () => {
    expect(
      toggleSelection({ currentValue: ['a'], pillValue: 'b', multiple: false })
    ).toBe('b');
  });

  it('re-selects the same value when pressing the already-selected pill in single-select mode', () => {
    expect(
      toggleSelection({ currentValue: ['a'], pillValue: 'a', multiple: false })
    ).toBe('a');
  });

  it('returns the pressed value in single-select mode even when nothing was previously selected', () => {
    expect(
      toggleSelection({ currentValue: [''], pillValue: 'a', multiple: false })
    ).toBe('a');
  });
});
