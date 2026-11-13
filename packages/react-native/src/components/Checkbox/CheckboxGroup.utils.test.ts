import { describe, expect, it } from 'vitest';
import { resolveActiveSelection, toggleSelectedValue } from './CheckboxGroup.utils';

describe('resolveActiveSelection', () => {
  it('returns the controlled value when it is defined', () => {
    expect(
      resolveActiveSelection({ controlledValue: ['a'], uncontrolledValue: ['b'] })
    ).toEqual(['a']);
  });

  it('returns the uncontrolled value when the controlled value is undefined', () => {
    expect(resolveActiveSelection({ controlledValue: undefined, uncontrolledValue: ['b'] })).toEqual([
      'b',
    ]);
  });

  it('treats an explicit empty-array controlled value as defined', () => {
    expect(resolveActiveSelection({ controlledValue: [], uncontrolledValue: ['b'] })).toEqual([]);
  });
});

describe('toggleSelectedValue', () => {
  it('adds a value that is not currently selected', () => {
    expect(toggleSelectedValue(['a'], 'b')).toEqual(['a', 'b']);
  });

  it('removes a value that is currently selected', () => {
    expect(toggleSelectedValue(['a', 'b'], 'a')).toEqual(['b']);
  });

  it('does not mutate the input array', () => {
    const selectedValues = ['a'];
    toggleSelectedValue(selectedValues, 'b');
    expect(selectedValues).toEqual(['a']);
  });
});
