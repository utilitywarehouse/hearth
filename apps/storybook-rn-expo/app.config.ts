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
  plugins: [
    [
      'expo-xml-font',
      [
        {
          name: 'Comic Hams',
          folder: '../../packages/fonts/files/ttf',
          variants: [
            { fontFile: 'ComicHams-HeavyFlare', fontWeight: 900 },
            { fontFile: 'ComicHams-BoldFlare', fontWeight: 700 },
            { fontFile: 'ComicHams-SemiBoldFlare', fontWeight: 600 },
          ],
        },
        {
          name: 'DM Sans',
          folder: '../../packages/fonts/files/ttf',
          variants: [
            { fontFile: 'DMSans-Bold', fontWeight: 700 },
            { fontFile: 'DMSans-Medium', fontWeight: 500 },
            { fontFile: 'DMSans-Regular', fontWeight: 400 },
            { fontFile: 'DMSans-BoldItalic', fontWeight: 700, italic: true },
            { fontFile: 'DMSans-MediumItalic', fontWeight: 500, italic: true },
            { fontFile: 'DMSans-Italic', fontWeight: 400, italic: true },
          ],
        },
        {
          name: 'DM Mono',
          folder: '../../packages/fonts/files/ttf',
          variants: [
            { fontFile: 'DMMono-Medium', fontWeight: 500 },
            { fontFile: 'DMMono-MediumItalic', fontWeight: 500, italic: true },
          ],
        },
      ],
    ],
  ],
});
