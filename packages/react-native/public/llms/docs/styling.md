# Styling

Hearth React Native uses [Unistyles](https://www.unistyl.es/) for styling components and exposes the library
via the `@utilitywarehouse/hearth-react-native` package. Unistyles is a cross-platform library that enables you to share
up to 100% of your styles across all platforms. It combines the simplicity of StyleSheet with the performance
of C++.

- [Unistyles Features](#unistyles-features)
- [Usage](#usage)
- [Design Tokens and Theme](#design-tokens-and-theme)
  - [Accessing the Theme](#accessing-the-theme)
  - [Available Design Tokens](#available-design-tokens)
    - [Colors](#colors)
    - [Spacing](#spacing)
    - [Typography](#typography)
    - [Border Radius](#border-radius)
    - [Shadows](#shadows)
- [Responsive Design with Breakpoints](#responsive-design-with-breakpoints)
- [Dark Mode Support](#dark-mode-support)
- [Color Mode Specific Styles](#color-mode-specific-styles)
- [Runtime Access](#runtime-access)
- [Component-Specific Tokens](#component-specific-tokens)
- [Variants and Compound Variants](#variants-and-compound-variants)
- [Best Practices](#best-practices)

## Unistyles Features

Some of the key features of Unistyles include:

- 🚀 Shared core with C++ and JSI bindings
- 🏎️ Powered by Nitro Modules
- 🦸🏼‍♂️ No re-renders
- 🦄 Custom web parser, classes and pseudo classes
- ⚛️ Tightly integrated with Fabric and Shadow Tree
- 🔥 Crazy performance, adds under 0.1 ms to your StyleSheet
- 🎳 Share up to 100% of your styles across platforms in monorepo
- 🎯 Doesn't introduce new components, your view hierarchy is always clean
- 🎨 Register multiple themes and change them with single function call
  and [much much more](https://www.unistyl.es/v3/start/new-features)!

## Usage

To start using Unistyles for styling your components, simply import the `StyleSheet` from Hearth React Native:

```tsx
// Example usage
import { StyleSheet, View, Text } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Hearth</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
```

## Design Tokens and Theme

Hearth React Native comes with a comprehensive set of design tokens that ensure consistency across your application. These tokens are accessible through the theme object in your stylesheets.

### Accessing the Theme

To access design tokens, create your styles using a function that receives the theme as the first parameter:

```tsx
// Example usage
import { StyleSheet, View, Text } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Themed Component</Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flex: 1,
    backgroundColor: theme.color.grey[50],
    padding: theme.space[4],
  },
  title: {
    fontSize: theme.font.size.lg,
    fontWeight: theme.font.weight.bold,
    color: theme.color.grey[900],
    fontFamily: theme.font.family.sans,
  },
}));
```

#### Colors

The theme provides a comprehensive color palette organized by semantic meaning:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  // Primary colors
  primaryButton: {
    backgroundColor: theme.color.purple[400],
    borderColor: theme.color.purple[700],
  },

  // Secondary colors
  secondaryButton: {
    backgroundColor: theme.color.grey[100],
    borderColor: theme.color.grey[300],
  },

  // Semantic colors
  successMessage: {
    backgroundColor: theme.color.green[50],
    borderColor: theme.color.green[200],
    color: theme.color.green[800],
  },

  errorMessage: {
    backgroundColor: theme.color.red[50],
    borderColor: theme.color.red[300],
    color: theme.color.red[800],
  },
}));
```

#### Spacing

Use consistent spacing values from the design system:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  container: {
    // Use space tokens for consistent spacing
    padding: theme.space[4], // 16px
    margin: theme.space[2], // 8px
    gap: theme.space[3], // 12px
  },

  // Responsive spacing using breakpoints
  responsiveContainer: {
    padding: {
      base: theme.space[3],
      md: theme.space[6],
      lg: theme.space[8],
    },
  },
}));
```

#### Typography

Access font families, sizes, weights, and line heights:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  heading: {
    fontFamily: theme.font.family.display, // Comic Hams
    fontSize: theme.font.size['2xl'],
    fontWeight: theme.font.weight.bold,
    lineHeight: theme.lineHeight.tight,
  },

  body: {
    fontFamily: theme.font.family.sans, // DM Sans
    fontSize: theme.font.size.base,
    fontWeight: theme.font.weight.normal,
    lineHeight: theme.lineHeight.normal,
  },

  code: {
    fontFamily: theme.font.family.mono, // DM Mono
    fontSize: theme.font.size.sm,
  },
}));
```

#### Border Radius

Use consistent border radius values:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  card: {
    borderRadius: theme.borderRadius.lg,
  },

  button: {
    borderRadius: theme.borderRadius.md,
  },

  avatar: {
    borderRadius: theme.borderRadius.full,
  },
}));
```

#### Shadows

Apply consistent shadow styles:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  card: {
    ...theme.shadow.md,
    backgroundColor: theme.color.white,
  },

  floatingButton: {
    ...theme.shadow.lg,
    backgroundColor: theme.color.purple[400],
  },
}));
```

## Responsive Design with Breakpoints

Create responsive layouts using the built-in breakpoint system:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  container: {
    padding: {
      base: theme.space[4],
      md: theme.space[6],
      lg: theme.space[8],
    },

    flexDirection: {
      base: 'column',
      md: 'row',
    },
  },

  sidebar: {
    width: {
      base: '100%',
      md: '300px',
      lg: '400px',
    },
  },
}));
```

## Dark Mode Support

Styles automatically adapt to the current color mode when using theme tokens:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  container: {
    // Automatically switches between light and dark mode
    backgroundColor: theme.color.background.primary,
    color: theme.color.text,
  },

  card: {
    backgroundColor: theme.color.surface.brand.default,
    borderColor: theme.color.border.strong,
  },
}));
```

## Color Mode Specific Styles

You can also define styles that apply only in light or dark mode:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.isLight ? theme.color.grey[900] : theme.color.grey[100],
  },
}));
```

## Runtime Access

Access theme values and device information at runtime:

```tsx
// Example usage
import { StyleSheet, UnistylesRuntime } from '@utilitywarehouse/hearth-react-native';

const styles = StyleSheet.create((theme, rt) => ({
  container: {
    backgroundColor: theme.color.background.primary,
    paddingTop: rt.insets.top, // Safe area
    paddingBottom: rt.insets.bottom,
  },

  responsiveText: {
    fontSize: rt.fontScale * theme.font.size.base, // Accessibility
  },
}));

// Access runtime values outside of StyleSheet
const currentTheme = UnistylesRuntime.themeName; // 'light' or 'dark'
const isPortrait = UnistylesRuntime.isPortrait;
const screenWidth = UnistylesRuntime.screen.width;
```

Read more about the [Unistyles Runtime API](https://www.unistyl.es/v3/references/mini-runtime) for more details on available runtime values.

## Component-Specific Tokens

Use component-specific design tokens for consistent styling:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  button: {
    backgroundColor: theme.components.button.background.primary,
    borderColor: theme.components.button.border.primary,
    color: theme.components.button.text.primary,
    borderRadius: theme.components.button.borderRadius,
    paddingHorizontal: theme.components.button.padding.horizontal,
    paddingVertical: theme.components.button.padding.vertical,
  },

  input: {
    backgroundColor: theme.components.input.background.default,
    borderColor: theme.components.input.border.default,
    borderRadius: theme.components.input.borderRadius,
    fontSize: theme.components.input.fontSize,
  },
}));
```

## Variants and Compound Variants

Unistyles provides powerful variant systems that allow you to create flexible, reusable components with different visual states. This is particularly useful for building design system components.

### Basic Variants

Variants allow you to define different styles based on props passed to your component:

```tsx
// Example usage
import { StyleSheet, View, Text } from '@utilitywarehouse/hearth-react-native';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant = 'primary', size = 'md', children }) => {
  styles.useVariants({ variant, size });

  return (
    <View style={styles.button}>
      <Text style={styles.text}>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  button: {
    // Base styles
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',

    variants: {
      variant: {
        primary: {
          backgroundColor: theme.color.purple[400],
          borderColor: theme.color.purple[700],
          borderWidth: 1,
        },
        secondary: {
          backgroundColor: theme.color.grey[100],
          borderColor: theme.color.grey[300],
          borderWidth: 1,
        },
        ghost: {
          backgroundColor: 'transparent',
        },
      },
      size: {
        sm: {
          paddingHorizontal: theme.space[3],
          paddingVertical: theme.space[2],
          minHeight: 32,
        },
        md: {
          paddingHorizontal: theme.space[4],
          paddingVertical: theme.space[3],
          minHeight: 40,
        },
        lg: {
          paddingHorizontal: theme.space[6],
          paddingVertical: theme.space[4],
          minHeight: 48,
        },
      },
    },
  },

  text: {
    fontFamily: theme.font.family.sans,
    fontWeight: theme.font.weight.medium,

    variants: {
      variant: {
        primary: {
          color: theme.color.white,
        },
        secondary: {
          color: theme.color.grey[700],
        },
        ghost: {
          color: theme.color.purple[700],
        },
      },
      size: {
        sm: {
          fontSize: theme.font.size.sm,
        },
        md: {
          fontSize: theme.font.size.base,
        },
        lg: {
          fontSize: theme.font.size.lg,
        },
      },
    },
  },
}));
```

### Boolean Variants

You can also use boolean values for simpler variant logic:

```tsx
// Example usage
interface AlertProps {
  message: string;
  isError?: boolean;
  isDismissible?: boolean;
}

const Alert: React.FC<AlertProps> = ({ message, isError = false, isDismissible = false }) => {
  styles.useVariants({ isError, isDismissible });

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      {isDismissible && <Text style={styles.closeButton}>×</Text>}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    padding: theme.space[4],
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    alignItems: 'center',

    variants: {
      isError: {
        true: {
          backgroundColor: theme.color.red[50],
          borderColor: theme.color.red[300],
          borderWidth: 1,
        },
        false: {
          backgroundColor: theme.color.blue[200],
          borderColor: theme.color.blue[200],
          borderWidth: 1,
        },
      },
      isDismissible: {
        true: {
          paddingRight: theme.space[6],
        },
      },
    },
  },

  message: {
    flex: 1,
    variants: {
      isError: {
        true: {
          color: theme.color.red[800],
        },
        false: {
          color: theme.color.blue[700],
        },
      },
    },
  },

  closeButton: {
    fontSize: theme.font.size.xl,
    fontWeight: theme.font.weight.bold,
    color: theme.color.grey[500],
  },
}));
```

Read more about [Unistyles Variants](https://www.unistyl.es/v3/references/variants) for more details on how to use variants effectively.

### Compound Variants

Compound variants allow you to apply specific styles when certain combinations of variants are active:

```tsx
// Example usage
interface BadgeProps {
  variant?: 'solid' | 'outline' | 'soft';
  color?: 'purple' | 'green' | 'red' | 'grey';
  size?: 'sm' | 'md' | 'lg';
  isInteractive?: boolean;
}

