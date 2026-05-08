import { create } from 'storybook/theming';
// @ts-expect-error - logo is not a module
import logo from './assets/logo.svg';

export default create({
  base: 'light',
  brandTitle: 'Hearth Design Systems',
  brandUrl: 'https://hearth.prod.uw.systems/',
  brandImage: logo,
  brandTarget: '_self',
});

export const config = {
  base: 'light',
  brandTitle: 'Hearth Design Systems',
  brandUrl: 'https://hearth.prod.uw.systems/',
  brandImage: logo,
  brandTarget: '_self',
};
