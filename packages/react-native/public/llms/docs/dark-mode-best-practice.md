# Dark Mode Best Practice

When designing for dark mode in Hearth React Native, it's important to ensure that your UI remains visually appealing and accessible. Here are some best practices to follow:

- [Setting Up Dark Mode](#setting-up-dark-mode)
- [Use Semantic Theme Colours](#use-semantic-theme-colours)
- [Use Semantic Utility Props](#use-semantic-utility-props)
- [Use the asset libraries](#use-the-asset-libraries)
  - [Icons](#icons)
  - [Illustrations](#illustrations)
  - [Animations](#animations)
- [`ThemedImage` component](#themedimage-component)

<br />
<br />
<br />

## Setting Up Dark Mode

By default Hearth React Native theme is set to light mode. To enable dark mode, you can set the `colorMode` property in your theme configuration to `'dark'`.
This will automatically apply the dark mode color palette and styles across your app.

```tsx
import { useEffect } from 'react';
import { Appearance } from 'react-native';
import { useColorMode } from '@utilitywarehouse/hearth-react-native';

const App = () => {
  // To set the colour mode use the useColorMode hook and set the color mode
  // to the current system preference on app load
  const [colorMode, setColorMode] = useColorMode();

  // You can optionally set the theme from the system preference on app load or
  // load from async storage if you are persisting the user's theme choice
  useEffect(() => {
    setColorMode(Appearance.getColorScheme() || 'light');
  }, []);

  const toggleColorMode = () => {
    setColorMode(colorMode === 'light' ? 'dark' : 'light');
  };

  return (/* Your app content */);
};
```

You can also use the Unistyles runtime to set the theme outside of React components, [read more here](https://www.unistyl.es/v3/guides/theming/#change-theme):

```tsx
import { UnistylesRuntime } from 'react-native-unistyles';

const toggleTheme = () => {
  const theme = UnistylesRuntime.getTheme();
  UnistylesRuntime.setTheme(theme === 'dark' ? 'light' : 'dark');
};
```

## Use Semantic Theme Colours

When styling your components, it's best to use the semantic colour tokens provided by the Hearth theme. This ensures that your colours will
automatically adapt to both light and dark modes without needing to write custom styles for each mode.

To use the semantic colours, you can access them from the theme object in your styles:

```tsx
import { StyleSheet } from '@utilitywarehouse/hearth-react-native';

const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.colors.text.primary, // Use semantic colour token
  },
}));
```

You can also use the `useTheme` hook to access the theme colours directly in your components:

```tsx
import { useTheme } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const theme = useTheme();

  return <Text style={{ color: theme.colors.text.primary }}>This text adapts to dark mode!</Text>;
};
```

To learn more about the available colours in the Hearth theme, check out the theme tokens documentation.

## Use Semantic Utility Props

In addition to using semantic colour tokens, you should also use the semantic utility props provided by Hearth components.
These props are designed to work with the theme and will automatically adjust their styles based on the current colour mode.

For example, instead of setting a background colour directly, you can use the `backgroundColor` or, for text, the `color` prop with a semantic colour value:

```tsx
<Box backgroundColor="brand" p="400">
  <BodyText color="inverted">This branded box and text adapt to light or dark mode!</BodyText>
</Box>
<Box backgroundColor="secondary" p="400">
  <BodyText color="primary">This box and text adapt to light or dark mode!</BodyText>
  <BodyText color="secondary">This secondary text adapt to light or dark mode!</BodyText>
</Box>
```

By using these semantic utility props, you can ensure that your components will look great and be accessible in both light and dark
modes without needing to write custom styles for each mode.

## Use the asset libraries

Hearth provides asset libraries for icons and illustrations that are designed to work well in both light and dark modes.
When using these assets, make sure to choose the appropriate version (light or dark) based on the current colour mode.

### Icons

When using icons from the `@utilitywarehouse/hearth-react-native-icons` library, you can automatically handle light and dark mode
by using the `color` prop and the `Icon` component with a semantic colour token (by default the `Icon` will use the `theme.colors.icon.primary`
colour which adapts to light and dark mode):

```tsx
import { Icon , useTheme } from '@utilitywarehouse/hearth-react-native';
import { SearchMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

<Icon as={SearchMediumIcon} />;

// Or to specify a colour
const theme = useTheme();
...
<SearchMediumIcon color={theme.colors.icon.primary} />;
```

To learn more about the available icons, check out the [icon library documentation](https://hearth.prod.uw.systems/icons/?path=/docs/introduction--docs).

### Illustrations

When using illustrations from the `@utilitywarehouse/hearth-svg-assets` library, you'll need to import both the light and dark versions
of the illustration and conditionally render the appropriate one based on the current colour mode.

```tsx
import { useColorMode } from '@utilitywarehouse/hearth-react-native';
import SceneBroadbandDark from '@utilitywarehouse/hearth-svg-assets/lib/scene-broadband-dark.svg';
import SceneBroadbandLight from '@utilitywarehouse/hearth-svg-assets/lib/scene-broadband-light.svg';

const MyComponent = () => {
  const [colorMode] = useColorMode();

  return colorMode === 'dark' ? (
    <SceneBroadbandDark width={200} height={200} />
  ) : (
    <SceneBroadbandLight width={200} height={200} />
  );
};
```

The above example is to illustrate the concept of handling light and dark mode with illustrations,
but you should use a reusable `ThemedImage` component to simplify this pattern, which we will cover in the next section.

You can view the available illustrations in the [Hearth SVG asset library documentation](https://hearth.prod.uw.systems/assets/?path=/docs/introduction--docs).

### Animations

When using animations from the `@utilitywarehouse/hearth-json-assets` library, you can also import both light and dark versions of the animation.

We currently only have the light variation of the animations available, but when the dark versions are added you can use a similar approach to
the illustrations example above to conditionally render the appropriate version based on the current colour mode.

You can view the available animations in the [Hearth JSON asset library documentation](https://hearth.prod.uw.systems/assets/?path=/docs/introduction--docs).

## `ThemedImage` component

To simplify the process of handling light and dark mode for images, you can create a reusable `ThemedImage` component that takes both light and dark versions of an image as props and automatically renders the correct one based on the current colour mode.
Here's an example implementation of a `ThemedImage` component:

```tsx
import React from 'react';
import { ThemedImage } from '@utilitywarehouse/hearth-react-native';
import SpotPiggyBankLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-piggy-bank-light.svg';
import SpotPiggyBankDark from '@utilitywarehouse/hearth-svg-assets/lib/spot-piggy-bank-dark.svg';

const MyComponent = () => {
  return (
    <ThemedImage
      light={SpotPiggyBankLight}
      dark={SpotPiggyBankDark}
      style={{ width: 200, height: 200 }}
    />
  );
};
```

See the full `ThemedImage` docs and implementation in the `ThemedImage` documentation.
