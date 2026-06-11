import { addons, type State } from 'storybook/manager-api';
import '@utilitywarehouse/hearth-tokens/css/space.css';
import '@utilitywarehouse/hearth-storybook-utils/styles/manager.css';
import { config } from '@utilitywarehouse/hearth-storybook-utils';
import { create } from 'storybook/theming';

const theme = create(config);

addons.setConfig({
  theme,
  layoutCustomisations: {
    showToolbar(state: State, defaultValue: boolean) {
      return state.viewMode === 'docs' ? false : defaultValue;
    },
  },
  sidebar: {
    showRoots: true,
  },
});
