import { addons } from '@storybook/manager-api';
import theme from './theme';
import '@utilitywarehouse/hearth-fonts';

addons.setConfig({
  theme: theme,
});
