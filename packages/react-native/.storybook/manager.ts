import '@utilitywarehouse/hearth-fonts';
import { addons } from 'storybook/manager-api';
import '../../../shared/storybook/styles/manager.css';
import theme from '../../../shared/storybook/theme';

addons.setConfig({
  theme,
});
