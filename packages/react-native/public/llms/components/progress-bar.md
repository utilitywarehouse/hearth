# Progress Bar

Progress bars communicate task completion for linear flows and bounded operations. Use the linear variant for
inline layouts and the circular variant when space is tighter or when progress needs more emphasis.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Variants](#variants)
- [Circular Sizes](#circular-sizes)
- [Examples](#examples)
  - [Custom Value Labels](#custom-value-labels)

## Playground

```tsx
<ProgressBar
  variant="linear"
  colorScheme="default"
  size="md"
  value={35}
  min={0}
  max={100}
  label="Progress"
/>
```

## Usage

```tsx
import { ProgressBar } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <ProgressBar value={42} label="Uploading documents" />;
```

## Props

| Property          | Type                                                                                      | Description                                              | Default   |
| ----------------- | ----------------------------------------------------------------------------------------- | -------------------------------------------------------- | --------- |
| `variant`         | `'linear' \| 'circular'`                                                                  | The progress bar variant.                                | `linear`  |
| `colorScheme`     | `'default' \| 'success' \| 'danger'`                                                      | The color scheme for the progress indicator.             | `default` |
| `size`            | `'sm' \| 'md'`                                                                            | Circular size. Only applies to the circular variant.     | `md`      |
| `value`           | `number`                                                                                  | Current progress value.                                  |           |
| `min`             | `number`                                                                                  | Minimum value.                                           | `0`       |
| `max`             | `number`                                                                                  | Maximum value.                                           | `100`     |
| `label`           | `string`                                                                                  | Accessible label for the progress bar.                   |           |
| `hideLabel`       | `boolean`                                                                                 | Visually hide the label and value text.                  | `false`   |
| `formatValueText` | `(value: number, meta: { min: number; `<br />` max: number; percent: number }) => string` | Override the default percentage label.                   |           |
| `aria-valuetext`  | `string`                                                                                  | A human-readable text alternative for the current value. |           |

## Variants

```tsx
<Box gap="300" style={{ width: 260 }}>
  <VariantTitle title="Linear">
    <ProgressBar {...args} variant="linear" />
  </VariantTitle>
  <VariantTitle title="Circular">
    <ProgressBar {...args} variant="circular" />
  </VariantTitle>
</Box>
```

## Circular Sizes

```tsx
<Box gap="300">
  <VariantTitle title="Small">
    <ProgressBar {...args} size="sm" />
  </VariantTitle>
  <VariantTitle title="Medium">
    <ProgressBar {...args} size="md" />
  </VariantTitle>
</Box>
```

### Custom Value Labels

Use `formatValueText` to show values that are not percentages, such as remaining data allowance.

```tsx
<Box style={{ width: 260 }}>
  <ProgressBar {...args} />
</Box>
```

```tsx
import { ProgressBar } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <ProgressBar
    value={68}
    max={100}
    label="Data allowance"
    formatValueText={(value, { max }) => `${max - value}GB remaining`}
  />
);
```
