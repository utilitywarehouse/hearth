# Roundel

The `Roundel` component is a compact status indicator with success, pending, and error variants.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)

## Playground

```tsx
// Example usage
<Roundel {...args} />
```

## Usage

```tsx
// Example usage
import { Roundel } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Roundel variant="success" />;
```

## Props

| Prop      | Type                                | Default     | Description                              |
| --------- | ----------------------------------- | ----------- | ---------------------------------------- |
| `variant` | `'success' \| 'pending' \| 'error'` | `'success'` | Sets the status styling for the roundel. |
| `...View` | React Native `ViewProps`            | -           | Any additional View props.               |

## Examples

```tsx
// Example usage
<Flex direction="column" spacing="md" alignItems="center">
  <VariantTitle title="Success">
    <Roundel variant="success" />
  </VariantTitle>
  <VariantTitle title="Pending">
    <Roundel variant="pending" />
  </VariantTitle>
  <VariantTitle title="Error">
    <Roundel variant="error" />
  </VariantTitle>
</Flex>
```
