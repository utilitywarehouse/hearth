// @ts-expect-error - logo is not a module
import logo from './assets/logo.svg';

export const config = {
  base: 'light',
  brandTitle: 'Hearth Design Systems',
  brandUrl: 'https://hearth.prod.uw.systems/',
  brandImage: logo,
  brandTarget: '_self',
};
