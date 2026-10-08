import type { ComponentType, ReactElement } from 'react';
import { useEffect, useLayoutEffect } from 'react';
import { Keyboard } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUnistyles } from 'react-native-unistyles';
import { useColorMode } from '../../src/hooks';

export type VisualTestColorMode = 'light' | 'dark';

type VisualTestContext = {
  parameters: {
    /** Colour mode a visual test story renders in. Defaults to `'light'`. */
    colorMode?: VisualTestColorMode;
  };
};

/**
 * Decorator for visual regression stories. Replaces the interactive decorator
 * in `.rnstorybook/preview.tsx` when `isVisualTest()` is true.
 *
 * Differences from the interactive decorator:
 * - no dark-mode toggle bar and no `ScrollView`, so the capture is deterministic
 * - the story sits inside a `SafeAreaView` with a fixed background
 * - the colour mode comes from `parameters.colorMode`, never from the device
 * - the keyboard is dismissed on mount
 *
 * Content must fit the safe content box (about 360 x 650pt). See the README.
 */
export const VisualTestDecorator = (
  Story: ComponentType,
  { parameters }: VisualTestContext
): ReactElement | null => {
  const mode: VisualTestColorMode = parameters.colorMode ?? 'light';
  const [colorMode, setColorMode] = useColorMode();
  const { theme } = useUnistyles();

  useLayoutEffect(() => {
    setColorMode(mode);
  }, [mode, setColorMode]);

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  // Hold the story back until the theme has switched so a dark story is never
  // captured mid-flip from the previous story's mode.
  if (colorMode !== mode) return null;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        padding: theme.space[100],
        backgroundColor: theme.color.background.primary,
      }}
    >
      <Story />
    </SafeAreaView>
  );
};
