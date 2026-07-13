# Theme Tokens

Hearth React Native provides a comprehensive set of design tokens that ensure consistency across your application. These tokens are built on top of the primitive design system and include semantic meanings for colors, typography, spacing, and other design properties.

- [How to Use Tokens](#how-to-use-tokens)
- [Utility Tokens](#utility-tokens)
- [Colors](#colors)
  - [Brand and Service Colors](#brand-and-service-colors)
  - [Semantic Colors](#semantic-colors)
  - [Light Theme Colors](#light-theme-colors)
  - [Dark Theme Colors](#dark-theme-colors)
  - [Primitive Color Palette](#primitive-color-palette)
  - [Color Scales](#color-scales)
- [Typography](#typography)
  - [Font Family](#font-family)
  - [Font Size](#font-size)
  - [Font Weight](#font-weight)
  - [Letter Spacing](#letter-spacing)
  - [Line Height](#line-height)
- [Spacing](#spacing)
- [Border](#border)
  - [Border Width](#border-width)
  - [Border Radius](#border-radius)
- [Shadows](#shadows)
- [Layout Tokens](#layout-tokens)
- [Component Tokens](#component-tokens)
- [Tokens Package](#tokens-package)

## How to Use Tokens

Theme tokens are accessible through the theme object in your stylesheets or with the `useTheme` hook.
Here's an example of how to use them in a component:

```tsx
// Example usage
import { StyleSheet, View, Text } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, Hearth!</Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.color.background.primary,
    padding: theme.space[4],
    borderRadius: theme.borderRadius.lg,
    borderColor: theme.color.border.subtle.color,
    borderWidth: theme.borderWidth[1],
  },
  title: {
    color: theme.color.text.primary,
    fontSize: theme.font.size[300],
    fontFamily: theme.font.family.heading,
    fontWeight: theme.font.weight.bold,
  },
}));

// or using the `useTheme` hook:
import { useTheme } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const theme = useTheme();

  return (
    <View style={{ backgroundColor: theme.color.background.primary, padding: theme.space[4] }}>
      <Text
        style={{
          color: theme.color.text.primary,
          fontSize: theme.font.size[300],
          fontFamily: theme.font.family.heading,
          fontWeight: theme.font.weight.bold,
        }}
      >
        Hello, Hearth!
      </Text>
    </View>
  );
};
```

## Utility Tokens

Utility tokens are tokens provide helpful context or helper functions to simplify styling.
They can be used to create consistent styles across your application.

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  container: {
    backgroundColor: theme.isDark ? theme.color.grey[900] : theme.color.grey[100],
    borderColor: theme.colorMode === 'light' ? theme.color.grey[300] : theme.color.grey[700],
    padding: theme.space[200],
    margin: theme.space[2],
    borderRadius: theme.borderRadius.md,
  },
}));
```

| Token       | Description                                      |
| ----------- | ------------------------------------------------ |
| `isDark`    | Boolean indicating if the current theme is dark  |
| `isLight`   | Boolean indicating if the current theme is light |
| `colorMode` | Current color mode, either 'light' or 'dark'     |

## Colors

The color system provides both semantic and primitive color tokens that automatically adapt to light and dark themes.

You can view the full color scales below.

<Box
style={{
    position: 'sticky',
    top: 0,
    width: 240,
    padding: 8,
    height: 16,
    overflow: 'visible',
    marginLeft: '-260px !important',
    zIndex: 1,
  }}

>

  <ul
    style={{
      listStyleType: 'none',
      paddingLeft: 0,
      marginLeft: 0,
    }}
  >
    <li>[Colors](#colors)</li>
    <ul style={{ marginTop: 0, marginBottom: 0 }}>
      <li>[Brand and Service Colors](#brand-and-service-colors)</li>
      <li>[Semantic Colors](#semantic-colors)</li>
      <li>[Light Theme Colors](#light-theme-colors)</li>
      <li>[Dark Theme Colors](#dark-theme-colors)</li>
      <li>[Primitive Color Palette](#primitive-color-palette)</li>
      <li>[Color Scales](#color-scales)</li>
    </ul>
    <li>[Typography](#typography)</li>
    <ul style={{ marginTop: 0, marginBottom: 0 }}>
      <li>[Font Family](#font-family)</li>
      <li>[Font Size](#font-size)</li>
      <li>[Font Weight](#font-weight)</li>
      <li>[Letter Spacing](#letter-spacing)</li>
      <li>[Line Height](#line-height)</li>
    </ul>
    <li>[Spacing](#spacing)</li>
    <li>[Border](#border)</li>
    <ul style={{ marginTop: 0, marginBottom: 0 }}>
      <li>[Border Width](#border-width)</li>
      <li>[Border Radius](#border-radius)</li>
    </ul>
  </ul>
</Box>

### Brand and Service Colors

These colors represent the core brand identity and various services:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  brandButton: {
    backgroundColor: theme.color.surface.brand.default,
    borderColor: theme.color.border.strong,
  },
  energyCard: {
    backgroundColor: theme.color.surface.energy.default,
    color: theme.color.text.inverted,
  },
  broadbandAccent: {
    backgroundColor: theme.color.surface.broadband.subtle,
  },
  highlightElement: {
    backgroundColor: theme.color.surface.highlight.default,
  },
  neutralSurface: {
    backgroundColor: theme.color.surface.neutral.subtle,
  },
}));
```

Available brand and service colors:

- **Brand**: `brand` - Primary brand color (purple)
- **Energy**: `energy` - Energy service (blue)
- **Broadband**: `broadband` - Broadband service (green)
- **Mobile**: `mobile` - Mobile service (rose/pink)
- **Insurance**: `insurance` - Insurance service (orange)
- **Cashback**: `cashback` - Cashback service (lilac)
- **Pig**: `pig` - Savings/Piggy service (pink)
- **Highlight**: `highlight` - Attention/highlight color (yellow)

### Semantic Colors

Semantic colors provide meaning and context to your UI elements:

#### Background Colors

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  primaryBackground: {
    backgroundColor: theme.color.background.primary, // Main app background
  },
  secondaryBackground: {
    backgroundColor: theme.color.background.secondary, // Card/modal backgrounds
  },
  brandBackground: {
    backgroundColor: theme.color.background.brand, // Brand-colored backgrounds
  },
}));
```

#### Text Colors

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  primaryText: {
    color: theme.color.text.primary, // Main text color
  },
  secondaryText: {
    color: theme.color.text.secondary, // Subtle/muted text
  },
  invertedText: {
    color: theme.color.text.inverted, // Text on dark backgrounds
  },
}));
```

#### Interactive Colors

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  primaryButton: {
    backgroundColor: theme.color.interactive.brand.surface.strong.default,
    color: theme.color.interactive.brand.foreground.strong,
  },
  destructiveButton: {
    backgroundColor: theme.color.interactive.destructive.surface.strong.default,
    color: theme.color.interactive.destructive.foreground.strong,
  },
  affirmativeButton: {
    backgroundColor: theme.color.interactive.affirmative.surface.strong.default,
    color: theme.color.interactive.affirmative.foreground.strong,
  },
  functionalButton: {
    backgroundColor: theme.color.interactive.functional.surface.strong.default,
    color: theme.color.interactive.functional.foreground.strong,
  },
  highlightButton: {
    backgroundColor: theme.color.interactive.highlight.surface.strong.default,
    color: theme.color.interactive.highlight.foreground.strong,
  },
}));
```

#### Feedback Colors

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  errorMessage: {
    backgroundColor: theme.color.feedback.danger.surface.subtle,
    color: theme.color.feedback.danger.foreground.subtle,
    borderColor: theme.color.feedback.danger.border,
  },
  successMessage: {
    backgroundColor: theme.color.feedback.positive.surface.subtle,
    color: theme.color.feedback.positive.foreground.subtle,
    borderColor: theme.color.feedback.positive.border,
  },
  warningMessage: {
    backgroundColor: theme.color.feedback.warning.surface.subtle,
    color: theme.color.feedback.warning.foreground.subtle,
    borderColor: theme.color.feedback.warning.border,
  },
  infoMessage: {
    backgroundColor: theme.color.feedback.info.surface.subtle,
    color: theme.color.feedback.info.foreground.subtle,
    borderColor: theme.color.feedback.info.border,
  },
  functionalMessage: {
    backgroundColor: theme.color.feedback.functional.surface.subtle,
    color: theme.color.feedback.functional.foreground.subtle,
    borderColor: theme.color.feedback.functional.border,
  },
}));
```

#### Light Theme Colors

<ColorPalette>
  <ColorItem
    title="Background"
    subtitle="Background colors"
    colors={{
      'background.brand': color.light.background.brand,
      'background.primary': color.light.background.primary,
      'background.secondary': color.light.background.secondary,
    }}
  />
  <ColorItem
    title="Text"
    subtitle="Text colors"
    colors={{
      'text.primary': color.light.text.primary,
      'text.secondary': color.light.text.secondary,
      'text.inverted': color.light.text.inverted,
    }}
  />
  <ColorItem
    title="Border"
    subtitle="Border colors"
    colors={{
      'border.strong': color.light.border.strong,
      'border.subtle': color.light.border.subtle,
    }}
  />
  <ColorItem
    title="Focus"
    subtitle="Focus indicator colors"
    colors={{
      'focus.primary': color.light.focus.primary,
      'focus.inverted': color.light.focus.inverted,
    }}
  />
  <ColorItem
    title="Feedback - Danger"
    subtitle="Error and danger states"
    colors={{
      'feedback.danger.\nsurface.default': color.light.feedback.danger.surface.default,
      'feedback.danger.\nsurface.subtle': color.light.feedback.danger.surface.subtle,
      'feedback.danger.\nborder': color.light.feedback.danger.border,
    }}
  />
  <ColorItem
    title="Feedback - Functional"
    subtitle="Neutral functional states"
    colors={{
      'feedback.functional.\nsurface.default': color.light.feedback.functional.surface.default,
      'feedback.functional.\nsurface.subtle': color.light.feedback.functional.surface.subtle,
      'feedback.functional.\nborder': color.light.feedback.functional.border,
    }}
  />
  <ColorItem
    title="Feedback - Info"
    subtitle="Information states"
    colors={{
      'feedback.info.\nsurface.default': color.light.feedback.info.surface.default,
      'feedback.info.\nsurface.subtle': color.light.feedback.info.surface.subtle,
      'feedback.info.\nborder': color.light.feedback.info.border,
    }}
  />
  <ColorItem
    title="Feedback - Positive"
    subtitle="Success and positive states"
    colors={{
      'feedback.positive.\nsurface.default': color.light.feedback.positive.surface.default,
      'feedback.positive.\nsurface.subtle': color.light.feedback.positive.surface.subtle,
      'feedback.positive.\nborder': color.light.feedback.positive.border,
    }}
  />
  <ColorItem
    title="Feedback - Warning"
    subtitle="Warning and caution states"
    colors={{
      'feedback.warning.\nsurface.default': color.light.feedback.warning.surface.default,
      'feedback.warning.\nsurface.subtle': color.light.feedback.warning.surface.subtle,
      'feedback.warning.\nborder': color.light.feedback.warning.border,
    }}
  />
  <ColorItem
    title="Surface - Brand"
    subtitle="Brand surface colors"
    colors={{
      'surface.brand.default': color.light.surface.brand.default,
      'surface.brand.strong': color.light.surface.brand.strong,
      'surface.brand.subtle': color.light.surface.brand.subtle,
    }}
  />
  <ColorItem
    title="Surface - Service Colors"
    subtitle="Service-specific surface colors"
    colors={{
      'surface.\nbroadband.default': color.light.surface.broadband.default,
      'surface.\nbroadband.subtle': color.light.surface.broadband.subtle,
      'surface.\ncashback.default': color.light.surface.cashback.default,
      'surface.\ncashback.subtle': color.light.surface.cashback.subtle,
      'surface.\nenergy.default': color.light.surface.energy.default,
      'surface.\nenergy.subtle': color.light.surface.energy.subtle,
    }}
  />
  <ColorItem
    title="Surface - Other Services"
    subtitle="Additional service surface colors"
    colors={{
      'surface.\nhighlight.default': color.light.surface.highlight.default,
      'surface.\nhighlight.subtle': color.light.surface.highlight.subtle,
      'surface.\ninsurance.default': color.light.surface.insurance.default,
      'surface.\ninsurance.subtle': color.light.surface.insurance.subtle,
      'surface.\nmobile.default': color.light.surface.mobile.default,
      'surface.\nmobile.subtle': color.light.surface.mobile.subtle,
    }}
  />
  <ColorItem
    title="Surface - Pig"
    subtitle="Pig service surface colors"
    colors={{
      'surface.pig.default': color.light.surface.pig.default,
      'surface.pig.subtle': color.light.surface.pig.subtle,
    }}
  />
  <ColorItem
    title="Shadow Colors"
    subtitle="Shadow and elevation colors"
    colors={{
      'shadow.default': color.light.shadow.default,
      'shadow.brand': color.light.shadow.brand,
      'shadow.broadband': color.light.shadow.broadband,
      'shadow.cashback': color.light.shadow.cashback,
      'shadow.energy': color.light.shadow.energy,
      'shadow.insurance': color.light.shadow.insurance,
    }}
  />
  <ColorItem
    title="Shadow Colors (Cont.)"
    subtitle="Additional shadow colors"
    colors={{
      'shadow.mobile': color.light.shadow.mobile,
      'shadow.pig': color.light.shadow.pig,
    }}
  />
</ColorPalette>

#### Dark Theme Colors

<ColorPalette>
  <ColorItem
    title="Background"
    subtitle="Background colors"
    colors={{
      'background.brand': color.dark.background.brand,
      'background.primary': color.dark.background.primary,
      'background.secondary': color.dark.background.secondary,
    }}
  />
  <ColorItem
    title="Text"
    subtitle="Text colors"
    colors={{
      'text.primary': color.dark.text.primary,
      'text.secondary': color.dark.text.secondary,
      'text.inverted': color.dark.text.inverted,
    }}
  />
  <ColorItem
    title="Border"
    subtitle="Border colors"
    colors={{
      'border.strong': color.dark.border.strong,
      'border.subtle': color.dark.border.subtle,
    }}
  />
  <ColorItem
    title="Focus"
    subtitle="Focus indicator colors"
    colors={{
      'focus.primary': color.dark.focus.primary,
      'focus.inverted': color.dark.focus.inverted,
    }}
  />
  <ColorItem
    title="Feedback - Danger"
    subtitle="Error and danger states"
    colors={{
      'feedback.danger.\nsurface.default': color.dark.feedback.danger.surface.default,
      'feedback.danger.\nsurface.subtle': color.dark.feedback.danger.surface.subtle,
      'feedback.danger.\nborder': color.dark.feedback.danger.border,
    }}
  />
  <ColorItem
    title="Feedback - Functional"
    subtitle="Neutral functional states"
    colors={{
      'feedback.functional.\nsurface.default': color.dark.feedback.functional.surface.default,
      'feedback.functional.\nsurface.subtle': color.dark.feedback.functional.surface.subtle,
      'feedback.functional.\nborder': color.dark.feedback.functional.border,
    }}
  />
  <ColorItem
    title="Feedback - Info"
    subtitle="Information states"
    colors={{
      'feedback.info.surface.\ndefault': color.dark.feedback.info.surface.default,
      'feedback.info.surface.\nsubtle': color.dark.feedback.info.surface.subtle,
      'feedback.info.border': color.dark.feedback.info.border,
    }}
  />
  <ColorItem
    title="Feedback - Positive"
    subtitle="Success and positive states"
    colors={{
      'feedback.positive.\nsurface.default': color.dark.feedback.positive.surface.default,
      'feedback.positive.\nsurface.subtle': color.dark.feedback.positive.surface.subtle,
      'feedback.positive.\nborder': color.dark.feedback.positive.border,
    }}
  />
  <ColorItem
    title="Feedback - Warning"
    subtitle="Warning and caution states"
    colors={{
      'feedback.warning.\nsurface.default': color.dark.feedback.warning.surface.default,
      'feedback.warning.\nsurface.subtle': color.dark.feedback.warning.surface.subtle,
      'feedback.warning.\nborder': color.dark.feedback.warning.border,
    }}
  />
  <ColorItem
    title="Surface - Brand"
    subtitle="Brand surface colors"
    colors={{
      'surface.brand.default': color.dark.surface.brand.default,
      'surface.brand.strong': color.dark.surface.brand.strong,
      'surface.brand.subtle': color.dark.surface.brand.subtle,
    }}
  />
  <ColorItem
    title="Surface - Service Colors"
    subtitle="Service-specific surface colors"
    colors={{
      'surface.\nbroadband.default': color.dark.surface.broadband.default,
      'surface.\nbroadband.subtle': color.dark.surface.broadband.subtle,
      'surface.\ncashback.default': color.dark.surface.cashback.default,
      'surface.\ncashback.subtle': color.dark.surface.cashback.subtle,
      'surface.\nenergy.default': color.dark.surface.energy.default,
      'surface.\nenergy.subtle': color.dark.surface.energy.subtle,
    }}
  />
  <ColorItem
    title="Surface - Other Services"
    subtitle="Additional service surface colors"
    colors={{
      'surface.\nhighlight.default': color.dark.surface.highlight.default,
      'surface.\nhighlight.subtle': color.dark.surface.highlight.subtle,
      'surface.\ninsurance.default': color.dark.surface.insurance.default,
      'surface.\ninsurance.subtle': color.dark.surface.insurance.subtle,
      'surface.\nmobile.default': color.dark.surface.mobile.default,
      'surface.\nmobile.subtle': color.dark.surface.mobile.subtle,
    }}
  />
  <ColorItem
    title="Surface - Pig"
    subtitle="Pig service surface colors"
    colors={{
      'surface.pig.default': color.dark.surface.pig.default,
      'surface.pig.subtle': color.dark.surface.pig.subtle,
    }}
  />
  <ColorItem
    title="Shadow Colors"
    subtitle="Shadow and elevation colors"
    colors={{
      'shadow.default': color.dark.shadow.default,
      'shadow.brand': color.dark.shadow.brand,
      'shadow.broadband': color.dark.shadow.broadband,
      'shadow.cashback': color.dark.shadow.cashback,
      'shadow.energy': color.dark.shadow.energy,
      'shadow.insurance': color.dark.shadow.insurance,
    }}
  />
  <ColorItem
    title="Shadow Colors (Cont.)"
    subtitle="Additional shadow colors"
    colors={{
      'shadow.mobile': color.dark.shadow.mobile,
      'shadow.pig': color.dark.shadow.pig,
    }}
  />
</ColorPalette>

### Primitive Color Palette

Access the full primitive color palette for custom use cases:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  customElement: {
    backgroundColor: theme.color.purple[400],
    borderColor: theme.color.grey[300],
    color: theme.color.grey[900],
  },
}));
```

Available primitive colors with full scales (0-1000):

- `blue`, `green`, `red`, `orange`, `yellow`
- `purple`, `grey`, `warmWhite`
- `broadbandGreen`, `energyBlue`, `mobileRose`
- `insuranceOrange`, `cashbackLilac`, `piggyPink`

#### Color Scales

<ColorPalette>
  {Object.keys(color)
    .filter(key => !['light', 'dark'].includes(key))
    .map(key => (
      <>
        <ColorItem
          key={`${key}-1`}
          title={key}
          subtitle={`${key}`}
          colors={Object.keys(color[key])
            .slice(0, 6)
            .reduce((acc, subKey) => {
              acc[subKey] = color[key][subKey];
              return acc;
            }, {})}
        />
        {Object.keys(color[key]).length > 6 && (
          <ColorItem
            key={`${key}-2`}
            title=""
            subtitle=""
            colors={Object.keys(color[key])
              .slice(6, 12)
              .reduce((acc, subKey) => {
                acc[subKey] = color[key][subKey];
                return acc;
              }, {})}
          />
        )}
        {Object.keys(color[key]).length > 12 && (
          <ColorItem
            key={`${key}-3`}
            title=""
            subtitle=""
            colors={Object.keys(color[key])
              .slice(12, 18)
              .reduce((acc, subKey) => {
                acc[subKey] = color[key][subKey];
                return acc;
              }, {})}
          />
        )}
      </>
    ))}
</ColorPalette>

## Typography

The typography system provides a cohesive set of font properties based on the design system.

### Font Family

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  heading: {
    fontFamily: theme.font.family.heading, // Comic Hams
  },
  bodyText: {
    fontFamily: theme.font.family.body, // DM Sans
  },
  codeText: {
    fontFamily: theme.font.family.detail, // DM Mono
  },
}));
```

Available font families:

- `heading`: Comic Hams (display font)
- `body`: DM Sans (body text)
- `detail`: DM Mono (monospace/code)

### Font Size

The font size scale provides consistent typography sizing:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  caption: {
    fontSize: theme.font.size['50'], // 10px
  },
  small: {
    fontSize: theme.font.size['75'], // 12px
  },
  body: {
    fontSize: theme.font.size['100'], // 16px
  },
  heading: {
    fontSize: theme.font.size['400'], // 30px
  },
  display: {
    fontSize: theme.font.size['700'], // 60px
  },
}));
```

Available font sizes:
| Token | Value | Usage |
|-------|-------|-------|
| `50` | 10px | Captions, fine print |
| `75` | 12px | Small text, labels |
| `90` | 14px | Secondary text |
| `100` | 16px | Body text (base) |
| `150` | 18px | Large body text |
| `200` | 20px | Subheadings |
| `300` | 24px | Small headings |
| `400` | 30px | Medium headings |
| `500` | 36px | Large headings |
| `550` | 40px | Extra large headings |
| `600` | 48px | Display text |
| `700` | 60px | Large display |
| `800` | 72px | Hero text |
| `900` | 96px | Extra large display |
| `1000` | 128px | Maximum display |

### Font Weight

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  regular: {
    fontWeight: theme.font.weight.regular, // 400
  },
  medium: {
    fontWeight: theme.font.weight.medium, // 500
  },
  semibold: {
    fontWeight: theme.font.weight.semibold, // 600
  },
  bold: {
    fontWeight: theme.font.weight.bold, // 700
  },
}));
```

### Letter Spacing

Optimized letter spacing values for each font size:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  tightText: {
    letterSpacing: theme.letterSpacing['700'], // Tight spacing for large text
  },
  normalText: {
    letterSpacing: theme.letterSpacing['100'], // Normal spacing for body text
  },
}));
```

### Line Height

Consistent line height values for optimal readability:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  bodyText: {
    lineHeight: theme.lineHeight['400'], // 22px for body text
  },
  headingText: {
    lineHeight: theme.lineHeight['700'], // 32px for headings
  },
}));
```

## Spacing

The spacing system provides a consistent scale for padding, margins, and gaps:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  container: {
    padding: theme.space['200'], // 16px
    margin: theme.space['150'], // 12px
    gap: theme.space['100'], // 8px
  },
  tightSpacing: {
    padding: theme.space['50'], // 4px
  },
  looseSpacing: {
    padding: theme.space['500'], // 40px
  },
}));
```

Available spacing values:
| Token | Value | Usage |
|-------|-------|-------|
| `0` | 0px | No spacing |
| `25` | 2px | Minimal spacing |
| `50` | 4px | Tight spacing |
| `75` | 6px | Small spacing |
| `100` | 8px | Base spacing unit |
| `150` | 12px | Small-medium spacing |
| `175` | 14px | Compact spacing |
| `200` | 16px | Standard spacing |
| `250` | 20px | Medium spacing |
| `300` | 24px | Large spacing |
| `350` | 28px | Large spacing |
| `400` | 32px | Extra large spacing |
| `500` | 40px | Section spacing |
| `600` | 48px | Large section spacing |
| `700` | 56px | Extra large sections |
| `800` | 64px | Major spacing |
| `900` | 72px | Maximum spacing |
| `1000` | 80px | Hero spacing |

There is also responsive layout spacing for different screen sizes:

| Token  | Mobile (base) | Tablet (md) | Desktop (lg) | Usage (guideline)                     |
| ------ | ------------- | ----------- | ------------ | ------------------------------------- |
| `none` | 0px           | 0px         | 0px          | Reset / collapse spacing              |
| `2xs`  | 2px           | 2px         | 2px          | Hairline gaps, separators             |
| `xs`   | 4px           | 4px         | 4px          | Tight padding, icon nudge             |
| `sm`   | 8px           | 8px         | 8px          | Compact component gap                 |
| `md`   | 12px          | 12px        | 12px         | Dense layouts, inline stacks          |
| `lg`   | 16px          | 16px        | 16px         | Base section spacing                  |
| `xl`   | 20px          | 24px        | 24px         | Larger grouping / outer padding       |
| `2xl`  | 28px          | 28px        | 40px         | Major vertical rhythm / page sections |

There are built in responsive layout spacings for mobile, tablet and desktop. They live under `theme.space.xs` etc,
which are responsive values that adapt based on screen size. For example, `theme.space.xl` is `20px` on mobile, and `24px` on tablet and desktop.

These responsive layout spacings live under `theme.layout.[mobile|tablet|desktop].spacing` and are intended for macro
layout structure (page/frame scaffolding) rather than component-level internal spacing (which should prefer the core `space` scale).

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  pageSection: {
    padding: theme.space.xl, // 20px on mobile, 24px on tablet/desktop
  },
}));

// or using the layout tokens directly:
const styles = StyleSheet.create(theme => ({
  pageSection: {
    // Example: use responsive spacing tokens
    paddingHorizontal: theme.layout.mobile.spacing.lg,
    paddingTop: theme.layout.mobile.spacing.xl,
    // Or use responsive object syntax
    gap: {
      base: theme.layout.mobile.spacing.md,
      md: theme.layout.tablet.spacing.lg,
      lg: theme.layout.desktop.spacing.xl,
    },
  },
}));
```

Percentage-based spacing is also available:

- `1/2`, `1/3`, `2/3`, `1/4`, `3/4`
- `1/5`, `2/5`, `3/5`, `4/5`
- `1/6`, `5/6`, `full` (100%)

### Border Width

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  thinBorder: {
    borderWidth: theme.borderWidth['1'], // 1px
  },
  thickBorder: {
    borderWidth: theme.borderWidth['2'], // 2px
  },
}));
```

### Border Radius

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  card: {
    borderRadius: theme.borderRadius.lg, // 12px
  },
  button: {
    borderRadius: theme.borderRadius.md, // 8px
  },
  pill: {
    borderRadius: theme.borderRadius.full, // 9999px
  },
}));
```

