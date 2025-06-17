import { addons } from 'storybook/manager-api';
import '@utilitywarehouse/hearth-css-reset';
import '@utilitywarehouse/hearth-fonts';
import theme from '../../../shared/storybook/theme';
import '../../../shared/storybook/styles/manager.css';

addons.setConfig({
  panelPosition: 'right',
  selectedPanel: 'storybook/controls/panel',
  theme,
});
