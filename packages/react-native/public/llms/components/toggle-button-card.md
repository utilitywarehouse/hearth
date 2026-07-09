# Toggle Button Card

The `ToggleButtonCard` component is a UI element that allows users to select one option from a set of predefined choices.
It is commonly used in forms or surveys where only one selection is allowed. The `ToggleButtonCard` can be grouped together
with other `ToggleButtonCard`s to create a `ToggleButtonCardGroup`, providing a cohesive and organised way to present multiple options.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)

## Playground

```tsx
<ToggleButtonCardGroup {...args}>
  <ToggleButtonCard
    aria-label="Label 1"
    label="Option 1"
    value="Option 1"
    nativeID="ToggleButtonCard-1"
  >
    <BodyText>Additional content for option</BodyText>
  </ToggleButtonCard>
  <ToggleButtonCard
    aria-label="Label 2"
    label="Option 2 "
    value="Option 2"
    nativeID="ToggleButtonCard-2"
  >
    <BodyText>Additional content for option</BodyText>
  </ToggleButtonCard>
  <ToggleButtonCard
    aria-label="Label 3"
    label="Option 3"
    value="Option 3"
    nativeID="ToggleButtonCard-3"
  >
    <BodyText>Additional content for option</BodyText>
  </ToggleButtonCard>
</ToggleButtonCardGroup>
```

## Usage

```tsx
import {
  ToggleButtonCard,
  ToggleButtonCardGroup,
  Box,
  Heading,
  BodyText,
  DetailText,
} from '@utilitywarehouse/native-ui';

const MyComponent = () => {
  const [value, setValue] = React.useState('Option 1');
  return (
    <ToggleButtonCardGroup
      aria-label="Select Tariff"
      value={value}
      onChange={setValue}
      nativeID="ToggleButtonCard-group"
    >
      <ToggleButtonCard value="fixed" aria-label="Fixed Tariff" label="Select tariff" gap="200">
        <Heading size="md">Fixed</Heading>
        <Box flexDirection="row" alignItems="center" gap="100">
          <DetailText size="3xl">£163.00</DetailText>
          <BodyText color="grey500"> monthly estimate</BodyText>
        </Box>
        <BodyText>Your energy rates will stay the same until December 2025</BodyText>
      </ToggleButtonCard>
      <ToggleButtonCard
        value="variable"
        aria-label="Variable Tariff"
        label="Select tariff"
        gap="200"
      >
        <Heading size="md">Variable</Heading>
        <Box flexDirection="row" alignItems="center" gap="100">
          <DetailText size="3xl">£153.00</DetailText>
          <BodyText color="grey500"> monthly estimate</BodyText>
        </Box>
        <BodyText>Your energy rates will stay the same until December 2025</BodyText>
      </ToggleButtonCard>
    </ToggleButtonCardGroup>
  );
};
```

## Props

The `ToggleButtonCard` component accepts the following props:

| Property         | Type                                                                                                    | Default | Description                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `value`          | string                                                                                                  | -       | The value to be used in the toggle button input. This is the value that will be returned on form submission. |
| `onChange`       | `(isSelected: boolean) => void`                                                                         | -       | Function called when the state of the toggle button changes.                                                 |
| `children`       | `React.ReactNode`                                                                                       | -       | The content to be displayed inside the toggle button.                                                        |
| `label`          | `string`                                                                                                | -       | The label to be displayed next to the toggle button.                                                         |
| `flexDirection`  | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'`                                                | -       | Sets the direction of the flex items.                                                                        |
| `flexWrap`       | `'wrap' \| 'nowrap' \| 'wrap-reverse'`                                                                  | -       | Sets whether flex items are forced onto one line or can wrap.                                                |
| `alignItems`     | `'flex-start' \| 'flex-end' \| 'center' \|`<br />` 'stretch' \| 'baseline'`                             | -       | Sets the alignment of flex items on the cross axis.                                                          |
| `justifyContent` | `'flex-start' \| 'flex-end' \| 'center' \|`<br />` 'space-between' \| 'space-around' \| 'space-evenly'` | -       | Sets the alignment of flex items on the main axis.                                                           |

### `ToggleButtonCard`

Contains all ToggleButtonCard related layout style props and actions. It inherits all the properties of React Native's [`Pressable` component](https://reactnative.dev/docs/pressable) and [`View` component](https://reactnative.dev/docs/view) styles for layout.

### `ToggleButtonCardGroup`

Contains all Group related layout style props and actions. It inherits all the properties of React Native's [View component](https://reactnative.dev/docs/view).

| Property         | Type                                                                                                     | Default | Description                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------- |
| `value`          | `string`                                                                                                 | -       | The value of the currently selected `ToggleButtonCard`.                                                    |
| `onChange`       | `(value: string) => void`                                                                                | -       | Callback fired when the selected `ToggleButtonCard` changes.                                               |
| `gap`            | `keyof typeof space`                                                                                     | -       | The gap between the `ToggleButtonCard` items.                                                              |
| `columns`        | `GridProps['columns']`                                                                                   | -       | If set, the group will use a grid layout with the specified number of columns. Otherwise, it uses flexbox. |
| `flexDirection`  | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'`                                                 | `row`   | (Flexbox only) Sets the direction of the flex items.                                                       |
| `flexWrap`       | `'wrap' \| 'nowrap' \| 'wrap-reverse'`                                                                   | `wrap`  | (Flexbox only) Sets whether flex items are forced onto one line or can wrap.                               |
| `alignItems`     | `'flex-start' \| 'flex-end' \| 'center' \| `<br />`'stretch' \| 'baseline'`                              | -       | (Flexbox only) Sets the alignment of flex items on the cross axis.                                         |
| `justifyContent` | `'flex-start' \| 'flex-end' \| 'center' \| `<br /> `'space-between' \| 'space-around' \| 'space-evenly'` | -       | (Flexbox only) Sets the alignment of flex items on the main axis.                                          |
