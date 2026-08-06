import { describe, expect, it } from 'vitest';
import { resolveActiveSelection } from './useSingleSelection';

describe('resolveActiveSelection', () => {
  it('returns the controlled value when it is defined', () => {
    expect(
      resolveActiveSelection({ controlledValue: 'controlled', uncontrolledValue: 'uncontrolled' })
    ).toBe('controlled');
  });

  it('returns the uncontrolled value when the controlled value is undefined', () => {
    expect(
      resolveActiveSelection({ controlledValue: undefined, uncontrolledValue: 'uncontrolled' })
    ).toBe('uncontrolled');
  });

  it('returns undefined when neither value is defined', () => {
    expect(resolveActiveSelection({})).toBeUndefined();
  });
});
