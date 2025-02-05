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
      ITSAppUsesNonExemptEncryption: false,
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
          folder: './assets/fonts',
          variants: [
            { fontFile: 'comichams_heavyflare', fontWeight: 900 },
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
  ],
});
