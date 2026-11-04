# Segmented Control

Segmented Control lets users switch between a small set of related options.
Each option is presented as an equal-priority segment in a single horizontal group.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
  - [Sizes](#sizes)
  - [Icons](#icons)
  - [Full width](#full-width)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<View style={{ width: 320 }}>
  <SegmentedControl defaultValue="day" {...args}>
    <SegmentedControlOption value="day">Day</SegmentedControlOption>
    <SegmentedControlOption value="week">Week</SegmentedControlOption>
    <SegmentedControlOption value="month">Month</SegmentedControlOption>
  </SegmentedControl>
</View>
```

## Usage

```tsx
// Example usage
import { SegmentedControl, SegmentedControlOption } from '@utilitywarehouse/hearth-react-native';

const Example = () => {
  return (
    <SegmentedControl defaultValue="day">
      <SegmentedControlOption value="day">Day</SegmentedControlOption>
      <SegmentedControlOption value="week">Week</SegmentedControlOption>
      <SegmentedControlOption value="month">Month</SegmentedControlOption>
    </SegmentedControl>
  );
};
```

### SegmentedControl

| Property        | Type                      | Description                                          | Default      |
| --------------- | ------------------------- | ---------------------------------------------------- | ------------ |
| `value`         | `string`                  | Controlled selected option value.                    | -            |
| `defaultValue`  | `string`                  | Initial selected value (uncontrolled).               | first option |
| `onValueChange` | `(value: string) => void` | Called when selected option changes.                 | -            |
| `size`          | `'sm' \| 'md'`            | Size variant (`SM-32` / `MD-48`).                    | `'sm'`       |
| `disabled`      | `boolean`                 | Disables all options in the group.                   | `false`      |
| `fullWidth`     | `boolean`                 | Fills the container width; options share it equally. | `false`      |
| `children`      | `ReactNode`               | `SegmentedControlOption` children.                   | required     |

### SegmentedControlOption

| Property   | Type            | Description                    | Default  |
| ---------- | --------------- | ------------------------------ | -------- |
| `value`    | `string`        | Unique value for this segment. | required |
| `children` | `ReactNode`     | Option label/content.          | required |
| `icon`     | `ComponentType` | Optional leading icon.         | -        |
| `disabled` | `boolean`       | Disables only this option.     | `false`  |

### Sizes

Figma defines two size variants for Segmented Control:

- `sm` maps to `SM-32`
- `md` maps to `MD-48`

```tsx
// Example usage
<Flex spacing="sm" align="center">
  <SegmentedControl defaultValue="one" size="sm">
    <SegmentedControlOption value="one">Label</SegmentedControlOption>
    <SegmentedControlOption value="two">Label</SegmentedControlOption>
    <SegmentedControlOption value="three">Label</SegmentedControlOption>
  </SegmentedControl>
  <SegmentedControl defaultValue="one" size="md">
    <SegmentedControlOption value="one">Label</SegmentedControlOption>
    <SegmentedControlOption value="two">Label</SegmentedControlOption>
    <SegmentedControlOption value="three">Label</SegmentedControlOption>
  </SegmentedControl>
</Flex>
```

```tsx
// Example usage
<SegmentedControl size="sm">...</SegmentedControl>
<SegmentedControl size="md">...</SegmentedControl>
```

### Icons

SegmentedControlOption supports an optional leading icon.

```tsx
// Example usage
<SegmentedControl defaultValue="energy" size="md">
  <SegmentedControlOption value="energy" icon={ElectricitySmallIcon}>
    Energy
  </SegmentedControlOption>
  <SegmentedControlOption value="broadband" icon={BroadbandSmallIcon}>
    Broadband
  </SegmentedControlOption>
  <SegmentedControlOption value="mobile" icon={MobileSmallIcon}>
    Mobile
  </SegmentedControlOption>
</SegmentedControl>
```

```tsx
// Example usage
import { MobileSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

<SegmentedControl>
  <SegmentedControlOption value="mobile" icon={MobileSmallIcon}>
    Mobile
  </SegmentedControlOption>
  ...
</SegmentedControl>;
```

### Full width

Use `fullWidth` to make the control fill the width of its container. Options share the width equally.

```tsx
// Example usage
<View>
  <Flex spacing="sm">
    <SegmentedControl defaultValue="one" size="sm">
      <SegmentedControlOption value="one">Label</SegmentedControlOption>
      <SegmentedControlOption value="two">Label</SegmentedControlOption>
      <SegmentedControlOption value="three">Label</SegmentedControlOption>
    </SegmentedControl>
    <SegmentedControl defaultValue="one" size="sm" fullWidth>
      <SegmentedControlOption value="one">Label</SegmentedControlOption>
      <SegmentedControlOption value="two">Label</SegmentedControlOption>
      <SegmentedControlOption value="three">Label</SegmentedControlOption>
    </SegmentedControl>
    <SegmentedControl defaultValue="one" size="md">
      <SegmentedControlOption value="one">Label</SegmentedControlOption>
      <SegmentedControlOption value="two">Label</SegmentedControlOption>
      <SegmentedControlOption value="three">Label</SegmentedControlOption>
    </SegmentedControl>
    <SegmentedControl defaultValue="one" size="md" fullWidth>
      <SegmentedControlOption value="one">Label</SegmentedControlOption>
      <SegmentedControlOption value="two">Label</SegmentedControlOption>
      <SegmentedControlOption value="three">Label</SegmentedControlOption>
    </SegmentedControl>
  </Flex>
</View>
```

```tsx
// Example usage
<SegmentedControl fullWidth>...</SegmentedControl>
```

## Accessibility

SegmentedControl uses radio semantics so assistive technologies can understand it as a single-choice group.

- SegmentedControl root uses `accessibilityRole="radiogroup"`.
- Each SegmentedControlOption uses `accessibilityRole="radio"`.
- Option state is communicated with `accessibilityState={{ checked, disabled }}`.
- If `accessibilityLabel` is not provided on an option, the component falls back to the option text content and then to the option `value`.
