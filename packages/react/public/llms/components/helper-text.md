# HelperText

Use HelperText below a form field to provide supporting guidance about its
expected input or purpose. It renders as a `span`-based `BodyText`, and can
be styled as `disabled` to match a disabled input, or given
`disableUserSelect` when tightly associated with an input element.
For validation feedback (error/success messages), use ValidationText instead.

```tsx
<HelperText>Hearth helper text</HelperText>
```

## API

This component is based on the `span` element and supports the following common props:

- Margin
- Text transform
- Text align

| Prop                | Type      | Default | Description                                                                                  |
| ------------------- | --------- | ------- | -------------------------------------------------------------------------------------------- |
| `disabled`          | `boolean` | —       | Set the helper text appearance to disabled. This will be overriden by the validation status. |
| `disableUserSelect` | `boolean` | —       | Make the text unselectable, for use when associated with input elements.                     |
