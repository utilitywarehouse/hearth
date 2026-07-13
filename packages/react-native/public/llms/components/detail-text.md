# DetailText

The `DetailText` component gives you the ability to create text for your screen. It can be used to display detail text in different sizes and styles.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Sizes](#sizes)

## Playground

```tsx
// Example usage
<DetailText size="md" textDecorationColor="grey1000">
  Hello there, I'm some detail text!
</DetailText>
```

## Usage

```jsx
// Example usage
import { DetailText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <DetailText>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
    labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
    laboris nisi ut aliquip ex ea commodo consequat.
  </DetailText>
);
```

## Props

| Property              | Type                                                                  | Description                         | Default      |
| --------------------- | --------------------------------------------------------------------- | ----------------------------------- | ------------ |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'`             | The size of the text.               | `'md'`       |
| `strikeThrough`       | `boolean`                                                             | Strike through the text.            | `false`      |
| `truncated`           | `boolean`                                                             | Truncate the text with an ellipsis. | `false`      |
| `underline`           | `boolean`                                                             | Underline the text.                 | `false`      |
| `italic`              | `boolean`                                                             | Italicise the text.                 | `false`      |
| `color`               | `string`                                                              | The color of the text.              | `'grey1000'` |
| `textAlign`           | `'left' \| 'center' \| 'right' \| 'auto' \| 'justify'`                | The alignment of the text.          | `-`          |
| `textTransform`       | `'none' \| 'capitalize' \| 'uppercase' \| 'lowercase'`                | Transform the text.                 | `-`          |
| `textDecorationLine`  | `'none' \| 'underline' \| 'line-through' \| 'underline line-through'` | The decoration of the text.         | `-`          |
| `textDecorationStyle` | `'solid' \| 'double' \| 'dotted' \| 'dashed'`                         | The style of the text decoration.   | `-`          |
| `textDecorationColor` | `string`                                                              | The color of the text decoration.   | `-`          |
| `userSelect`          | `'none' \| 'auto' \| 'text' \| 'all' \| 'contain'`                    | The user select behaviour.          | `-`          |
| `inverted`            | `boolean`                                                             | Invert the text color.              | `false`      |

## Sizes

The `DetailText` component has different sizes to style the text.

```tsx
// Example usage
<Box gap="200">
  <VariantTitle title="SM">
    <DetailText {...args} size="sm">
      Hello there, I'm some detail text!
    </DetailText>
  </VariantTitle>
  <VariantTitle title="MD">
    <DetailText {...args} size="md">
      Hello there, I'm some detail text!
    </DetailText>
  </VariantTitle>
  <VariantTitle title="LG">
    <DetailText {...args} size="lg">
      Hello there, I'm some detail text!
    </DetailText>
  </VariantTitle>
  <VariantTitle title="XL">
    <DetailText {...args} size="xl">
      Hello there, I'm some detail text!
    </DetailText>
  </VariantTitle>
  <VariantTitle title="2XL">
    <DetailText {...args} size="2xl">
      Hello there, I'm some detail text!
    </DetailText>
  </VariantTitle>
  <VariantTitle title="3XL">
    <DetailText {...args} size="3xl">
      Hello there, I'm some detail text!
    </DetailText>
  </VariantTitle>
  <VariantTitle title="4XL">
    <DetailText {...args} size="4xl">
      Hello there, I'm some detail text!
    </DetailText>
  </VariantTitle>
</Box>
```
