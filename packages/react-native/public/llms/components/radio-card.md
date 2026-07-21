# Radio Card

The `RadioCard` component is a UI element that allows users to select one option from a set of predefined choices.
It is commonly used in forms or surveys where only one selection is allowed. The `RadioCard` can be grouped together
with other `RadioCard`s to create a `RadioCardGroup`, providing a cohesive and organised way to present multiple options.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)

## Playground

```tsx
// Example usage
<RadioCardGroup {...args}>
  <RadioCard aria-label="Label 1" label="Option 1" value="Option 1" nativeID="RadioCard-1">
    <BodyText>Additional content</BodyText>
  </RadioCard>
  <RadioCard aria-label="Label 2" label="Option 2" value="Option 2" nativeID="RadioCard-2">
    <BodyText>Additional content</BodyText>
  </RadioCard>
  <RadioCard aria-label="Label 3" label="Option 3" value="Option 3" nativeID="RadioCard-3">
    <BodyText>Additional content</BodyText>
  </RadioCard>
</RadioCardGroup>
```

## Usage

```tsx
// Example usage
import { RadioCard, RadioCardGroup, UL, LI } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [value, setValue] = React.useState('Option 1');
  return (
    <RadioCardGroup
      aria-label="Select Tariff"
      value={value}
      onValueChange={setValue}
      nativeID="RadioCard-group"
    >
      <RadioCard value="fixed" aria-label="Debit Card Payment" label="Debit card payment">
        <UL>
          <LI>5 free top-ups per month</LI>
          <LI>£0.35 per additional top-up</LI>
        </UL>
      </RadioCard>
      <RadioCard value="variable" aria-label="Instant bank transfer" label="Instant bank transfer">
        <UL>
          <LI>Unlimited free top-ups</LI>
          <LI>Instant withdrawals</LI>
          <LI>Extra layer of security</LI>
        </UL>
      </RadioCard>
    </RadioCardGroup>
  );
};
```

## Props

The `RadioCard` component accepts the following props:

| Property         | Type                                                                                                    | Default  | Description                                                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `value`          | string                                                                                                  | -        | The value to be used in the radio card input. This is the value that will be returned on form submission. |
| `onChange`       | `(isSelected: boolean) => void`                                                                         | -        | Function called when the state of the radio card changes.                                                 |
| `children`       | `React.ReactNode`                                                                                       | -        | The content to be displayed inside the radio card.                                                        |
| `label`          | `string`                                                                                                | -        | The label to be displayed next to the radio card.                                                         |
| `labelVariant`   | `'heading' \| 'body'`                                                                                   | `'body'` | The variant of the label text.                                                                            |
| `flexDirection`  | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'`                                                | -        | Sets the direction of the flex items.                                                                     |
| `flexWrap`       | `'wrap' \| 'nowrap' \| 'wrap-reverse'`                                                                  | -        | Sets whether flex items are forced onto one line or can wrap.                                             |
| `alignItems`     | `'flex-start' \| 'flex-end' \| 'center' \|`<br />` 'stretch' \| 'baseline'`                             | -        | Sets the alignment of flex items on the cross axis.                                                       |
| `justifyContent` | `'flex-start' \| 'flex-end' \| 'center' \|`<br />` 'space-between' \| 'space-around' \| 'space-evenly'` | -        | Sets the alignment of flex items on the main axis.                                                        |

### `RadioCard`

Contains all RadioCard related layout style props and actions. It inherits all the properties of React Native's [`Pressable` component](https://reactnative.dev/docs/pressable) and [`View` component](https://reactnative.dev/docs/view) styles for layout.

### `RadioCardGroup`

Contains all Group related layout style props and actions. It inherits all the properties of React Native's [View component](https://reactnative.dev/docs/view).

| Property         | Type                                                                                                     | Default  | Description                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------- | -------- | ---------------------------------------------------------------------------------------------------------- |
| `value`          | `string`                                                                                                 | -        | The value of the currently selected `RadioCard`.                                                           |
| `onValueChange`  | `(value: string) => void`                                                                                | -        | Callback fired when the selected `RadioCard` changes.                                                      |
| `onChange`       | `(value: string) => void`                                                                                | -        | **Deprecated** — use `onValueChange` instead.                                                              |
| `gap`            | `keyof typeof space`                                                                                     | -        | The gap between the `RadioCard` items.                                                                     |
| `columns`        | `GridProps['columns']`                                                                                   | -        | If set, the group will use a grid layout with the specified number of columns. Otherwise, it uses flexbox. |
| `disabled`       | `boolean`                                                                                                | -        | If `true`, disables all `RadioCard`s in the group.                                                         |
| `flexDirection`  | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'`                                                 | `'row'`  | (Flexbox only) Sets the direction of the flex items.                                                       |
| `flexWrap`       | `'wrap' \| 'nowrap' \| 'wrap-reverse'`                                                                   | `'wrap'` | (Flexbox only) Sets whether flex items are forced onto one line or can wrap.                               |
| `alignItems`     | `'flex-start' \| 'flex-end' \| 'center' \| `<br />`'stretch' \| 'baseline'`                              | -        | (Flexbox only) Sets the alignment of flex items on the cross axis.                                         |
| `justifyContent` | `'flex-start' \| 'flex-end' \| 'center' \| `<br /> `'space-between' \| 'space-around' \| 'space-evenly'` | -        | (Flexbox only) Sets the alignment of flex items on the main axis.                                          |
