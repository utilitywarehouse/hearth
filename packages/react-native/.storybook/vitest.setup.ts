import { vi } from 'vitest';

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
