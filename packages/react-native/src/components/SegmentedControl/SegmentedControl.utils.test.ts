import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import {
  collectOptionValues,
  computeIndicatorLayout,
  resolveActiveValue,
  resolveInitialValue,
  resolveValidValue,
} from './SegmentedControl.utils';

const SegmentedControlOption = ({ value, children }: { value: string; children?: any }) =>
  createElement('SegmentedControlOption', { value }, children);
SegmentedControlOption.displayName = 'SegmentedControlOption';

const NotAnOption = ({ children }: { children?: any }) => createElement('NotAnOption', {}, children);
NotAnOption.displayName = 'NotAnOption';

describe('collectOptionValues', () => {
  it('collects the value of each top-level SegmentedControlOption child', () => {
    const children = [
      createElement(SegmentedControlOption, { value: 'a', key: 'a' }),
      createElement(SegmentedControlOption, { value: 'b', key: 'b' }),
    ];
    expect(collectOptionValues(children)).toEqual(['a', 'b']);
  });

  it('walks into non-option wrapper elements to find nested option children', () => {
    const children = createElement(
      NotAnOption,
      {},
      createElement(SegmentedControlOption, { value: 'nested' })
    );
    expect(collectOptionValues(children)).toEqual(['nested']);
  });

  it('skips non-option children and elements without a string value', () => {
    const children = [
      createElement(SegmentedControlOption, { value: 'a', key: 'a' }),
      createElement(NotAnOption, { key: 'b' }),
      createElement(SegmentedControlOption, { value: 42 as any, key: 'c' }),
    ];
    expect(collectOptionValues(children)).toEqual(['a']);
  });

  it('returns an empty array when there are no children', () => {
    expect(collectOptionValues(undefined)).toEqual([]);
  });
});

describe('resolveInitialValue', () => {
  it('uses the controlled value when defined, even if defaultValue is also set', () => {
    expect(
      resolveInitialValue({
        controlledValue: 'controlled',
        defaultValue: 'default',
        optionValues: ['a', 'b'],
      })
    ).toBe('controlled');
  });

  it('falls back to defaultValue when uncontrolled', () => {
    expect(
      resolveInitialValue({
        controlledValue: undefined,
        defaultValue: 'default',
        optionValues: ['a', 'b'],
      })
    ).toBe('default');
  });

  it('falls back to the first option value when uncontrolled and no defaultValue is set', () => {
    expect(
      resolveInitialValue({
        controlledValue: undefined,
        defaultValue: undefined,
        optionValues: ['a', 'b'],
      })
    ).toBe('a');
  });
});

describe('resolveActiveValue', () => {
  it('returns the controlled value when it is defined', () => {
    expect(
      resolveActiveValue({ controlledValue: 'controlled', uncontrolledValue: 'uncontrolled' })
    ).toBe('controlled');
  });

  it('returns the uncontrolled value when the controlled value is undefined', () => {
    expect(
      resolveActiveValue({ controlledValue: undefined, uncontrolledValue: 'uncontrolled' })
    ).toBe('uncontrolled');
  });
});

describe('resolveValidValue', () => {
  it('falls back to the first option value when there is no previous value', () => {
    expect(resolveValidValue({ prev: undefined, optionValues: ['a', 'b'] })).toBe('a');
  });

  it('falls back to the first option value when the previous value no longer exists', () => {
    expect(resolveValidValue({ prev: 'removed', optionValues: ['a', 'b'] })).toBe('a');
  });

  it('keeps the previous value when it is still a valid option', () => {
    expect(resolveValidValue({ prev: 'b', optionValues: ['a', 'b'] })).toBe('b');
  });
});

describe('computeIndicatorLayout', () => {
  it('offsets x and y by the given offset, leaving width/height untouched', () => {
    expect(computeIndicatorLayout({ x: 10, y: 20, width: 50, height: 30 }, 1)).toEqual({
      x: 9,
      y: 19,
      width: 50,
      height: 30,
    });
  });

  it('clamps x to 0 when the offset would push it negative', () => {
    expect(computeIndicatorLayout({ x: 0, y: 0, width: 50, height: 30 }, 1)).toEqual({
      x: 0,
      y: 0,
      width: 50,
      height: 30,
    });
  });

  it('applies a zero offset as a no-op for position', () => {
    expect(computeIndicatorLayout({ x: 5, y: 5, width: 20, height: 20 }, 0)).toEqual({
      x: 5,
      y: 5,
      width: 20,
      height: 20,
    });
  });
});