const Badge: React.FC<BadgeProps> = ({
  variant = 'solid',
  color = 'purple',
  size = 'md',
  isInteractive = false,
}) => {
  styles.useVariants({ variant, color, size, isInteractive });

  return (
    <View style={styles.badge}>
      <Text style={styles.text}>Badge</Text>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  badge: {
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',

    variants: {
      variant: {
        solid: {},
        outline: {
          borderWidth: 1,
        },
        soft: {},
      },
      color: {
        purple: {},
        green: {},
        red: {},
        grey: {},
      },
      size: {
        sm: {
          paddingHorizontal: theme.space[2],
          paddingVertical: theme.space[1],
        },
        md: {
          paddingHorizontal: theme.space[3],
          paddingVertical: theme.space[1.5],
        },
        lg: {
          paddingHorizontal: theme.space[4],
          paddingVertical: theme.space[2],
        },
      },
      isInteractive: {
        true: {
          // Base interactive styles will be enhanced by compound variants
        },
      },
    },

    // Compound variants for specific combinations
    compoundVariants: [
      // Solid variant colors
      {
        variant: 'solid',
        color: 'purple',
        styles: {
          backgroundColor: theme.color.purple[400],
        },
      },
      {
        variant: 'solid',
        color: 'green',
        styles: {
          backgroundColor: theme.color.green[500],
        },
      },
      {
        variant: 'solid',
        color: 'red',
        styles: {
          backgroundColor: theme.color.red[500],
        },
      },

      // Outline variant colors
      {
        variant: 'outline',
        color: 'purple',
        styles: {
          borderColor: theme.color.purple[400],
          backgroundColor: 'transparent',
        },
      },
      {
        variant: 'outline',
        color: 'green',
        styles: {
          borderColor: theme.color.green[500],
          backgroundColor: 'transparent',
        },
      },

      // Soft variant colors
      {
        variant: 'soft',
        color: 'purple',
        styles: {
          backgroundColor: theme.color.purple[100],
        },
      },
      {
        variant: 'soft',
        color: 'green',
        styles: {
          backgroundColor: theme.color.green[100],
        },
      },

      // Interactive states for solid variants
      {
        variant: 'solid',
        isInteractive: true,
        styles: {
          // Add shadow for interactive solid badges
          ...theme.shadow.sm,
        },
      },

      // Special case: Large interactive purple badges get extra emphasis
      {
        variant: 'solid',
        color: 'purple',
        size: 'lg',
        isInteractive: true,
        styles: {
          ...theme.shadow.md,
          transform: [{ scale: 1.02 }],
        },
      },
    ],
  },

  text: {
    fontFamily: theme.font.family.sans,
    fontWeight: theme.font.weight.medium,

    variants: {
      variant: {
        solid: {
          color: theme.color.white,
        },
        outline: {},
        soft: {},
      },
      color: {
        purple: {},
        green: {},
        red: {},
        grey: {},
      },
      size: {
        sm: {
          fontSize: theme.font.size.xs,
        },
        md: {
          fontSize: theme.font.size.sm,
        },
        lg: {
          fontSize: theme.font.size.base,
        },
      },
    },

    compoundVariants: [
      // Text colors for outline and soft variants
      {
        variant: 'outline',
        color: 'purple',
        styles: {
          color: theme.color.purple[700],
        },
      },
      {
        variant: 'soft',
        color: 'purple',
        styles: {
          color: theme.color.purple[700],
        },
      },
      {
        variant: 'outline',
        color: 'green',
        styles: {
          color: theme.color.green[600],
        },
      },
      {
        variant: 'soft',
        color: 'green',
        styles: {
          color: theme.color.green[700],
        },
      },
    ],
  },
}));
```

Read more about [Unistyles Compound Variants](https://www.unistyl.es/v3/references/compound-variants) for more details on how to use compound variants effectively.

### Default Variants

You can specify default variants that will be applied when no variant is explicitly set:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  button: {
    borderRadius: theme.borderRadius.md,

    variants: {
      variant: {
        primary: {
          backgroundColor: theme.color.purple[400],
        },
        secondary: {
          backgroundColor: theme.color.grey[100],
        },
        // Default variant
        default: {
          backgroundColor: theme.color.white,
          borderWidth: 1,
          borderColor: theme.color.grey[300],
        },
      },
    },
  },
}));

// Usage - will use default variant if no variant is specified
styles.useVariants({}); // Uses default variant
styles.useVariants({ variant: undefined }); // Uses default variant
```

