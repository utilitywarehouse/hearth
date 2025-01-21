export default ({ config }) => ({
  ...config,
  name: 'UW - Hearth',
  slug: 'hearth',
  owner: 'utilitywarehouse',
  newArchEnabled: true,
  icon: './assets/icon.png',
  extra: {
    storybookEnabled: true,
    eas: {
      projectId: '524f9fb5-ddb4-4db6-92ce-9e605c9dc20b',
    },
  },
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#7A42C8',
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.utilitywarehouse.hearth',
    infoPlist: {
      LSApplicationQueriesSchemes: ['uw-hearth'],
    },
  },
  android: {
    package: 'com.utilitywarehouse.hearth',
    adaptiveIcon: {
      foregroundImage: './assets/adaptive-icon.png',
      backgroundColor: '#FFFBE8',
    },
  },
});
