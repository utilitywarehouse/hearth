// Minimal hook runner for the BarChart hook tests: the package has no react-test-renderer or DOM,
// so `react` is mocked with index-keyed slots and the hook re-runs on every `rerender`, as React
// does. Effects run after each render when their dependencies changed.
type Slot = { value?: unknown; deps?: unknown[]; cleanup?: unknown };

const state = { slots: [] as Slot[], cursor: 0, pending: [] as (() => void)[] };

const depsChanged = (previous: unknown[] | undefined, next: unknown[] | undefined) =>
  !previous ||
  !next ||
  previous.length !== next.length ||
  next.some((d, i) => !Object.is(d, previous[i]));

const nextSlot = () => {
  const index = state.cursor++;
  state.slots[index] ??= {};
  return state.slots[index];
};

export const reactMock = {
  useRef: <T>(initial: T) => {
    const slot = nextSlot();
    slot.value ??= { current: initial };
    return slot.value as { current: T };
  },
  useCallback: <T>(fn: T, deps: unknown[]) => {
    const slot = nextSlot();
    if (depsChanged(slot.deps, deps)) {
      slot.deps = deps;
      slot.value = fn;
    }
    return slot.value as T;
  },
  useEffect: (effect: () => void | (() => void), deps?: unknown[]) => {
    const slot = nextSlot();
    if (depsChanged(slot.deps, deps)) {
      slot.deps = deps;
      state.pending.push(() => {
        if (typeof slot.cleanup === 'function') {
          slot.cleanup();
        }
        slot.cleanup = effect();
      });
    }
  },
};

export const resetHarness = () => {
  state.slots = [];
  state.cursor = 0;
  state.pending = [];
};

export const renderHook = <Args extends unknown[], Result>(
  hook: (...args: Args) => Result,
  ...initialArgs: NoInfer<Args>
) => {
  const result = {} as { current: Result };
  const run = (...args: NoInfer<Args>) => {
    state.cursor = 0;
    state.pending = [];
    result.current = hook(...args);
    state.pending.forEach(effect => effect());
  };
  run(...initialArgs);
  return { result, rerender: run };
};

/** Stable stand-in for a reanimated shared value. */
export const createSharedValue = <T>(initial: T) => reactMock.useRef({ value: initial }).current;
