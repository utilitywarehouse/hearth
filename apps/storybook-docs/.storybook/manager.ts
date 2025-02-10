import { addons } from '@storybook/manager-api';
import '@utilitywarehouse/hearth-css-reset';
import '@utilitywarehouse/hearth-fonts';
import theme from './theme';

addons.setConfig({
  theme: theme,
});
