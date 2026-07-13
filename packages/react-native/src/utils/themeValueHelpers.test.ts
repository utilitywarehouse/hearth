import { describe, expect, it } from 'vitest';
import {
  camelCaseToPath,
  getNestedValue,
  resolveThemeKey,
  resolveThemeValue,
  resolveThemeValueWithFallback,
} from './themeValueHelpers';

describe('camelCaseToPath', () => {
  it('splits a camelCase string into lowercase path segments', () => {
    expect(camelCaseToPath('feedbackDangerSurfaceDefault')).toEqual([
      'feedback',
      'danger',
      'surface',
      'default',
    ]);
  });

  it('returns a single segment for a plain lowercase string', () => {
    expect(camelCaseToPath('feedback')).toEqual(['feedback']);
  });
});

describe('getNestedValue', () => {
  const obj = { feedback: { danger: { surface: { default: '#f00' } } } };

  it('resolves a nested path', () => {
    expect(getNestedValue(obj, ['feedback', 'danger', 'surface', 'default'])).toBe('#f00');
  });

  it('returns undefined for a missing path', () => {
    expect(getNestedValue(obj, ['feedback', 'missing'])).toBeUndefined();
  });

  it('returns undefined when traversing through a non-object', () => {
    expect(getNestedValue(obj, ['feedback', 'danger', 'surface', 'default', 'extra'])).toBeUndefined();
  });
});

describe('resolveThemeValue', () => {
  const mapping = {
    primary: '#111',
    feedback: { danger: { surface: { default: '#f00' } } },
    broadbandBlue: { 100: '#00f' },
  };

  it('resolves a direct key', () => {
    expect(resolveThemeValue('primary', mapping)).toBe('#111');
  });

  it('resolves a camelCase key to a nested path', () => {
    expect(resolveThemeValue('feedbackDangerSurfaceDefault', mapping)).toBe('#f00');
  });

  it('resolves a numeric suffix to a shade', () => {
    expect(resolveThemeValue('broadbandBlue100', mapping)).toBe('#00f');
  });

  it('returns the original value when nothing matches', () => {
    expect(resolveThemeValue('unknownValue', mapping)).toBe('unknownValue');
    expect(resolveThemeValue('broadbandBlue900', mapping)).toBe('broadbandBlue900');
  });

  it('passes through non-string values', () => {
    expect(resolveThemeValue(42, mapping)).toBe(42);
    expect(resolveThemeValue(undefined, mapping)).toBeUndefined();
  });

  it('passes through when the mapping is missing', () => {
    expect(resolveThemeValue('primary', undefined)).toBe('primary');
  });
});

describe('resolveThemeKey', () => {
  const theme = { space: { 1: 4 }, semanticColor: { text: '#000' } };

  it('resolves a simple key', () => {
    expect(resolveThemeKey(theme, 'space')).toEqual({ 1: 4 });
  });

  it('resolves a dot-notation key', () => {
    expect(resolveThemeKey(theme, 'semanticColor.text')).toBe('#000');
  });

  it('returns undefined for a missing dot-notation path', () => {
    expect(resolveThemeKey(theme, 'semanticColor.missing.deeper')).toBeUndefined();
  });
});

describe('resolveThemeValueWithFallback', () => {
  const primary = { background: '#fff' };
  const fallback = { legacyBlue: '#00f' };

  it('resolves from the primary mapping first', () => {
    expect(resolveThemeValueWithFallback('background', primary, fallback)).toBe('#fff');
  });

  it('falls back to the secondary mapping when the primary misses', () => {
    expect(resolveThemeValueWithFallback('legacyBlue', primary, fallback)).toBe('#00f');
  });

  it('returns the original value when neither mapping resolves', () => {
    expect(resolveThemeValueWithFallback('unknown', primary, fallback)).toBe('unknown');
  });

  it('returns the original value when no fallback is provided and the primary misses', () => {
    expect(resolveThemeValueWithFallback('legacyBlue', primary)).toBe('legacyBlue');
  });
});