Read more about [Unistyles Default Variants](https://www.unistyl.es/v3/references/variants#default-variant) for more details on how to use default variants effectively.

### Variants with Responsive Design

You can combine variants with responsive breakpoints:

```tsx
// Example usage
const styles = StyleSheet.create(theme => ({
  card: {
    borderRadius: theme.borderRadius.lg,

    variants: {
      spacing: {
        tight: {
          padding: {
            base: theme.space[2],
            md: theme.space[3],
          },
        },
        comfortable: {
          padding: {
            base: theme.space[4],
            md: theme.space[6],
          },
        },
        loose: {
          padding: {
            base: theme.space[6],
            md: theme.space[8],
          },
        },
      },
    },
  },
}));
```

Using variants and compound variants with Hearth React Native allows you to build flexible, maintainable component APIs that adapt to different use cases while maintaining consistency with your design system.

### 1. Always Use Theme Tokens

```tsx
// Example usage
// ✅ Good - Uses theme tokens
const styles = StyleSheet.create(theme => ({
  text: {
    color: theme.color.grey[700],
    fontSize: theme.font.size.md,
  },
}));

// ❌ Avoid - Hard-coded values
const styles = StyleSheet.create({
  text: {
    color: '#374151',
    fontSize: 16,
  },
});
```

### 2. Leverage Responsive Design

```tsx
// Example usage
// ✅ Good - Responsive design
const styles = StyleSheet.create(theme => ({
  container: {
    padding: {
      base: theme.space[4],
      md: theme.space[6],
      lg: theme.space[8],
    },
  },
}));
```

### 3. Use Semantic Color Names

```tsx
// Example usage
// ✅ Good - Semantic meaning
const styles = StyleSheet.create(theme => ({
  errorText: {
    color: theme.color.feedback.danger.default,
  },
  successBackground: {
    backgroundColor: theme.color.feedback.success.default,
  },
}));
```

### 4. Consistent Spacing

```tsx
// Example usage
// ✅ Good - Consistent spacing scale
const styles = StyleSheet.create(theme => ({
  card: {
    padding: theme.space[4],
    margin: theme.space[2],
    gap: theme.space[3],
  },
}));
```

By following these patterns and using the design tokens provided by Hearth React Native, you'll create consistent, maintainable, and accessible user interfaces that work seamlessly across different platforms and screen sizes.
