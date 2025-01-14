/** @type{import("@storybook/react-native").StorybookConfig} */
module.exports = {
  // stories: ["../../../packages/react-native/**/*.stories.?(ts|tsx|js|jsx)"],
  stories: [
    '../components/**/*.stories.?(ts|tsx|js|jsx)',
    '../../../packages/react-native/**/*.stories.?(ts|tsx|js|jsx)',
  ],
  addons: ['@storybook/addon-ondevice-controls', '@storybook/addon-ondevice-actions'],
};
