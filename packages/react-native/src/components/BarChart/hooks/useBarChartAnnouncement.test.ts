// @vitest-environment happy-dom
import { cleanup, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useBarChartAnnouncement } from './useBarChartAnnouncement';

const mocks = vi.hoisted(() => ({ os: 'ios', announce: vi.fn() }));

vi.mock('react-native', () => ({
  Platform: {
    get OS() {
      return mocks.os;
    },
  },
  AccessibilityInfo: { announceForAccessibility: mocks.announce },
}));

type Props = Parameters<typeof useBarChartAnnouncement>;

const render = (...initialProps: Props) =>
  renderHook((props: Props) => useBarChartAnnouncement(...props), { initialProps });

describe('useBarChartAnnouncement', () => {
  afterEach(cleanup);

  beforeEach(() => {
    mocks.os = 'ios';
    mocks.announce.mockClear();
  });

  it('does not announce the initial selection', () => {
    render(1, 'Jan, 10');
    expect(mocks.announce).not.toHaveBeenCalled();
  });

  it('announces the description when the selection changes on iOS', () => {
    const { rerender } = render(1, 'Jan, 10');
    rerender([2, 'Feb, 20']);
    expect(mocks.announce).toHaveBeenCalledExactlyOnceWith('Feb, 20');
  });

  it('announces when the selection is cleared and has a description', () => {
    const { rerender } = render(1, 'Jan, 10');
    rerender([null, 'No selection']);
    expect(mocks.announce).toHaveBeenCalledExactlyOnceWith('No selection');
  });

  it('does not announce when only the description changes', () => {
    const { rerender } = render(1, 'Jan, 10');
    rerender([1, 'Jan, 11']);
    expect(mocks.announce).not.toHaveBeenCalled();
  });

  it('does not announce an empty description', () => {
    const { rerender } = render(1, 'Jan, 10');
    rerender([2, undefined]);
    expect(mocks.announce).not.toHaveBeenCalled();
  });

  it('does not announce on Android', () => {
    mocks.os = 'android';
    const { rerender } = render(1, 'Jan, 10');
    rerender([2, 'Feb, 20']);
    expect(mocks.announce).not.toHaveBeenCalled();
  });

  it('announces once per change, not on re-renders with the same selection', () => {
    const { rerender } = render(1, 'Jan, 10');
    rerender([2, 'Feb, 20']);
    rerender([2, 'Feb, 20']);
    expect(mocks.announce).toHaveBeenCalledTimes(1);
  });
});
