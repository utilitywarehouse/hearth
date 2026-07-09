# Themed Image

The `ThemedImage` component automatically switches between light and dark mode images or SVG components based on the current theme. It's perfect for illustrations, logos, or any visual assets that need different appearances for light and dark modes.

- [Features](#features)
- [Basic Usage](#basic-usage)
- [Props](#props)
- [Examples](#examples)

## Features

- **Automatic theme switching** - Responds to color mode changes
- **Flexible sources** - Accepts both regular image sources and React components (like SVGs)
- **Accessible** - Supports all standard Image accessibility props
- **Works with svg-assets** - Seamlessly integrates with the `@utilitywarehouse/hearth-svg-assets` package

## Basic Usage

```tsx
<Box gap="200">
  <ThemedImage
    // @ts-expect-error - This is a playground
    light={<SpotBillingLight width={200} height={200} />}
    // @ts-expect-error - This is a playground
    dark={<SpotBillingDark width={200} height={200} />}
  />
</Box>
```

## Props

| Prop    | Type                                  | Required | Description                                        |
| ------- | ------------------------------------- | -------- | -------------------------------------------------- |
| `light` | `ImageSourcePropType \| ReactElement` | Yes      | Image source or component to display in light mode |
| `dark`  | `ImageSourcePropType \| ReactElement` | Yes      | Image source or component to display in dark mode  |
| ...rest | `ImageProps`                          | No       | All other standard React Native Image props        |

### Additional Props

`ThemedImage` extends React Native's `Image` component, so it accepts all standard `ImageProps` including:

- `style` - Custom styling for the image container
- `resizeMode` - How to resize the image when the frame doesn't match the raw image dimensions
- `accessible` - Whether the element is an accessibility element
- `accessibilityLabel` - Text to be announced by screen readers
- `testID` - Used to locate this view in end-to-end tests

### With SVG Assets

The most common use case is with SVG components from the `@utilitywarehouse/hearth-svg-assets` package:

```tsx
import { View } from 'react-native';
import { ThemedImage } from '@utilitywarehouse/hearth-react-native';
import SpotBillingDark from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-dark.svg';
import SpotBillingLight from '@utilitywarehouse/hearth-svg-assets/lib/spot-billing-light.svg';

function MyComponent() {
  return <ThemedImage light={SpotBillingLight} dark={SpotBillingDark} width={200} height={200} />;
}
```

```tsx
<Box flexDirection="row" flexWrap="wrap" gap="200">
  <ThemedImage
    // @ts-expect-error - Ignore TS2322 for Storybook stories
    light={<SpotBillingLight width={120} height={120} />}
    // @ts-expect-error - Ignore TS2322 for Storybook stories
    dark={<SpotBillingDark width={120} height={120} />}
  />
</Box>
```

### With Regular Images

You can also use regular image sources (not just SVG components):

```tsx
import { ThemedImage } from '@utilitywarehouse/hearth-react-native';
import logoLight from './assets/logo-light.png';
import logoDark from './assets/logo-dark.png';

function MyComponent() {
  return <ThemedImage light={logoLight} dark={logoDark} />;
}
```

```tsx
<Box gap="200">
  <ThemedImage
    light={{
      uri: pig,
    }}
    dark={{
      uri: pig,
    }}
    width={200}
    height={200}
    style={{ width: 200, height: 200, borderRadius: 8 }}
  />
</Box>
```

### With Custom Sizes

When using SVG components, control the size by passing a `style` prop with `width` and `height` to the component:

```tsx
<Box flexDirection="row" flexWrap="wrap" gap="200" alignItems="center">
  <ThemedImage
    // @ts-expect-error - Ignore TS2322 for Storybook stories
    light={<SpotBillingLight width={80} height={80} />}
    // @ts-expect-error - Ignore TS2322 for Storybook stories
    dark={<SpotBillingDark width={80} height={80} />}
  />
  <ThemedImage
    // @ts-expect-error - Ignore TS2322 for Storybook stories
    light={<SpotBillingLight width={120} height={120} />}
    // @ts-expect-error - Ignore TS2322 for Storybook stories
    dark={<SpotBillingDark width={120} height={120} />}
  />
  <ThemedImage
    // @ts-expect-error - Ignore TS2322 for Storybook stories
    light={<SpotBillingLight width={160} height={160} />}
    // @ts-expect-error - Ignore TS2322 for Storybook stories
    dark={<SpotBillingDark width={160} height={160} />}
  />
</Box>
```

### With Accessibility

Support screen readers and assistive technologies:

```tsx
import { View } from 'react-native';
import { ThemedImage } from '@utilitywarehouse/hearth-react-native';
import MascotEnergyDark from '@utilitywarehouse/hearth-svg-assets/lib/mascot-energy-dark.svg';
import MascotEnergyLight from '@utilitywarehouse/hearth-svg-assets/lib/mascot-energy-light.svg';

function MyComponent() {
  return (
    <ThemedImage
      light={MascotEnergyLight}
      dark={MascotEnergyDark}
      width={150}
      height={150}
      accessible={true}
      accessibilityLabel="Energy service mascot illustration"
    />
  );
}
```

```tsx
<Box gap="200">
  <ThemedImage
    // @ts-expect-error - This is a playground
    light={<MascotEnergyLight width={150} height={150} />}
    // @ts-expect-error - This is a playground
    dark={<MascotEnergyDark width={150} height={150} />}
    accessible={true}
    accessibilityLabel="Energy service mascot illustration"
  />
</Box>
```

## Usage with svg-assets Package

The `@utilitywarehouse/hearth-svg-assets` package provides themed illustrations in three categories:

### Spot Illustrations

Small, focused illustrations for specific concepts:

- `spot-billing` - Billing and payments
- `spot-celebratory` - Success and celebration
- `spot-error` - Error states
- `spot-help` - Help and support
- `spot-innovation` - New features
- `spot-savings` - Cost savings
- And more...

### Mascots

Service-specific character illustrations:

- `mascot-energy` - Energy service
- `mascot-broadband` - Broadband service
- `mascot-mobile` - Mobile service
- `mascot-insurance` - Insurance service
- `mascot-cashback` - Cashback rewards

### Scene Illustrations

Large, detailed illustrations for landing pages:

- `scene-energy` - Energy service scenes
- `scene-broadband` - Broadband service scenes
- `scene-mobile` - Mobile service scenes
- `scene-insurance` - Insurance service scenes
- `scene-bundle` - Service bundle scenes

All assets come in both `-light.svg` and `-dark.svg` variants.

## Integration with react-native-svg-transformer

To use SVG files as React components in React Native, you'll need `react-native-svg-transformer`:

```bash
# Install dependencies
npm install react-native-svg react-native-svg-transformer --save-dev
```

Configure your `metro.config.js`:

```js
const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: getDefaultConfig(__dirname).resolver.assetExts.filter(ext => ext !== 'svg'),
    sourceExts: [...getDefaultConfig(__dirname).resolver.sourceExts, 'svg'],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
```

Add TypeScript declarations (optional):

```typescript
// svg.d.ts
declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}
```

## Best Practices

1. **Always provide both variants** - Ensure you have both light and dark versions of your assets
2. **Use appropriate sizes** - Match illustration sizes to your design specifications
3. **Add accessibility labels** - Make your images accessible to screen readers
4. **Consider performance** - Large SVG files may impact performance on older devices
5. **Test in both modes** - Always test your themed images in both light and dark modes

### SVG not displaying

Make sure you have configured `react-native-svg-transformer` correctly and that your SVG files are valid.

### Theme not switching

The component uses `useColorMode` hook which relies on the Unistyles theme system. Ensure your app is properly configured with Unistyles.

### TypeScript errors with SVG imports

Add the TypeScript declaration file for `.svg` modules as shown in the integration section above.
