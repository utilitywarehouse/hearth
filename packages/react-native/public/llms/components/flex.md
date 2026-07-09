# Flex

When you need to center-align content, the Center component comes in handy. It is a layout component that can be used with other components to create complex layouts and positioning.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)

## Playground

```tsx
<Flex {...args}>
  {Array.from({ length: 4 }).map((_, index) => (
    <Box
      key={index}
      // @ts-expect-error - This is a playground
      bg={`grey${index + 1}00`}
      w={100 + index * 10}
      h={100 + index * 10}
      borderColor="strong"
      borderWidth="2"
      borderRadius="md"
    />
  ))}
</Flex>
```

## Usage

```jsx
import { Flex, BodyText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Flex spacing="lg">
    <BodyText>Spaced out text</BodyText>
    <BodyText>Spaced out text</BodyText>
    <BodyText>Flexed</BodyText>
    <BodyText>Spaced out text</BodyText>
    <BodyText>Spaced out text</BodyText>
  </Flex>
);
```

## Props

| Name        | Type                                                                                                    | Default      | Description                                |
| ----------- | ------------------------------------------------------------------------------------------------------- | ------------ | ------------------------------------------ |
| `direction` | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'`                                                | `column`     | The direction of the flex container.       |
| `wrap`      | `'wrap' \| 'nowrap' \| 'wrap-reverse'`                                                                  | `nowrap`     | The wrap of the flex container.            |
| `justify`   | `'flex-start' \| 'flex-end' \| 'center' \| `<br />`'space-between' \| 'space-around' \| 'space-evenly'` | `flex-start` | The justify content of the flex container. |
| `align`     | `'flex-start' \| 'flex-end' \| 'center' \| 'stretch' \| 'baseline'`                                     | `flex-start` | The align items of the flex container.     |
| `spacing`   | `'none' \| '2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                                      | `md`         | The space between the content.             |
