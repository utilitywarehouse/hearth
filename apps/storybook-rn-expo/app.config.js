export default ({ config }) => ({
  ...config,
  name: 'UW - Hearth',
  slug: 'hearth',
  owner: 'utilitywarehouse',
  newArchEnabled: true,
  extra: {
    storybookEnabled: true,
    eas: {
      projectId: '524f9fb5-ddb4-4db6-92ce-9e605c9dc20b',
    },
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
      backgroundColor: '#FFFFFF',
    },
  },
});
