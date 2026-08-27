# Chip

Use Chip to represent an input, attribute, or filter that a user can remove
with a single click. Commonly used to show active filters applied to a list
of results.

- [Usage](#usage)
- [Removable](#removable)
- [Disabled](#disabled)
- [Chip Group](#chip-group)
- [Accessibility](#accessibility)
- [API](#api)

```tsx
<Flex gap="200" wrap="wrap">
  <Chip>Default</Chip>
  <Chip disabled>Disabled</Chip>
</Flex>
```

## Usage

Render a Chip for each active selection, and remove it from your state when
the user clicks it.

```tsx
<Chip onClick={() => removeFilter(filter)}>{filter.label}</Chip>
```

```tsx
<Chip {...args} />
```

## Removable

Chip always renders a close icon to signal that it can be removed. Attach an
`onClick` handler to update your application state when the user clicks it.

```tsx
<Chip onClick={() => alert('Chip removed')}>Label</Chip>
```

## Disabled

Set `disabled` to prevent a Chip from being removed.

```tsx
<Chip disabled>Label</Chip>
```

## Chip Group

Use `ChipGroup` to lay out a collection of Chips, such as the filters
currently applied to a list of results. Pass `label` to introduce the group,
e.g. "Currently showing:".

```tsx
<ChipGroup label="Currently showing:">
  <Chip onClick={() => removeFilter('gas')}>Gas</Chip>
  <Chip onClick={() => removeFilter('electricity')}>Electricity</Chip>
</ChipGroup>
```

```tsx
<ChipGroup label="Currently showing:">
  <Chip>Gas</Chip>
  <Chip>Electricity</Chip>
  <Chip>Broadband</Chip>
</ChipGroup>
```

ChipGroup wraps its Chips onto multiple lines once they no longer fit the
available width.

```tsx
<Box maxWidth="600px">
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

Chips are commonly added to and removed from a ChipGroup over time, such as
when a user applies or clears filters.

```tsx
<AddAndRemoveExample />
```

## Accessibility

A Chip's only interaction is removal, and by default is used for filtering, so
its accessible name defaults to `Remove [label] filter` rather than just the
visible label, ie. `Remove gas filter`, rather than `Gas`: a screen reader
announcing only the label (e.g. "Gas, button") wouldn't convey that activating
it removes something.

Pass `aria-label` to override this wording.

## API

This component is based on the `button` element and supports the following
common props:

- Margin

| Prop       | Type        | Default | Description                      |
| ---------- | ----------- | ------- | -------------------------------- |
| `children` | `ReactNode` | —       | The chip's visible text content. |

### ChipGroup API

This component is based on the `div` element and supports the following
common props:

- Margin

| Prop       | Type        | Default | Description                                                                                                                                                                      |
| ---------- | ----------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`    | `string`    | —       | Optional text displayed before the chips, e.g. "Currently showing:". Also used as the group's accessible name via `aria-labelledby`, unless `aria-labelledby` is set explicitly. |
| `children` | `ReactNode` | —       | The `Chip` components to render within the group.                                                                                                                                |
