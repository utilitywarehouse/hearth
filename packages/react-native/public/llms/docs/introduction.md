# Hearth React Native

React Native component library for building UIs at Utility Warehouse.<br/>
Current version: v0.35.4

Hearth React Native is a comprehensive design system library for React Native, providing reusable components, consistent styling, and tools to streamline UI development. It is built to enhance productivity and maintain design consistency across projects.

- [Installation](#installation)
- [Additional packages](#additional-packages)
- [Fonts](#fonts)
  - [iOS Setup](#ios-setup)
  - [Linking the fonts to be used in your project](#linking-the-fonts-to-be-used-in-your-project)
  - [Android Setup](#android-setup)
  - [Using Expo](#using-expo)
- [Babel configuration](#babel-configuration)
- [Jest configuration](#jest-configuration)

## Installation

Assuming you already have React Native installed and your project set up, to get started install the library and it's peer dependencies.

```console
npm install @utilitywarehouse/hearth-react-native
```

To install the peer dependencies, you can run the following command:

```console
npm install react-native-unistyles react-native-edge-to-edge react-native-nitro-modules @gorhom/bottom-sheet react-native-svg react-native-reanimated react-native-worklets react-native-gesture-handler @utilitywarehouse/hearth-react-native-icons
```

For more information on how to install and configure `react-native-svg`, `react-native-gesture-handler` and `react-native-reanimated`,
please refer to the [react-native-svg](https://github.com/software-mansion/react-native-svg?tab=readme-ov-file#installation),
[react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/) and
[react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started) documentation.

Why so many dependencies? The `@utilitywarehouse/hearth-react-native` library is built on top of the following libraries:

- [React Native Unistyles](https://www.unistyl.es/)
- [React Native SVG](https://github.com/software-mansion/react-native-svg)
- [React Native Reanimated](https://docs.swmansion.com/react-native-reanimated/)
- [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/docs/)

So why do we need to install `react-native-nitro-module`? It's because of React Native autolinking and transitive dependencies,
read more about it [here](https://shift.infinite.red/transitive-dependencies-and-react-native-autolinking-d4d4b7a651cf).

## Additional packages

The `@utilitywarehouse/hearth-react-native` library uses a few packages under the hood for tokens; including colours, space and more,
as well as fonts and icons. Feel free to additionally install these packages if you need to use them in your project.

```console
npm install @utilitywarehouse/hearth-tokens
```

## Fonts

You will need to include the **Comic Hams**, **DM Mono** and **DM Sans** fonts.
The easiest way to do this is to use the `@utilitywarehouse/hearth-fonts` package.

```console
npm install @utilitywarehouse/hearth-fonts
```

### iOS Setup

For iOS, copy the font files to your project's assets folder:

```console
mkdir -p src/assets/fonts && cp ./node_modules/@utilitywarehouse/hearth-fonts/files/ttf/* src/assets/fonts/
```

Next, create or update your `react-native.config.js` file in the root directory and paste the code below inside it:

```js
// Example usage
module.exports = {
  project: {
    ios: {},
    android: {},
  },
  assets: ['./src/assets/fonts/'],
};
```

### Linking the fonts to be used in your project

Now we need to link them so we'll be able to use them in any files inside the project. To do that, run the following command:

```console
npx react-native-asset
```

### Android Setup

For Android, you need to copy the fonts to two locations:

1. Copy TTF files to the assets folder:

```console
mkdir -p android/app/src/main/assets/fonts && cp ./node_modules/@utilitywarehouse/hearth-fonts/files/ttf/* android/app/src/main/assets/fonts/
```

2. Copy XML font family definitions to the resources folder:

```console
mkdir -p android/app/src/main/res/font && cp ./node_modules/@utilitywarehouse/hearth-fonts/files/xml/* android/app/src/main/res/font/
```

3. Update your `android/app/src/main/java/com/{yourapp}/MainApplication.kt` file to register the custom fonts:

```kotlin
import com.facebook.react.views.text.ReactFontManager;

// ... inside your onCreate() or initialization method:
ReactFontManager.getInstance().addCustomFont(this, "DM Sans", R.font.dm_sans)
ReactFontManager.getInstance().addCustomFont(this, "DM Mono", R.font.dm_mono)
ReactFontManager.getInstance().addCustomFont(this, "Comic Hams", R.font.comic_hams)
```

This approach ensures fonts work consistently across platforms with a single canonical name, as described in [this article](https://ospfranco.com/post/2023/08/11/react-native,-how-to-set-up-fonts-with-a-single-canonical-name/).

### Using Expo

If you are using Expo, you can use the `expo-font` and [`expo-xml-font`](https://github.com/Armster15/expo-xml-font) packages to load the fonts.
Here is an example of how to load the fonts in your `App.tsx` file:

```tsx
// Example usage
import { useFonts } from 'expo-font';
import App from './src/App';

export default () => {
  const [loaded] = useFonts({
    'ComicHams-BoldFlare': require('./assets/fonts/comichams_boldflare.ttf'),
    'ComicHams-SemiBoldFlare': require('./assets/fonts/comichams_semiboldflare.ttf'),
    'DM Mono': require('./assets/fonts/dmmono_medium.ttf'),
    'DMMono-MediumItalic': require('./assets/fonts/dmmono_mediumitalic.ttf'),
    'DMSans-Bold': require('./assets/fonts/dmsans_bold.ttf'),
    'DMSans-BoldItalic': require('./assets/fonts/dmsans_bolditalic.ttf'),
    'DMSans-Italic': require('./assets/fonts/dmsans_italic.ttf'),
    'DMSans-Regular': require('./assets/fonts/dmsans_regular.ttf'),
  });

  if (!loaded) return null;

  return <App />;
};
```

Follow the [expo-xml-font](https://github.com/Armster15/expo-xml-font) documentation to learn how to use the `expo-xml-font` package.

## Babel configuration

You will need to add the following Babel plugin to your `babel.config.js` file:

```js
// Example usage
const unistylesPluginOptions = {
  autoProcessImports: ['@utilitywarehouse/hearth-react-native'],
  autoProcessPaths: ['@utilitywarehouse/hearth-react-native'],
  root: 'src', // Adjust this to your project's structure
  debug: false, // Set to true for debugging purposes
};

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // other plugins...
    'react-native-worklets/plugin',
    ['react-native-unistyles/plugin', unistylesPluginOptions],
  ],
};
```

## Jest configuration

If you are using Jest for testing, you will need to add the following configuration to your `jest.config.js` file:

```js
// Example usage
module.exports = {
  // other Jest configurations...
  setupFiles: [
    'react-native-unistyles/mocks',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  // other Jest configurations...
};
```

You'll also need to add the following to your `jest.setup.js` file:

```js
// Example usage
import { StyleSheet, themes, breakpoints } from '@utilitywarehouse/hearth-react-native';

StyleSheet.configure({
  themes,
  breakpoints,
});

// For some reason react-native-reanimated's default mock doesn't mock useReducedMotion, so we need to override it here
// as we use that method in our components.
jest.mock('react-native-reanimated', () => {
  return {
    ...jest.requireActual('react-native-reanimated/mock'),
    useReducedMotion: () => {}, // Add this line
  };
});
require('react-native-reanimated').setUpTests();

// rest of your setup...
```
