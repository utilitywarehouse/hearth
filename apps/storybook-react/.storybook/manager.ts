import { addons, type State } from 'storybook/manager-api';
import theme from '../../../shared/storybook/theme';
import '../../../shared/storybook/styles/manager.css';

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
