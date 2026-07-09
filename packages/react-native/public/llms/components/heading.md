# Heading

The `Heading` component gives you the ability to create headings for your screen with different sizes.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Sizes](#sizes)
- [Accessibility](#accessibility)

## Playground

```tsx
<Heading size="md" textDecorationColor="grey1000">
  Hello there, I'm a heading!
</Heading>
```

## Usage

```jsx
import { Heading } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Heading>Welcome to Utility Warehouse</Heading>;
```

## Props

| Property              | Type                                                                  | Description                         | Default      |
| --------------------- | --------------------------------------------------------------------- | ----------------------------------- | ------------ |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'`             | The size of the text.               | `'md'`       |
| `strikeThrough`       | `boolean`                                                             | Strike through the text.            | `false`      |
| `truncated`           | `boolean`                                                             | Truncate the text with an ellipsis. | `false`      |
| `underline`           | `boolean`                                                             | Underline the text.                 | `false`      |
| `color`               | `string`                                                              | The color of the text.              | `'grey1000'` |
| `textAlign`           | `'left' \| 'center' \| 'right' \| 'auto' \| 'justify'`                | The alignment of the text.          | `-`          |
| `textTransform`       | `'none' \| 'capitalize' \| 'uppercase' \| 'lowercase'`                | Transform the text.                 | `-`          |
| `textDecorationLine`  | `'none' \| 'underline' \| 'line-through' \| 'underline line-through'` | The decoration of the text.         | `-`          |
| `textDecorationStyle` | `'solid' \| 'double' \| 'dotted' \| 'dashed'`                         | The style of the text decoration.   | `-`          |
| `textDecorationColor` | `string`                                                              | The color of the text decoration.   | `-`          |
| `userSelect`          | `'none' \| 'auto' \| 'text' \| 'all' \| 'contain'`                    | The user select behaviour.          | `-`          |
| `inverted`            | `boolean`                                                             | Invert the text color.              | `false`      |

## Sizes

The `Heading` component has different sizes to style the text.

```tsx
<Box gap="200">
  <VariantTitle title="SM">
    <Heading {...args} size="sm">
      Hello there, I'm a heading!
    </Heading>
  </VariantTitle>
  <VariantTitle title="MD">
    <Heading {...args} size="md">
      Hello there, I'm a heading!
    </Heading>
  </VariantTitle>
  <VariantTitle title="LG">
    <Heading {...args} size="lg">
      Hello there, I'm a heading!
    </Heading>
  </VariantTitle>
  <VariantTitle title="XL">
    <Heading {...args} size="xl">
      Hello there, I'm a heading!
    </Heading>
  </VariantTitle>
</Box>
```

## Accessibility

`Heading` sets `accessibilityRole="header"` by default, so VoiceOver and TalkBack can announce it as a heading without any extra configuration.
If you need to override this behavior, pass an explicit `accessibilityRole` prop (for example, `accessibilityRole="text"`) to opt out of heading semantics.

- Use `Heading` for actual screen or section titles so assistive technologies can expose the right document structure.
- If you need styled text without heading semantics, either override the `accessibilityRole` on `Heading` or use one of the other text components instead.
