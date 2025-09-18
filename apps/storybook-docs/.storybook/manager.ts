import '@utilitywarehouse/hearth-css-reset';
import '@utilitywarehouse/hearth-fonts';
import { addons } from 'storybook/manager-api';
import '../../../shared/storybook/styles/manager.css';
import theme from '../../../shared/storybook/theme';

addons.setConfig({
  theme,
});

addons.register('darkmode-refresh', api => {
  let previousDarkMode: boolean | null = null;

  api.on('globalsUpdated', ({ globals }) => {
    const currentDarkMode = globals.darkMode;

    previousDarkMode = currentDarkMode;
  });
});
