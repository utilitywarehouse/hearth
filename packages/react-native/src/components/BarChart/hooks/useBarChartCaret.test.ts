// @vitest-environment happy-dom
import { cleanup, renderHook } from '@testing-library/react';
import { useRef } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useBarChartCaret } from './useBarChartCaret';

type Shared = { value: unknown };

const mocks = vi.hoisted(() => ({
  scrollOffset: { value: 0 },
  shared: [] as { value: unknown }[],
}));

vi.mock('react-native-reanimated', () => {
  return {
    Easing: { out: () => () => 0, ease: () => 0 },
    useScrollOffset: () => mocks.scrollOffset,
    useSharedValue: (initial: unknown) => {
      const shared = useRef({ value: initial }).current;
      if (!mocks.shared.includes(shared)) {
        mocks.shared.push(shared);
      }
      return shared;
    },
    useAnimatedStyle: (factory: () => unknown) => factory,
    withTiming: (value: number) => ({ timingTo: value }),
  };
});

const CARET_WIDTH = 16;
const CARET_HEIGHT = 8;

vi.mock('../BarChart.constants', () => ({
  ANIMATION_TIMING: { duration: 0 },
  CARET_WIDTH: 16,
  CARET_HEIGHT: 8,
}));

type Options = Parameters<typeof useBarChartCaret>[0];
type Style = {
  opacity: number;
  transform: [{ translateX: number }, { translateY: number }];
};

const base: Options = {
  scrollRef: { current: null } as unknown as Options['scrollRef'],
  activeIndex: 1,
  bandWidth: 40,
  viewportWidth: 200,
  yAxisWidth: 30,
  isReducedMotion: false,
};

// Shared values are created in the hook in order: selectedCenter, then caretReveal.
const sharedValues = () => ({
  center: mocks.shared[0] as Shared,
  reveal: mocks.shared[1] as Shared,
});
const render = (props: Options) => renderHook(useBarChartCaret, { initialProps: props });
const style = (result: { current: unknown }) => (result.current as () => Style)();

describe('useBarChartCaret', () => {
  afterEach(cleanup);

  beforeEach(() => {
    mocks.scrollOffset.value = 0;
    mocks.shared = [];
  });

  describe('positioning', () => {
    it('waits for layout before positioning', () => {
      const { result } = render({ ...base, viewportWidth: 0 });
      expect(sharedValues().reveal.value).toBe(0);
      expect(style(result).transform[1].translateY).toBe(-CARET_HEIGHT);
    });

    it('waits for the y axis to be measured', () => {
      render({ ...base, yAxisWidth: 0 });
      expect(sharedValues().center.value).toBe(0);
    });

    it('waits for a selection', () => {
      render({ ...base, activeIndex: null });
      expect(sharedValues().reveal.value).toBe(0);
    });

    it('reveals the caret over the first selected bar centre', () => {
      const { result } = render(base);
      // centre = 1 * 40 + 20
      expect(sharedValues().center.value).toBe(60);
      expect(sharedValues().reveal.value).toEqual({ timingTo: 1 });
      expect(style(result).transform[0].translateX).toBe(30 + 60 - CARET_WIDTH / 2);
    });

    it('reveals immediately under reduced motion', () => {
      render({ ...base, isReducedMotion: true });
      expect(sharedValues().reveal.value).toBe(1);
    });

    it('slides to a newly selected bar', () => {
      const { rerender } = render(base);
      rerender({ ...base, activeIndex: 3 });
      expect(sharedValues().center.value).toEqual({ timingTo: 140 });
    });

    it('snaps when the band width changes', () => {
      const { rerender } = render(base);
      rerender({ ...base, bandWidth: 50 });
      expect(sharedValues().center.value).toBe(75);
    });

    it('snaps under reduced motion', () => {
      const { rerender } = render({ ...base, isReducedMotion: true });
      rerender({ ...base, isReducedMotion: true, activeIndex: 3 });
      expect(sharedValues().center.value).toBe(140);
    });
  });

  describe('animated style', () => {
    it('is fully revealed after the reveal animation', () => {
      const { result, rerender } = render({ ...base, isReducedMotion: true });
      rerender({ ...base, isReducedMotion: true });
      expect(style(result).transform[1].translateY).toBeCloseTo(0);
    });

    it('is visible while the selected bar is inside the viewport', () => {
      const { result } = render(base);
      expect(style(result).opacity).toBe(1);
    });

    it('hides when the selected bar scrolls out of the viewport', () => {
      mocks.scrollOffset.value = 500;
      const { result } = render(base);
      expect(style(result).opacity).toBe(0);
    });

    it('stays visible while the bar is half outside the viewport edge', () => {
      // centre 60, offset 80 -> -20 which is exactly -bandWidth / 2
      mocks.scrollOffset.value = 80;
      const { result } = render(base);
      expect(style(result).opacity).toBe(1);
    });

    it('clamps the caret inside the chart on the left', () => {
      mocks.scrollOffset.value = 70;
      const { result } = render(base);
      // centre in viewport -10 -> 20, clamped up to yAxisWidth + CARET_WIDTH
      expect(style(result).transform[0].translateX).toBe(30 + CARET_WIDTH - CARET_WIDTH / 2);
    });

    it('clamps the caret inside the chart on the right', () => {
      const { result } = render({ ...base, activeIndex: 5 });
      // centre 220 + 30 = 250, clamped down to chartWidth - CARET_WIDTH = 214
      expect(style(result).transform[0].translateX).toBe(214 - CARET_WIDTH / 2);
    });
  });
});
