import { afterEach, vi } from 'vitest';
import { throwPendingNativeViolations } from './a11y/pending';

// react-native-unistyles/mocks relies on Jest globals.
if (!(globalThis as { jest?: unknown }).jest) {
  (globalThis as any).jest = vi;
}

await import('react-native-unistyles/mocks');
const { StyleSheet } = await import('react-native-unistyles');
const { breakpoints } = await import('../src/core/breakpoints');
const { themes } = await import('../src/core/themes');

vi.mock('../src/core', async () => {
  const unistyles = await import('react-native-unistyles');

  return {
    breakpoints,
    themes,
    StyleSheet: unistyles.StyleSheet,
    UnistylesRuntime: unistyles.UnistylesRuntime,
  };
});

StyleSheet.configure({
  breakpoints,
  themes,
  settings: {
    initialTheme: 'light',
    adaptiveThemes: false,
  },
});

// Runs after each story (including addon-a11y's axe check), so native violations are
// reported alongside axe ones. See .storybook/a11y/pending.ts.
afterEach(throwPendingNativeViolations);