Available border radius values:
| Token | Value | Usage |
|-------|-------|-------|
| `none` | 0px | Sharp corners |
| `xs` | 4px | Subtle rounding |
| `sm` | 6px | Small rounding |
| `md` | 8px | Standard rounding |
| `lg` | 12px | Large rounding |
| `xl` | 16px | Extra large rounding |
| `full` | 9999px | Fully rounded (pills/circles) |

## Shadows

The shadow system provides elevation through predefined shadow styles:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  card: {
    ...theme.shadow.sm, // Subtle shadow
  },
  modal: {
    ...theme.shadow.lg, // Prominent shadow
  },
  floatingButton: {
    ...theme.shadow.xl, // Strong shadow
  },
}));
```

## Layout Tokens

Access responsive layout values for different screen sizes:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  container: {
    padding: {
      base: theme.layout.mobile.spacing.md,
      md: theme.layout.tablet.spacing.lg,
      lg: theme.layout.desktop.spacing.xl,
    },
  },
}));
```

## Component Tokens

Access component-specific design tokens for consistent styling:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  customButton: {
    backgroundColor: theme.components.button.background.primary,
    borderColor: theme.components.button.border.primary,
    borderRadius: theme.components.button.borderRadius,
    paddingHorizontal: theme.components.button.padding.horizontal,
    paddingVertical: theme.components.button.padding.vertical,
  },
  customInput: {
    backgroundColor: theme.components.input.background.default,
    borderColor: theme.components.input.border.default,
    fontSize: theme.components.input.fontSize,
  },
}));
```

## Tokens Package

We also offer a dedicated tokens package that provides access to all design tokens in a structured format.
This package can be used independently or alongside the main Hearth React Native library.

To read more about the tokens package, visit the [Hearth Tokens documentation](https://hearth.prod.uw.systems/?path=/docs/tokens_introduction--docs).
