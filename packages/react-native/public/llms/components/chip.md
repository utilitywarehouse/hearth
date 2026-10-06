# Chip

Use `Chip` to represent an input, attribute, or filter that a user can remove with a single press. It is commonly used to show the active filters applied to a list of results. Use `ChipGroup` to lay out a collection of Chips.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<Chip>Label</Chip>
```

## Usage

Render a Chip for each active selection, and remove it from your state when the user presses it.

```tsx
// Example usage
import { Chip, ChipGroup } from '@utilitywarehouse/hearth-react-native';

const Filters = ({ filters, removeFilter }) => (
  <ChipGroup label="Currently showing:">
    {filters.map(filter => (
      <Chip key={filter.value} onPress={() => removeFilter(filter)}>
        {filter.label}
      </Chip>
    ))}
  </ChipGroup>
);
```

## Props

| Property     | Type                                     | Description                                                                                    | Default  |
| ------------ | ---------------------------------------- | ---------------------------------------------------------------------------------------------- | -------- |
| `children`   | `ReactNode`                              | The chip's visible text content.                                                               | Required |
| `onPress`    | `(event: GestureResponderEvent) => void` | Called when the chip is pressed. Use it to remove the filter or attribute the chip represents. | -        |
| `disabled`   | `boolean`                                | Prevents the chip from being pressed.                                                          | `false`  |
| `aria-label` | `string`                                 | Overrides the default accessible name (`Remove [label] filter`).                               | -        |
| ...rest      | `PressableProps`                         | All standard Pressable props are supported.                                                    | -        |

### ChipGroup

A wrapping layout container for a collection of `Chip` components.

#### Props

| Property   | Type        | Description                                                                                                    | Default  |
| ---------- | ----------- | -------------------------------------------------------------------------------------------------------------- | -------- |
| `label`    | `string`    | Optional text displayed before the chips, e.g. "Currently showing:". Also used as the group's accessible name. | -        |
| `children` | `ReactNode` | The `Chip` components to render within the group.                                                              | Required |
| ...rest    | `ViewProps` | All standard View props are supported.                                                                         | -        |

### Removable

Chip always renders a close icon to show that it can be removed. Attach an `onPress` handler to update your application state when the user presses it.

```tsx
// Example usage
<Chip onPress={args.onPress}>Label</Chip>
```

```tsx
// Example usage
<Chip onPress={() => removeFilter('gas')}>Gas</Chip>
```

### Disabled

Set `disabled` to prevent a Chip from being removed.

```tsx
// Example usage
<Chip disabled onPress={args.onPress}>
  Label
</Chip>
```

```tsx
// Example usage
<Chip disabled>Gas</Chip>
```

### Chip Group

Pass `label` to introduce the group.

```tsx
// Example usage
<ChipGroup label="Currently showing:">
  <Chip>Gas</Chip>
  <Chip>Electricity</Chip>
  <Chip>Broadband</Chip>
</ChipGroup>
```

```tsx
// Example usage
<ChipGroup label="Currently showing:">
  <Chip>Gas</Chip>
  <Chip>Electricity</Chip>
  <Chip>Broadband</Chip>
</ChipGroup>
```

`ChipGroup` wraps its Chips onto multiple lines once they no longer fit the available width.

```tsx
// Example usage
<Box maxWidth={360}>
  <ChipGroup label="Currently showing:">
    <Chip>Gas</Chip>
    <Chip>Electricity</Chip>
    <Chip>Mobile</Chip>
    <Chip>Broadband</Chip>
    <Chip>Insurance</Chip>
    <Chip>Cashback</Chip>
  </ChipGroup>
</Box>
```

### Adding and Removing

Chips are commonly added to and removed from a `ChipGroup` over time, such as when a user applies or clears filters.

```tsx
// Example usage
<AddAndRemoveExample />
```

```tsx
// Example usage
const [selected, setSelected] = useState(['Gas', 'Electricity']);

<ChipGroup label="Currently showing:">
  {selected.map(service => (
    <Chip key={service} onPress={() => setSelected(prev => prev.filter(s => s !== service))}>
      {service}
    </Chip>
  ))}
</ChipGroup>;
```

## Accessibility

A Chip's only interaction is removal, and it is mostly used for filtering, so its accessible name defaults to `Remove [label] filter` rather than just the visible label. For example, a screen reader announces "Remove Gas filter, button" rather than "Gas, button", which would not tell the user that pressing it removes something.

Pass `aria-label` (or `accessibilityLabel`) to override this wording. The default is only applied when `children` is a string.

`ChipGroup` renders with the `group` role. When `label` is set, it is used as the group's accessible name through `aria-labelledby`.
