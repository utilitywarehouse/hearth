import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderHook, resetHarness } from './hookHarness';
import { useBarChartScrollSync } from './useBarChartScrollSync';

const mocks = vi.hoisted(() => ({
  scrollTo: vi.fn(),
  scrollToEnd: vi.fn(),
  isWeb: false,
}));

vi.mock('react', async () => (await import('./hookHarness')).reactMock);
vi.mock('react-native-reanimated', async () => {
  const { reactMock } = await import('./hookHarness');
  return {
    Easing: { out: () => () => 0, ease: () => 0 },
    useAnimatedRef: () => {
      const ref = reactMock.useRef<unknown>(null);
      ref.current ??= { scrollTo: mocks.scrollTo, scrollToEnd: mocks.scrollToEnd };
      return ref;
    },
  };
});
vi.mock('../BarChart.constants', () => ({
  get IS_WEB() {
    return mocks.isWeb;
  },
}));

type Options = Parameters<typeof useBarChartScrollSync>[0];

const base: Options = { dataId: 'a', viewportWidth: 300, contentWidth: 600 };

describe('useBarChartScrollSync', () => {
  beforeEach(() => {
    resetHarness();
    mocks.scrollTo.mockClear();
    mocks.scrollToEnd.mockClear();
    mocks.isWeb = false;
    vi.stubGlobal('requestAnimationFrame', (cb: () => void) => cb());
  });

  it('scrolls to the newest bar when the content overflows', () => {
    renderHook(useBarChartScrollSync, base);
    expect(mocks.scrollToEnd).toHaveBeenCalledExactlyOnceWith({ animated: false });
  });

  it('scrolls back to the start when everything fits', () => {
    renderHook(useBarChartScrollSync, { ...base, contentWidth: 200 });
    expect(mocks.scrollTo).toHaveBeenCalledExactlyOnceWith({ x: 0, animated: false });
    expect(mocks.scrollToEnd).not.toHaveBeenCalled();
  });

  it('does not scroll before the viewport has a width', () => {
    renderHook(useBarChartScrollSync, { ...base, viewportWidth: 0 });
    expect(mocks.scrollToEnd).not.toHaveBeenCalled();
  });

  it('scrolls to the start when the content shrinks to fit', () => {
    const { rerender } = renderHook(useBarChartScrollSync, base);
    mocks.scrollTo.mockClear();
    rerender({ ...base, contentWidth: 100 });
    expect(mocks.scrollTo).toHaveBeenCalledExactlyOnceWith({ x: 0, animated: false });
  });

  it('scrolls to the end again when the dataset changes', () => {
    const { result, rerender } = renderHook(useBarChartScrollSync, base);
    result.current.handleContentSizeChange(600);
    mocks.scrollToEnd.mockClear();
    rerender({ ...base, dataId: 'b' });
    expect(mocks.scrollToEnd).toHaveBeenCalled();
  });

  it('exposes the scroll ref', () => {
    const { result } = renderHook(useBarChartScrollSync, base);
    expect(result.current.scrollRef.current).toBeTruthy();
  });

  describe('handleContentSizeChange', () => {
    it('scrolls to the end twice on native so the second call lands on the new end', () => {
      const { result } = renderHook(useBarChartScrollSync, { ...base, contentWidth: 200 });
      mocks.scrollToEnd.mockClear();
      result.current.handleContentSizeChange(600);
      expect(mocks.scrollToEnd).toHaveBeenCalledTimes(2);
    });

    it('scrolls to the end once on web', () => {
      mocks.isWeb = true;
      const { result } = renderHook(useBarChartScrollSync, { ...base, contentWidth: 200 });
      mocks.scrollToEnd.mockClear();
      result.current.handleContentSizeChange(600);
      expect(mocks.scrollToEnd).toHaveBeenCalledTimes(1);
    });

    it('does not scroll again for the same dataset once a native size has been applied', () => {
      const { result } = renderHook(useBarChartScrollSync, base);
      result.current.handleContentSizeChange(600);
      mocks.scrollToEnd.mockClear();
      result.current.handleContentSizeChange(600);
      expect(mocks.scrollToEnd).not.toHaveBeenCalled();
    });

    it('scrolls to the start when the native size fits the viewport', () => {
      const { result } = renderHook(useBarChartScrollSync, base);
      mocks.scrollTo.mockClear();
      result.current.handleContentSizeChange(250);
      expect(mocks.scrollTo).toHaveBeenCalledExactlyOnceWith({ x: 0, animated: false });
    });
  });
});
