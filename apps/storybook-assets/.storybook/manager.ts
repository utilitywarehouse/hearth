import { addons } from 'storybook/manager-api';
import '../../../shared/storybook/styles/manager.css';
import { config } from '../../../shared/storybook/theme';
import { create } from 'storybook/theming';

const theme = create(config);

addons.setConfig({
  panelPosition: 'right',
  selectedPanel: 'storybook/controls/panel',
  theme,
  sidebar: {
    showRoots: true,
    collapsedRoots: ['json', 'svg'],
  },
});
