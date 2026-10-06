// .rnstorybook/main.ts
import type { StorybookConfig } from '@storybook/react-native';

// SPIKE (UWDS-5137): gate the story glob on a build-time flag.
const visualTestsOnly = process.env.EXPO_PUBLIC_VISUAL_TESTS === 'true';

const main: StorybookConfig = {
  stories: visualTestsOnly
    ? ['../../../packages/react-native/visual-tests/**/*.stories.?(ts|tsx|js|jsx)']
    : [
        '../components/**/*.stories.?(ts|tsx|js|jsx)',
        '../../../packages/react-native/**/*.stories.?(ts|tsx|js|jsx)',
      ],
  deviceAddons: ['@storybook/addon-ondevice-controls', '@storybook/addon-ondevice-actions'],
};

export default main;
