import '@utilitywarehouse/hearth-fonts';
import { addons } from 'storybook/manager-api';
import '../../../shared/storybook/styles/manager.css';
import { config } from '../../../shared/storybook/theme';
import { create } from 'storybook/theming';

const theme = create(config);

addons.setConfig({
  theme,
});
