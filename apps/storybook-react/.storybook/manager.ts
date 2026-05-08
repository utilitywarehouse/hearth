import { addons, type State } from 'storybook/manager-api';
import '../../../shared/storybook/styles/manager.css';
import { config } from '../../../shared/storybook/theme';
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
