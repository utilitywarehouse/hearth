import { create } from '@storybook/theming/create';
// @ts-ignore
import logo from './assets/images/logo.png';

export default create({
  base: 'light',
  // Typography
  fontBase: '"DM Sans", sans-serif',
  fontCode: '"DM Mono", monospace',

  brandTitle: 'My custom Storybook',
  brandUrl: 'https://example.com',
  brandImage: logo,
  brandTarget: '_self',

  //
  colorPrimary: '#FAAF00',
  colorSecondary: '#7A42C8',
  textMutedColor: '#9E9E9E',

  // UI
  appBg: '#7A42C8',
  appContentBg: '#FFFBE8',
  appPreviewBg: '#fff',
  appBorderColor: '#101010',
  appBorderRadius: 0,

  buttonBg: '#FAAF00',
  buttonBorder: '#101010',

  // Text colors
  textColor: '#101010',
  textInverseColor: '#ffffff',

  // Toolbar default and active colors
  barTextColor: '#9E9E9E',
  barSelectedColor: '#585C6D',
  barHoverColor: '#585C6D',
  barBg: '#FFFBE8',

  // Form colors
  inputBg: '#FFFBE8',
  inputBorder: '#10162F',
  inputTextColor: '#10162F',
  inputBorderRadius: 2,
});
