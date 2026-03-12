import { setProjectAnnotations } from '@storybook/react-native-web-vite';
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

const a11yAddonAnnotations = await import('@storybook/addon-a11y/preview');
const projectAnnotations = await import('./preview');

// This is an important step to apply the right configuration when testing your stories.
// More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
setProjectAnnotations([a11yAddonAnnotations as any, projectAnnotations as any]);
