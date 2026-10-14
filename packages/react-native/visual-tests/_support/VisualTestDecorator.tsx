import type { ComponentType, ReactElement } from 'react';
import { useEffect, useLayoutEffect, useState } from 'react';
import { Keyboard } from 'react-native';
import { ReducedMotionConfig, ReduceMotion } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import { UnistylesRuntime } from 'react-native-unistyles';
import { ReducedMotionOverride } from '../../src/hooks/useReducedMotionEnabled';

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
 * - reduced motion is always on, so animated components render their final
 *   state whatever the device's Reduce Motion setting
 *
 * Content must fit the safe content box (about 360 x 650pt). See the README.
 */
export const VisualTestDecorator = (
  Story: ComponentType,
  { parameters }: VisualTestContext
): ReactElement | null => {
  const mode: VisualTestColorMode = parameters.colorMode ?? 'light';
  const [appliedMode, setAppliedMode] = useState<VisualTestColorMode>();

  useLayoutEffect(() => {
    if (UnistylesRuntime.themeName !== mode) UnistylesRuntime.setTheme(mode);
    setAppliedMode(mode);
  }, [mode]);

  useEffect(() => {
    Keyboard.dismiss();
  }, []);

  // Hold the story back until the theme has switched so a dark story is never
  // captured mid-flip from the previous story's mode.
  if (appliedMode !== mode) return null;

  // Read the theme for `mode` directly: `useUnistyles()` only catches up on a
  // later render, so the background would lag one story behind.
  const theme = UnistylesRuntime.getTheme(mode);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        width: '100%',
        padding: theme.space[100],
        backgroundColor: theme.color.background.primary,
      }}
    >
      {/* `ReducedMotionConfig` covers Reanimated's own animations. Hearth's
          reduced-motion branches read `ReducedMotionOverride` instead. */}
      <ReducedMotionConfig mode={ReduceMotion.Always} />
      <ReducedMotionOverride value>
        <Story />
      </ReducedMotionOverride>
    </SafeAreaView>
  );
};
