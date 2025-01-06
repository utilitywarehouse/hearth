export default ({ config }) => ({
  ...config,
  name: 'Storybook Tutorial Template',
  slug: 'storybook-tutorial-template',
  newArchEnabled: true,
  entryPoint: './index.js',
  extra: {
    storybookEnabled: process.env.STORYBOOK_ENABLED,
  },
});
