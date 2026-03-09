import { addons, type State } from 'storybook/manager-api';
import '@utilitywarehouse/hearth-react/styles.css';
import '@utilitywarehouse/hearth-fonts';
import theme from '../../../shared/storybook/theme';
import '../../../shared/storybook/styles/manager.css';

addons.setConfig({
  panelPosition: 'right',
  navSize: 300,
  theme,
  layoutCustomisations: {
    showToolbar(state: State, defaultValue: boolean) {
      return state.viewMode === 'docs' ? false : defaultValue;
    },
  },
  sidebar: {
    showRoots: true,
    collapsedRoots: ['common-props', 'responsive-design'],
  },
});
