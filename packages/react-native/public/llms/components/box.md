# Box

When you need to center-align content, the Center component comes in handy. It is a layout component that can be used with other components to create complex layouts and positioning.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)

## Playground

```tsx
<Box {...args}>
  <BodyText>{args.children}</BodyText>
</Box>
```

## Usage

```jsx
import { Center, BodyText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Box backgroundColor={color.green[400]} width={300} height={200} padding="200">
    <BodyText color="inverted">Box.</BodyText>
  </Box>
);
```

## Props

The Box component accepts all the props that can be used on a React Native View component,
as well as any of the [View Style Props](https://reactnative.dev/docs/view-style-props) and [Layout Props](https://reactnative.dev/docs/layout-props) that are available in the React Native API
as well as the following additional props:

| Name    | Type              | Default | Description                                  |
| ------- | ----------------- | ------- | -------------------------------------------- |
| bg      | string            | -       | The background color of the Box component.   |
| bgColor | string            | -       | The background color of the Box component.   |
| h       | number            | -       | The height of the Box component.             |
| w       | number            | -       | The width of the Box component.              |
| p       | number            | -       | The padding of the Box component.            |
| px      | number            | -       | The horizontal padding of the Box component. |
| py      | number            | -       | The vertical padding of the Box component.   |
| pt      | number            | -       | The top padding of the Box component.        |
| pb      | number            | -       | The bottom padding of the Box component.     |
| pr      | number            | -       | The right padding of the Box component.      |
| pl      | number            | -       | The left padding of the Box component.       |
| m       | number            | -       | The margin of the Box component.             |
| mx      | number            | -       | The horizontal margin of the Box component.  |
| my      | number            | -       | The vertical margin of the Box component.    |
| mt      | number            | -       | The top margin of the Box component.         |
| mb      | number            | -       | The bottom margin of the Box component.      |
| mr      | number            | -       | The right margin of the Box component.       |
| ml      | number            | -       | The left margin of the Box component.        |
| rounded | number            | -       | The border radius of the Box component.      |
| as      | React.ElementType | -       | The component to render the Box as.          |

For more information about the utility props you can use on the Box component, see the
React Native View Style Props [documentation](https://reactnative.dev/docs/view-style-props)
and Layout Props [documentation](https://reactnative.dev/docs/layout-props).
