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
  ios: {
    supportsTablet: true,
    bundleIdentifier: 'com.utilitywarehouse.hearth',
    infoPlist: {
      LSApplicationQueriesSchemes: ['uw-hearth'],
      ITSAppUsesNonExemptEncryption: false,
    },
    icon: {
      dark: './assets/icons/ios-dark.png',
      light: './assets/icons/ios-light.png',
      tinted: './assets/icons/ios-tinted.png',
    },
  },
  android: {
    package: 'com.utilitywarehouse.hearth',
    adaptiveIcon: {
      foregroundImage: './assets/icons/adaptive-icon.png',
      monochromeImage: './assets/icons/adaptive-icon.png',
      backgroundColor: '#7a42c8',
    },
  },
  plugins: [
    [
      'expo-xml-font',
      [
        {
          name: 'Comic Hams',
          folder: './assets/fonts',
          variants: [
            { fontFile: 'comichams_boldflare', fontWeight: 700 },
            { fontFile: 'comichams_semiboldflare', fontWeight: 600 },
          ],
        },
        {
          name: 'DM Sans',
          folder: './assets/fonts',
          variants: [
            { fontFile: 'dmsans_bold', fontWeight: 700 },
            { fontFile: 'dmsans_bolditalic', fontWeight: 700, italic: true },
            { fontFile: 'dmsans_semibold', fontWeight: 600 },
            { fontFile: 'dmsans_semibolditalic', fontWeight: 600, italic: true },
            { fontFile: 'dmsans_regular', fontWeight: 400 },
            { fontFile: 'dmsans_italic', fontWeight: 400, italic: true },
          ],
        },
        {
          name: 'DM Mono',
          folder: './assets/fonts',
          variants: [
            { fontFile: 'dmmono_medium', fontWeight: 500 },
            { fontFile: 'dmmono_mediumitalic', fontWeight: 500, italic: true },
          ],
        },
      ],
    ],
    [
      'expo-splash-screen',
      {
        image: './assets/icons/splash-icon-light.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#7a42c8',
        dark: {
          image: './assets/icons/splash-icon-dark.png',
          backgroundColor: '#010101',
        },
      },
    ],
    'expo-font',
    'react-native-edge-to-edge',
  ],
});
