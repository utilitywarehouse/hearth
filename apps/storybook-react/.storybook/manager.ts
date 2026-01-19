import { addons } from 'storybook/manager-api';
import '@utilitywarehouse/hearth-fonts';
import theme from '../../../shared/storybook/theme';
import '../../../shared/storybook/styles/manager.css';

addons.setConfig({
  panelPosition: 'right',
  theme,
});
