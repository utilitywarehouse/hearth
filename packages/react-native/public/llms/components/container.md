# Container

The Container component is a layout primitive that provides consistent spacing and structure using the design system's layout tokens. It automatically applies responsive margin and padding based on the current breakpoint, and supports additional customization through spacing props.

- [Playground](#playground)
- [Usage](#usage)
  - [Basic Usage](#basic-usage)
  - [With Custom Padding](#with-custom-padding)
  - [With Custom Margin](#with-custom-margin)
  - [With Custom Spacing](#with-custom-spacing)
- [Props](#props)
- [Design Tokens](#design-tokens)

## Playground

```tsx
// Example usage
<Box backgroundColor={color.red['100']}>
  <Container {...args} backgroundColor="secondary">
    <Box bg={color.blue['400']} p="200" borderRadius="md">
      <BodyText>Container content 1</BodyText>
    </Box>
    <Box bg={color.purple['400']} p="200" borderRadius="md">
      <BodyText>Container content 2</BodyText>
    </Box>
    <Box bg={color.piggyPink['300']} p="200" borderRadius="md">
      <BodyText>Container content 3</BodyText>
    </Box>
  </Container>
</Box>
```

### Basic Usage

The Container component uses layout tokens automatically for responsive spacing:

```jsx
// Example usage
import { Container, Box, BodyText } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Container>
    <Box bg={color.cyan['400']} p="200" borderRadius="md">
      <BodyText>Container content</BodyText>
    </Box>
  </Container>
);
```

### With Custom Padding

You can override the default padding with custom values using space tokens:

```tsx
// Example usage
<Box backgroundColor={color.red['100']}>
  <Container {...args} backgroundColor="secondary">
    <Box bg={color.blue['400']} p="200" borderRadius="md">
      <BodyText>Container with padding</BodyText>
    </Box>
  </Container>
</Box>
```

```jsx
// Example usage
import { Container, Box, BodyText } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Container padding="300">
    <Box bg={color.cyan['400']} p="200" borderRadius="md">
      <BodyText>Container with padding</BodyText>
    </Box>
  </Container>
);
```

### With Custom Margin

You can override the default margin with custom values using space tokens:

```tsx
// Example usage
<Box backgroundColor={color.red['100']}>
  <Container {...args} backgroundColor="secondary">
    <Box bg={color.blue['400']} p="200" borderRadius="md">
      <BodyText>Container with margin</BodyText>
    </Box>
  </Container>
</Box>
```

```jsx
// Example usage
import { Container, Box, BodyText } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Container margin="300">
    <Box bg={color.cyan['400']} p="200" borderRadius="md">
      <BodyText>Container with margin</BodyText>
    </Box>
  </Container>
);
```

### With Custom Spacing

The Container component supports a `spacing` prop for controlling gap between child elements, as well as directional padding and margin props:

```tsx
// Example usage
<Box backgroundColor={color.red['100']}>
  <Container {...args} backgroundColor="secondary">
    <Box bg={color.blue['400']} p="200" borderRadius="md">
      <BodyText>Item 1</BodyText>
    </Box>
    <Box bg={color.purple['400']} p="200" borderRadius="md">
      <BodyText>Item 2</BodyText>
    </Box>
    <Box bg={color.piggyPink['300']} p="200" borderRadius="md">
      <BodyText>Item 3</BodyText>
    </Box>
    <Box bg={color.orange['400']} p="200" borderRadius="md">
      <BodyText>Item 4</BodyText>
    </Box>
  </Container>
</Box>
```

```jsx
// Example usage
import { Container, Box, BodyText } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Container spacing="xl" paddingHorizontal="200" paddingVertical="300">
    <Box bg={color.cyan['400']} p="200" borderRadius="md">
      <BodyText>Item 1</BodyText>
    </Box>
    <Box bg={color.purple['400']} p="200" borderRadius="md">
      <BodyText>Item 2</BodyText>
    </Box>
    <Box bg={color.pink['400']} p="200" borderRadius="md">
      <BodyText>Item 3</BodyText>
    </Box>
  </Container>
);
```

## Props

The Container component supports spacing props similar to the Box component, with both long-form and shorthand syntax:

### Spacing Props

| Name                | Shorthand | Type         | Default | Description                              |
| ------------------- | --------- | ------------ | ------- | ---------------------------------------- |
| `padding`           | `p`       | `SpaceValue` | -       | The padding of the container.            |
| `paddingHorizontal` | `px`      | `SpaceValue` | -       | The horizontal padding of the container. |
| `paddingVertical`   | `py`      | `SpaceValue` | -       | The vertical padding of the container.   |
| `paddingTop`        | `pt`      | `SpaceValue` | -       | The top padding of the container.        |
| `paddingBottom`     | `pb`      | `SpaceValue` | -       | The bottom padding of the container.     |
| `paddingLeft`       | `pl`      | `SpaceValue` | -       | The left padding of the container.       |
| `paddingRight`      | `pr`      | `SpaceValue` | -       | The right padding of the container.      |
| `margin`            | `m`       | `SpaceValue` | -       | The margin of the container.             |
| `marginHorizontal`  | `mx`      | `SpaceValue` | -       | The horizontal margin of the container.  |
| `marginVertical`    | `my`      | `SpaceValue` | -       | The vertical margin of the container.    |
| `marginTop`         | `mt`      | `SpaceValue` | -       | The top margin of the container.         |
| `marginBottom`      | `mb`      | `SpaceValue` | -       | The bottom margin of the container.      |
| `marginLeft`        | `ml`      | `SpaceValue` | -       | The left margin of the container.        |
| `marginRight`       | `mr`      | `SpaceValue` | -       | The right margin of the container.       |

## Design Tokens

The Container component uses the following layout tokens from the design system:

### Mobile (320px - 740px)

- **Margin Horizontal**: 16px
- **Padding Top**: 24px
- **Padding Bottom**: 32px

### Tablet (740px - 992px)

- **Margin Horizontal**: 32px
- **Padding Top**: 24px
- **Padding Bottom**: 32px

### Desktop (992px+)

- **Margin Horizontal**: 32px
- **Padding Top**: 32px
- **Padding Bottom**: 48px

These values are automatically applied based on the current breakpoint. You can override them using the padding and margin props.

### Space Tokens

For the `padding`, `margin`, and directional spacing props, you can use any of the following space token values:

`'0'`, `'25'`, `'50'`, `'75'`, `'100'`, `'150'`, `'175'`, `'200'`, `'250'`, `'300'`, `'350'`, `'400'`, `'500'`, `'600'`, `'700'`, `'800'`, `'900'`, `'1000'`

These correspond to pixel values: 0px, 2px, 4px, 6px, 8px, 12px, 14px, 16px, 20px, 24px, 28px, 32px, 40px, 48px, 56px, 64px, 72px, 80px respectively.
