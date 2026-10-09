// .rnstorybook/main.ts
import type { StorybookConfig } from '@storybook/react-native';

// Set at bundle time (Metro inlines EXPO_PUBLIC_*). When true, only the
// visual regression stories load; otherwise they are excluded.
const visualTestsOnly = process.env.EXPO_PUBLIC_VISUAL_TESTS === 'true';

const main: StorybookConfig = {
  stories: visualTestsOnly
    ? ['../../../packages/react-native/visual-tests/**/*.visual.stories.?(ts|tsx|js|jsx)']
    : [
        '../components/**/*.stories.?(ts|tsx|js|jsx)',
        '../../../packages/react-native/src/**/*.stories.?(ts|tsx|js|jsx)',
      ],
  deviceAddons: ['@storybook/addon-ondevice-controls', '@storybook/addon-ondevice-actions'],
};

export default main;
