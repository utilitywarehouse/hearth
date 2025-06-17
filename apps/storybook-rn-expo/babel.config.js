/** @type {import('react-native-unistyles/plugin').UnistylesPluginOptions} */
const unistylesPluginOptions = {
  autoProcessImports: ['@utilitywarehouse/hearth-react-native'],
  autoProcessPaths: ['@utilitywarehouse/hearth-react-native'],
  root: './',
  debug: false,
};

module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['react-native-unistyles/plugin', unistylesPluginOptions],
      'react-native-reanimated/plugin',
    ],
  };
};
