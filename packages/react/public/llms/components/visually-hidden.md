# VisuallyHidden

Use VisuallyHidden to hide content visually while keeping it available to
screen readers — for example, extra context for an icon-only control.
It renders a `span` element by default.

```tsx
<BodyText>
  Visible text. <VisuallyHidden {...args} />
</BodyText>
```

## As child

Use `asChild` to apply the hidden styles to your own element, keeping its semantics.

```tsx
<VisuallyHidden asChild>
  <h2>Account settings</h2>
</VisuallyHidden>
```

```tsx
<VisuallyHidden asChild>
  <h2>Account settings</h2>
</VisuallyHidden>
```

## API

This component is based on the `span` element.

| Prop      | Type      | Default | Description                                                                                          |
| --------- | --------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `asChild` | `boolean` | —       | Change the default rendered element for the one passed as a child, merging their props and behavior. |
