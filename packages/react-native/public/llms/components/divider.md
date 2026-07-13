# Divider

`Divider` components in `hearth-react-native` enhances visual organisation by creating clear boundaries between sections, improving readability and content grouping. They reinforce the visual hierarchy, making it easier for users to understand relationships between elements.

- [When to use](#when-to-use)
- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)

## When to use

The `Divider` is typically used to create a separation or divide between content or sections on a page.

Dividers can help establish a visual hierarchy on your designs. They can indicate which content is related or grouped together and which content is separate.

## Playground

```tsx
// Example usage
<Box
  minWidth={args.orientation === 'horizontal' ? 200 : 1}
  minHeight={args.orientation === 'horizontal' ? 1 : 30}
>
  <Divider {...args} />
</Box>
```

## Usage

```tsx
// Example usage
import { Spinner, Center } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Center>
    <BodyText>This text is divided</BodyText>
    <Divider spacing="sm" />
    <BodyText>From this text</BodyText>
  </Center>
);
```

## Props

| Property      | Type                                             | Description                                                                                                                                                                                         | Default        |
| ------------- | ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------- |
| `orientation` | `'horizontal' \| 'vertical'`                     | The orientation of the Divider.                                                                                                                                                                     | `'horizontal'` |
| `color`       | `string`                                         | The color of the spinner.                                                                                                                                                                           | `-`            |
| `spacing`     | `'none' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl'` | The space between the Divider items.                                                                                                                                                                | `none`         |
| `width`       | `number`                                         | The width of the Divider.                                                                                                                                                                           | `100%`         |
| `height`      | `number`                                         | The height of the Divider.                                                                                                                                                                          | `100%`         |
| `flexItem`    | `boolean`                                        | If true, a vertical divider will have the correct height when used in flex container. (By default, a vertical divider will have a calculated height of 0px if it is the child of a flex container.) | false          |
