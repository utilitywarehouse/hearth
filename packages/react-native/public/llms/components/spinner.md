# Spinner

Using a Spinner is a common method for indicating that an asynchronous process is ongoing. Additionally, it informs users that they should refrain from clicking or tapping the UI until the loading state has been resolved.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Sizes](#sizes)

## Playground

```tsx
<Spinner size="md" />
```

## Usage

The Spinner can be used independently (it's a self-contained component) or in conjunction with other components,
such as in the loading state of a `Button` or `Input` Search retrieving data. It can also be used inside a `Dialog`
with text, or directly in a container on the screen when we want the user to wait and avoid performing any actions.

```jsx
import { Spinner, Center } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';

const MyComponent = () => (
  <Center>
    <Spinner size="lg" color={color.blue['400']} />
  </Center>
);
```

## Props

| Property | Type                          | Description               | Default |
| -------- | ----------------------------- | ------------------------- | ------- |
| `size`   | `'xs' \|'sm' \| 'md' \| 'lg'` | The size of the spinner.  | `md`    |
| `color`  | `string`                      | The color of the spinner. |         |

## Sizes

The `Spinner` component has different sizes to style the spinner.

```tsx
<Box gap="200">
  <VariantTitle title="XS">
    <Spinner {...args} size="xs" />
  </VariantTitle>
  <VariantTitle title="SM">
    <Spinner {...args} size="sm" />
  </VariantTitle>
  <VariantTitle title="MD">
    <Spinner {...args} size="md" />
  </VariantTitle>
  <VariantTitle title="LG">
    <Spinner {...args} size="lg" />
  </VariantTitle>
</Box>
```
