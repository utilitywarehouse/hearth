import { createElement } from 'react';
import { describe, expect, it } from 'vitest';
import {
  collectTabValues,
  computeScrollTarget,
  computeScrollVisibility,
  resolveActiveValue,
  resolveInitialValue,
  resolveValidValue,
} from './Tabs.utils';

const Tab = ({ value, children }: { value: string; children?: any }) =>
  createElement('Tab', { value }, children);
Tab.displayName = 'Tab';

const NotATab = ({ children }: { children?: any }) => createElement('NotATab', {}, children);
NotATab.displayName = 'NotATab';

describe('collectTabValues', () => {
  it('collects the value of each top-level Tab child', () => {
    const children = [createElement(Tab, { value: 'a', key: 'a' }), createElement(Tab, { value: 'b', key: 'b' })];
    expect(collectTabValues(children)).toEqual(['a', 'b']);
  });

  it('walks into non-Tab wrapper elements to find nested Tab children', () => {
    const children = createElement(
      NotATab,
      {},
      createElement(Tab, { value: 'nested' })
    );
    expect(collectTabValues(children)).toEqual(['nested']);
  });

  it('skips non-Tab children and elements without a string value', () => {
    const children = [
      createElement(Tab, { value: 'a', key: 'a' }),
      createElement(NotATab, { key: 'b' }),
      createElement(Tab, { value: 42 as any, key: 'c' }),
    ];
    expect(collectTabValues(children)).toEqual(['a']);
  });

  it('returns an empty array when there are no children', () => {
    expect(collectTabValues(undefined)).toEqual([]);
  });
});

describe('resolveInitialValue', () => {
  it('uses the controlled value when defined, even if defaultValue is also set', () => {
    expect(
      resolveInitialValue({
        controlledValue: 'controlled',
        defaultValue: 'default',
        tabValues: ['a', 'b'],
      })
    ).toBe('controlled');
  });

  it('falls back to defaultValue when uncontrolled', () => {
    expect(
      resolveInitialValue({
        controlledValue: undefined,
        defaultValue: 'default',
        tabValues: ['a', 'b'],
      })
    ).toBe('default');
  });

  it('falls back to the first tab value when uncontrolled and no defaultValue is set', () => {
    expect(
      resolveInitialValue({
        controlledValue: undefined,
        defaultValue: undefined,
        tabValues: ['a', 'b'],
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
  it('falls back to the first tab value when there is no previous value', () => {
    expect(resolveValidValue({ prev: undefined, tabValues: ['a', 'b'] })).toBe('a');
  });

  it('falls back to the first tab value when the previous value no longer exists', () => {
    expect(resolveValidValue({ prev: 'removed', tabValues: ['a', 'b'] })).toBe('a');
  });

  it('keeps the previous value when it is still a valid tab', () => {
    expect(resolveValidValue({ prev: 'b', tabValues: ['a', 'b'] })).toBe('b');
  });
});

describe('computeScrollVisibility', () => {
  it('hides both buttons when content does not overflow the container', () => {
    expect(
      computeScrollVisibility({ containerWidth: 300, contentWidth: 300, scrollX: 0 })
    ).toEqual({ canScrollLeft: false, canScrollRight: false });
  });

  it('shows only the right button when scrolled to the start of overflowing content', () => {
    expect(
      computeScrollVisibility({ containerWidth: 300, contentWidth: 600, scrollX: 0 })
    ).toEqual({ canScrollLeft: false, canScrollRight: true });
  });

  it('shows only the left button when scrolled to the end of overflowing content', () => {
    expect(
      computeScrollVisibility({ containerWidth: 300, contentWidth: 600, scrollX: 300 })
    ).toEqual({ canScrollLeft: true, canScrollRight: false });
  });

  it('shows both buttons when scrolled to the middle of overflowing content', () => {
    expect(
      computeScrollVisibility({ containerWidth: 300, contentWidth: 900, scrollX: 300 })
    ).toEqual({ canScrollLeft: true, canScrollRight: true });
  });
});

describe('computeScrollTarget', () => {
  it('clamps to 0 when scrolling left past the start', () => {
    expect(
      computeScrollTarget({
        containerWidth: 300,
        contentWidth: 900,
        currentScrollX: 50,
        direction: -1,
      })
    ).toBe(0);
  });

  it('clamps to the max scrollable offset when scrolling right past the end', () => {
    expect(
      computeScrollTarget({
        containerWidth: 300,
        contentWidth: 900,
        currentScrollX: 590,
        direction: 1,
      })
    ).toBe(600);
  });

  it('advances by containerWidth * stepRatio when scrolling right within bounds', () => {
    expect(
      computeScrollTarget({
        containerWidth: 300,
        contentWidth: 900,
        currentScrollX: 0,
        direction: 1,
      })
    ).toBe(180);
  });

  it('respects a custom stepRatio', () => {
    expect(
      computeScrollTarget({
        containerWidth: 300,
        contentWidth: 900,
        currentScrollX: 0,
        direction: 1,
        stepRatio: 1,
      })
    ).toBe(300);
  });
});
