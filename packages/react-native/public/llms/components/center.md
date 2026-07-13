# Center

When you need to center-align content, the Center component comes in handy. It is a layout component that can be used with other components to create complex layouts and positioning.

- [Usage](#usage)
- [Props](#props)

## Usage

```jsx
// Example usage
import { Center, BodyText } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Center backgroundColor={color.red[400]} width={300} height={200} padding="200">
    <BodyText color="inverted">It's hard being in the middle of everything.</BodyText>
  </Center>
);
```

## Props

The `Center` component extends the `Box` component, so it has all the same props as `Box`.
