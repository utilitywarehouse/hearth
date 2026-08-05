import { describe, expect, it } from 'vitest';
import { resolveActiveValues, resolveInitialValues, resolveToggledValues } from './Accordion.utils';

describe('resolveToggledValues', () => {
  it('single + collapsible: opening a closed item replaces the selection', () => {
    expect(
      resolveToggledValues({ type: 'single', collapsible: true, selectedValues: ['a'], itemValue: 'b' })
    ).toEqual(['b']);
  });

  it('single + collapsible: toggling the only open item closes it', () => {
    expect(
      resolveToggledValues({ type: 'single', collapsible: true, selectedValues: ['a'], itemValue: 'a' })
    ).toEqual([]);
  });

  it('single + not collapsible: opening a closed item replaces the selection', () => {
    expect(
      resolveToggledValues({ type: 'single', collapsible: false, selectedValues: ['a'], itemValue: 'b' })
    ).toEqual(['b']);
  });

  it('single + not collapsible: toggling the only open item is a no-op', () => {
    expect(
      resolveToggledValues({ type: 'single', collapsible: false, selectedValues: ['a'], itemValue: 'a' })
    ).toEqual(['a']);
  });

  it('multiple + collapsible: opening a closed item adds to the selection', () => {
    expect(
      resolveToggledValues({ type: 'multiple', collapsible: true, selectedValues: ['a'], itemValue: 'b' })
    ).toEqual(['a', 'b']);
  });

  it('multiple + collapsible: closing an open item removes it from the selection', () => {
    expect(
      resolveToggledValues({
        type: 'multiple',
        collapsible: true,
        selectedValues: ['a', 'b'],
        itemValue: 'a',
      })
    ).toEqual(['b']);
  });

  it('multiple + not collapsible: opening a closed item adds to the selection', () => {
    expect(
      resolveToggledValues({ type: 'multiple', collapsible: false, selectedValues: ['a'], itemValue: 'b' })
    ).toEqual(['a', 'b']);
  });

  it('multiple + not collapsible: closing the last open item is a no-op', () => {
    expect(
      resolveToggledValues({ type: 'multiple', collapsible: false, selectedValues: ['a'], itemValue: 'a' })
    ).toEqual(['a']);
  });

  it('multiple + not collapsible: closing any open item is a no-op, even when others remain open', () => {
    expect(
      resolveToggledValues({
        type: 'multiple',
        collapsible: false,
        selectedValues: ['a', 'b'],
        itemValue: 'a',
      })
    ).toEqual(['a', 'b']);
  });
});

describe('resolveInitialValues', () => {
  it('prefers the controlled value when present', () => {
    expect(resolveInitialValues({ controlledValue: ['a'], defaultValue: ['b'] })).toEqual(['a']);
  });

  it('falls back to defaultValue when uncontrolled', () => {
    expect(resolveInitialValues({ defaultValue: ['b'] })).toEqual(['b']);
  });

  it('falls back to an empty array when neither is set', () => {
    expect(resolveInitialValues({})).toEqual([]);
  });
});

describe('resolveActiveValues', () => {
  it('prefers the controlled value when defined', () => {
    expect(resolveActiveValues({ controlledValue: ['a'], uncontrolledValue: ['b'] })).toEqual(['a']);
  });

  it('allows the controlled value to be an empty array', () => {
    expect(resolveActiveValues({ controlledValue: [], uncontrolledValue: ['b'] })).toEqual([]);
  });

  it('falls back to the uncontrolled value when controlledValue is undefined', () => {
    expect(resolveActiveValues({ uncontrolledValue: ['b'] })).toEqual(['b']);
  });
});
