# Chip

Chip is a compact, interactive element that represents an input, attribute, or
filter. It lets users see active selections at a glance and remove them with
a single click.

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

A Chip's only interaction is removal, so its accessible name defaults to
`Remove {children}` rather than just the visible label — a screen reader
announcing only the label (e.g. "Gas, button") wouldn't convey that
activating it removes something. This follows guidance from an
[accessibility discussion on the Radix UI repo](https://github.com/radix-ui/primitives/issues/987#issuecomment-974122715)
that these kinds of tags "should be labelled by the thing they're tagging".
Pass `aria-label` to override this, e.g. for non-text `children` or different
wording.

The close icon is purely decorative and doesn't need labelling itself — icons
from the Hearth Icons packages already set `aria-hidden="true"` by default.

`ChipGroup` sets `role="group"` and associates its `label` (when provided)
as the group's accessible name via `aria-labelledby`, so assistive
technology announces the chips as a labelled collection rather than a run of
unrelated buttons. Pass `aria-labelledby` (or `aria-label`) directly to
override this.

Chip and ChipGroup only cover a single removable tag and a static
collection of them. A pattern where chips are added and removed as part of a
combobox-style multi-select input — with, for example, backspace-to-delete
keyboard support — is a different, more complex component and isn't covered
here.

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
