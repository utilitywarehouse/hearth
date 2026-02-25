import { addons } from 'storybook/manager-api';
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
import '../../../shared/storybook/styles/manager.css';
import theme from '../../../shared/storybook/theme';

addons.setConfig({
  theme,
  showToolbar: false,
  navSize: 300,
});

addons.register('darkmode-refresh', api => {
  let previousDarkMode: boolean | null = null;

  api.on('globalsUpdated', ({ globals }) => {
    const currentDarkMode = globals.darkMode;

    previousDarkMode = currentDarkMode;
  });
});
