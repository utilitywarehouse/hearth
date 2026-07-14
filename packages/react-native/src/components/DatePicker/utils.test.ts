import dayjs from 'dayjs';
import localeData from 'dayjs/plugin/localeData';
import { describe, expect, it } from 'vitest';
import {
  areDatesOnSameDay,
  formatNumber,
  getDaysInMonth,
  getFirstDayOfMonth,
  getMonthsArray,
  getParsedDate,
  getWeekdays,
  getYearRange,
  isDateBetween,
  isDateDisabled,
  isMonthDisabled,
  isYearDisabled,
  YEAR_PAGE_SIZE,
} from './utils';

dayjs.extend(localeData);

describe('areDatesOnSameDay', () => {
  it('returns true for two times on the same day', () => {
    expect(areDatesOnSameDay('2025-03-15 09:00', '2025-03-15 23:59')).toBe(true);
  });

  it('returns false for different days', () => {
    expect(areDatesOnSameDay('2025-03-15', '2025-03-16')).toBe(false);
  });

  it('returns false when either date is missing', () => {
    expect(areDatesOnSameDay(undefined, '2025-03-15')).toBe(false);
    expect(areDatesOnSameDay('2025-03-15', undefined)).toBe(false);
  });
});

describe('isDateBetween', () => {
  const startDate = dayjs('2025-03-10');
  const endDate = dayjs('2025-03-20');

  it('returns true for a date inside the range', () => {
    expect(isDateBetween(dayjs('2025-03-15'), { startDate, endDate })).toBe(true);
  });

  it('includes the range boundaries', () => {
    expect(isDateBetween(dayjs('2025-03-10'), { startDate, endDate })).toBe(true);
    expect(isDateBetween(dayjs('2025-03-20'), { startDate, endDate })).toBe(true);
  });

  it('returns false for a date outside the range', () => {
    expect(isDateBetween(dayjs('2025-03-09'), { startDate, endDate })).toBe(false);
    expect(isDateBetween(dayjs('2025-03-21'), { startDate, endDate })).toBe(false);
  });

  it('returns false when either bound is missing', () => {
    expect(isDateBetween(dayjs('2025-03-15'), { startDate })).toBe(false);
    expect(isDateBetween(dayjs('2025-03-15'), { endDate })).toBe(false);
  });
});

describe('isDateDisabled', () => {
  it('disables dates before minDate', () => {
    expect(isDateDisabled(dayjs('2025-03-09'), { minDate: '2025-03-10' })).toBe(true);
    expect(isDateDisabled(dayjs('2025-03-10'), { minDate: '2025-03-10' })).toBe(false);
  });

  it('disables dates after maxDate', () => {
    expect(isDateDisabled(dayjs('2025-03-21'), { maxDate: '2025-03-20' })).toBe(true);
    expect(isDateDisabled(dayjs('2025-03-20'), { maxDate: '2025-03-20' })).toBe(false);
  });

  it('disables dates not in an enabledDates array', () => {
    const enabledDates = ['2025-03-15'];
    expect(isDateDisabled(dayjs('2025-03-15'), { enabledDates })).toBe(false);
    expect(isDateDisabled(dayjs('2025-03-16'), { enabledDates })).toBe(true);
  });

  it('supports an enabledDates predicate', () => {
    const enabledDates = (date: unknown) => dayjs(date as string).day() === 1;
    expect(isDateDisabled(dayjs('2025-03-17'), { enabledDates })).toBe(false); // Monday
    expect(isDateDisabled(dayjs('2025-03-18'), { enabledDates })).toBe(true);
  });

  it('disables dates in a disabledDates array', () => {
    const disabledDates = ['2025-03-15'];
    expect(isDateDisabled(dayjs('2025-03-15'), { disabledDates })).toBe(true);
    expect(isDateDisabled(dayjs('2025-03-16'), { disabledDates })).toBe(false);
  });

  it('supports a disabledDates predicate', () => {
    const disabledDates = (date: unknown) => dayjs(date as string).day() === 0;
    expect(isDateDisabled(dayjs('2025-03-16'), { disabledDates })).toBe(true); // Sunday
    expect(isDateDisabled(dayjs('2025-03-17'), { disabledDates })).toBe(false);
  });

  it('gives enabledDates precedence over disabledDates', () => {
    expect(
      isDateDisabled(dayjs('2025-03-15'), {
        enabledDates: ['2025-03-15'],
        disabledDates: ['2025-03-15'],
      })
    ).toBe(false);
  });

  it('returns false when no constraints are provided', () => {
    expect(isDateDisabled(dayjs('2025-03-15'), {})).toBe(false);
  });
});

