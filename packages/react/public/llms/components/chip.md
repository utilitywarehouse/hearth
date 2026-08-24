# Chip

Chip is a compact, interactive element that represents an input, attribute, or
filter. It lets users see active selections at a glance and remove them with
a single click.

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

## API

This component is based on the `button` element and supports the following
common props:

- Margin

| Prop       | Type        | Default | Description                      |
| ---------- | ----------- | ------- | -------------------------------- |
| `children` | `ReactNode` | —       | The chip's visible text content. |
