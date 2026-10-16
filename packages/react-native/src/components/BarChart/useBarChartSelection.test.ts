/* eslint-disable react-hooks/rules-of-hooks -- the hook runs in a hand-rolled harness, not a component */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useBarChartSelection } from './useBarChartSelection';

// Minimal hook runner: the package has no react-test-renderer or DOM, so `useState` is backed by
// an index-keyed store and the hook re-runs after every update, as React does.
const store = vi.hoisted(() => ({ slots: [] as unknown[], cursor: 0, dirty: false }));

vi.mock('react', () => ({
  useState: <T>(initial: T) => {
    const index = store.cursor++;
    if (!(index in store.slots)) {
      store.slots[index] = initial;
    }
    const setState = (next: T) => {
      if (!Object.is(store.slots[index], next)) {
        store.slots[index] = next;
        store.dirty = true;
      }
    };
    return [store.slots[index] as T, setState] as const;
  },
}));

type Options = Parameters<typeof useBarChartSelection>[0];

const renderHook = (initialOptions: Options) => {
  const result = {} as { current: ReturnType<typeof useBarChartSelection> };

  const run = (options: Options) => {
    do {
      store.dirty = false;
      store.cursor = 0;
      result.current = useBarChartSelection(options);
    } while (store.dirty);
  };

  run(initialOptions);

  return {
    result,
    rerender: run,
    select: (index: number, options: Options) => {
      result.current.select(index);
      run(options);
    },
  };
};

const base: Options = { length: 4, dataKey: 'a' };

describe('useBarChartSelection', () => {
  beforeEach(() => {
    store.slots = [];
    store.cursor = 0;
    store.dirty = false;
  });

  describe('uncontrolled', () => {
    it('selects the last bar by default', () => {
      expect(renderHook(base).result.current.activeIndex).toBe(3);
    });

    it('starts on defaultSelectedIndex', () => {
      expect(renderHook({ ...base, defaultSelectedIndex: 1 }).result.current.activeIndex).toBe(1);
    });

    it('selects nothing when defaultSelectedIndex is null', () => {
      expect(renderHook({ ...base, defaultSelectedIndex: null }).result.current.activeIndex).toBe(
        null
      );
    });

    it('selects nothing when there is no data', () => {
      expect(renderHook({ ...base, length: 0 }).result.current.activeIndex).toBe(null);
    });

    it('updates the active index on select', () => {
      const { result, select } = renderHook(base);
      select(0, base);
      expect(result.current.activeIndex).toBe(0);
    });

    it('keeps the selection inside the data when it shrinks', () => {
      const { result, select, rerender } = renderHook(base);
      select(3, base);
      rerender({ ...base, length: 2 });
      expect(result.current.activeIndex).toBe(1);
    });
  });

  describe('controlled', () => {
    it('follows selectedIndex and ignores select', () => {
      const options = { ...base, selectedIndex: 2 };
      const { result, select } = renderHook(options);
      select(0, options);
      expect(result.current.activeIndex).toBe(2);
    });

    it('selects nothing when selectedIndex is null', () => {
      expect(renderHook({ ...base, selectedIndex: null }).result.current.activeIndex).toBe(null);
    });

    it('reflects a changed selectedIndex', () => {
      const { result, rerender } = renderHook({ ...base, selectedIndex: 0 });
      rerender({ ...base, selectedIndex: 1 });
      expect(result.current.activeIndex).toBe(1);
    });

    it('clamps an out-of-range selectedIndex to the last bar', () => {
      expect(renderHook({ ...base, selectedIndex: 99 }).result.current.activeIndex).toBe(3);
    });
  });

  describe('dataKey', () => {
    it('keeps the selection while the dataKey is unchanged', () => {
      const { result, select, rerender } = renderHook({ ...base, defaultSelectedIndex: 1 });
      select(2, { ...base, defaultSelectedIndex: 1 });
      rerender({ ...base, defaultSelectedIndex: 1 });
      expect(result.current.activeIndex).toBe(2);
    });

    it('returns to defaultSelectedIndex when the dataKey changes', () => {
      const options = { ...base, defaultSelectedIndex: 1 };
      const { result, select, rerender } = renderHook(options);
      select(3, options);
      rerender({ ...options, dataKey: 'b' });
      expect(result.current.activeIndex).toBe(1);
    });

    it('returns to the last bar when the dataKey changes without a default', () => {
      const { result, select, rerender } = renderHook(base);
      select(0, base);
      rerender({ ...base, dataKey: 'b', length: 6 });
      expect(result.current.activeIndex).toBe(5);
    });

    it('does not override a controlled selectedIndex', () => {
      const options = { ...base, selectedIndex: 2 };
      const { result, rerender } = renderHook(options);
      rerender({ ...options, dataKey: 'b' });
      expect(result.current.activeIndex).toBe(2);
    });
  });
});