describe('isYearDisabled', () => {
  it('disables years outside the min/max range', () => {
    expect(isYearDisabled(2019, { minDate: '2020-01-01' })).toBe(true);
    expect(isYearDisabled(2026, { maxDate: '2025-12-31' })).toBe(true);
  });

  it('allows years inside the range', () => {
    expect(isYearDisabled(2022, { minDate: '2020-01-01', maxDate: '2025-12-31' })).toBe(false);
  });
});

describe('isMonthDisabled', () => {
  it('disables months before minDate within the same year', () => {
    expect(isMonthDisabled(1, '2025-06-01', { minDate: '2025-03-10' })).toBe(true);
  });

  it('allows earlier months in a later year', () => {
    expect(isMonthDisabled(1, '2026-06-01', { minDate: '2025-03-10' })).toBe(false);
  });

  it('disables months after maxDate within the same year', () => {
    expect(isMonthDisabled(11, '2025-06-01', { maxDate: '2025-10-10' })).toBe(true);
  });

  it('allows months inside the range', () => {
    expect(isMonthDisabled(5, '2025-06-01', { minDate: '2025-03-10', maxDate: '2025-10-10' })).toBe(
      false
    );
  });
});

describe('getYearRange', () => {
  it('returns a full page of years containing the given year', () => {
    const range = getYearRange(2024);
    expect(range).toHaveLength(YEAR_PAGE_SIZE);
    expect(range[0]).toBe(2016);
    expect(range[range.length - 1]).toBe(2027);
    expect(range).toContain(2024);
  });

  it('starts a new page on a page boundary year', () => {
    const range = getYearRange(2028);
    expect(range[0]).toBe(2028);
    expect(range[range.length - 1]).toBe(2039);
  });
});

describe('getDaysInMonth', () => {
  it('calculates offsets for a month spilling into a sixth week', () => {
    // March 2025 starts on a Saturday: 6 leading cells + 31 days > 35 → 42-cell grid
    expect(getDaysInMonth('2025-03-15', true, 0)).toEqual({
      prevMonthDays: 28,
      prevMonthOffset: 6,
      daysInCurrentMonth: 31,
      daysInNextMonth: 5,
      fullDaysInMonth: 42,
    });
  });

  it('calculates offsets for a month fitting in five weeks', () => {
    // February 2021 starts on a Monday: 1 leading cell + 28 days ≤ 35 → 35-cell grid
    expect(getDaysInMonth('2021-02-10', true, 0)).toEqual({
      prevMonthDays: 31,
      prevMonthOffset: 1,
      daysInCurrentMonth: 28,
      daysInNextMonth: 6,
      fullDaysInMonth: 35,
    });
  });

  it('omits outside days when showOutsideDays is false', () => {
    const result = getDaysInMonth('2025-03-15', false, 0);
    expect(result.daysInNextMonth).toBe(0);
    expect(result.fullDaysInMonth).toBe(31);
  });

  it('shifts the offset for a Monday-first week', () => {
    // With Monday as first day, March 2025 (starting Saturday) has 5 leading cells
    expect(getDaysInMonth('2025-03-15', true, 1).prevMonthOffset).toBe(5);
  });
});

describe('getFirstDayOfMonth', () => {
  it('returns the weekday index of the first of the month', () => {
    expect(getFirstDayOfMonth('2025-03-15', 0)).toBe(6); // 1 March 2025 is a Saturday
    expect(getFirstDayOfMonth('2025-06-15', 0)).toBe(0); // 1 June 2025 is a Sunday
  });
});

describe('getParsedDate', () => {
  it('parses a date into its display parts', () => {
    expect(getParsedDate('2025-03-15 14:30')).toEqual({
      year: 2025,
      month: 2,
      hour: 14,
      hour12: 2,
      minute: 30,
      period: 'PM',
    });
  });
});

describe('getWeekdays', () => {
  it('returns seven weekdays starting from Sunday by default', () => {
    const weekdays = getWeekdays(0);
    expect(weekdays).toHaveLength(7);
    expect(weekdays[0].name.full).toBe('Sunday');
    expect(weekdays[0].name.min).toBe('S');
  });

  it('rotates the week to the given first day', () => {
    const weekdays = getWeekdays(1);
    expect(weekdays[0].name.full).toBe('Monday');
    expect(weekdays[6].name.full).toBe('Sunday');
  });
});

describe('getMonthsArray', () => {
  it('returns all twelve months with full and short names', () => {
    const months = getMonthsArray();
    expect(months).toHaveLength(12);
    expect(months[0]).toEqual({
      index: 0,
      name: { full: 'January', short: 'Jan' },
      isSelected: false,
    });
  });
});

describe('formatNumber', () => {
  it('formats numbers with latin numerals', () => {
    expect(formatNumber(7, 'latn')).toBe('7');
    expect(formatNumber(2025, 'latn')).toBe('2025');
  });
});
