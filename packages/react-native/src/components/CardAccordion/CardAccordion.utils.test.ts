import { describe, expect, it } from 'vitest';
import { getAdjacentStep, getStepState, resolveInitialStep } from './CardAccordion.utils';

const steps = ['a', 'b', 'c'];

describe('getStepState', () => {
  it('marks the current step as current', () => {
    expect(getStepState(steps, 'b', 'b')).toBe('current');
  });

  it('marks steps before the current step as previous', () => {
    expect(getStepState(steps, 'c', 'a')).toBe('previous');
    expect(getStepState(steps, 'c', 'b')).toBe('previous');
  });

  it('marks steps after the current step as future', () => {
    expect(getStepState(steps, 'a', 'b')).toBe('future');
    expect(getStepState(steps, 'a', 'c')).toBe('future');
  });

  it('treats every step as future when there is no current step', () => {
    expect(getStepState(steps, undefined, 'a')).toBe('future');
  });

  it('treats every step as future when the current step is unknown', () => {
    expect(getStepState(steps, 'z', 'a')).toBe('future');
  });

  it('treats an unknown value as future', () => {
    expect(getStepState(steps, 'b', 'z')).toBe('future');
  });
});

describe('getAdjacentStep', () => {
  it('returns the following step for next', () => {
    expect(getAdjacentStep(steps, 'a', 'next')).toBe('b');
  });

  it('returns the preceding step for previous', () => {
    expect(getAdjacentStep(steps, 'c', 'previous')).toBe('b');
  });

  it('returns undefined past the last step', () => {
    expect(getAdjacentStep(steps, 'c', 'next')).toBeUndefined();
  });

  it('returns undefined before the first step', () => {
    expect(getAdjacentStep(steps, 'a', 'previous')).toBeUndefined();
  });

  it('returns undefined for an unknown value', () => {
    expect(getAdjacentStep(steps, 'z', 'next')).toBeUndefined();
  });
});

describe('resolveInitialStep', () => {
  it('prefers the controlled value', () => {
    expect(resolveInitialStep({ steps, controlledValue: 'c', defaultValue: 'b' })).toBe('c');
  });

  it('falls back to the default value', () => {
    expect(resolveInitialStep({ steps, defaultValue: 'b' })).toBe('b');
  });

  it('falls back to the first step', () => {
    expect(resolveInitialStep({ steps })).toBe('a');
  });

  it('returns undefined when there are no steps', () => {
    expect(resolveInitialStep({ steps: [] })).toBeUndefined();
  });
});
