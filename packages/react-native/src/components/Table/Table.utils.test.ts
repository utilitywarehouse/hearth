import { describe, expect, it } from 'vitest';
import { getColumnMinWidth, getColumnStyle, getMinTableWidth } from './Table.utils';

describe('getColumnMinWidth', () => {
  it('returns the configured fixed width when it is larger than the minimum', () => {
    expect(getColumnMinWidth(180, 120)).toBe(180);
  });

  it('clamps fixed widths to the minimum column width', () => {
    expect(getColumnMinWidth(80, 120)).toBe(120);
  });

  it('returns the minimum width for flexible and unspecified columns', () => {
    expect(getColumnMinWidth('2fr', 120)).toBe(120);
    expect(getColumnMinWidth({ flex: 3 }, 120)).toBe(120);
    expect(getColumnMinWidth(undefined, 120)).toBe(120);
  });
});

describe('getMinTableWidth', () => {
  it('adds fixed widths and minimum widths for flexible columns', () => {
    expect(getMinTableWidth(4, [180, '2fr', { flex: 3 }], 120)).toBe(540);
  });

  it('uses the minimum width for unspecified trailing columns', () => {
    expect(getMinTableWidth(3, [200], 120)).toBe(440);
  });
});

describe('getColumnStyle', () => {
  it('returns a fixed-width style for numeric column widths', () => {
    expect(getColumnStyle(180, 120)).toEqual({
      width: 180,
      minWidth: 180,
      flexGrow: 0,
      flexShrink: 0,
    });
  });

  it('maps fr values to flexGrow', () => {
    expect(getColumnStyle('2fr', 120)).toEqual({
      minWidth: 120,
      flexBasis: 0,
      flexGrow: 2,
      flexShrink: 0,
    });
  });

  it('supports fractional fr values', () => {
    expect(getColumnStyle('0.5fr', 120)).toEqual({
      minWidth: 120,
      flexBasis: 0,
      flexGrow: 0.5,
      flexShrink: 0,
    });
  });

  it('uses flex weights from object column widths', () => {
    expect(getColumnStyle({ flex: 3 }, 120)).toEqual({
      minWidth: 120,
      flexBasis: 0,
      flexGrow: 3,
      flexShrink: 0,
    });
  });

  it('falls back to a single flexible column for invalid flexible values', () => {
    expect(getColumnStyle('invalid' as `${number}fr`, 120)).toEqual({
      minWidth: 120,
      flexBasis: 0,
      flexGrow: 1,
      flexShrink: 0,
    });

    expect(getColumnStyle({ flex: 0 }, 120)).toEqual({
      minWidth: 120,
      flexBasis: 0,
      flexGrow: 1,
      flexShrink: 0,
    });
  });
});
