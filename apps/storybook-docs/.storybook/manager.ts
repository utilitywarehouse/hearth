import '@utilitywarehouse/hearth-css-reset';
import '@utilitywarehouse/hearth-fonts';
import { addons } from 'storybook/manager-api';
import '../../../shared/storybook/styles/manager.css';
import theme from '../../../shared/storybook/theme';

addons.setConfig({
  theme,
});

addons.register('darkmode-refresh', api => {
  let previousDarkMode = null;

  api.on('globalsUpdated', ({ globals }) => {
    const currentDarkMode = globals.darkMode;

    if (previousDarkMode !== null && previousDarkMode !== currentDarkMode) {
      // Refresh the entire page when dark mode changes
      window.location.reload();
    }

    previousDarkMode = currentDarkMode;
  });
});
