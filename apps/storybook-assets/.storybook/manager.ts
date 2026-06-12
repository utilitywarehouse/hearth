import { addons } from 'storybook/manager-api';
import '@utilitywarehouse/hearth-storybook-utils/styles/manager.css';
import { config } from '@utilitywarehouse/hearth-storybook-utils';
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
