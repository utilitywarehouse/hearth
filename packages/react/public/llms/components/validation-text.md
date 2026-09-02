# ValidationText

Use ValidationText alongside a form field to display a validation message,
with an icon and colour that reflect the `status` (`valid` or `invalid`).
For general, non-validation guidance about a field, use HelperText instead.

```tsx
<ValidationText status="valid">Hearth validation text</ValidationText>
```

## API

This component is based on the `span` element and supports the following common props:

- Margin
- Text transform
- Text align

| Prop                | Type                   | Default   | Description                                                              |
| ------------------- | ---------------------- | --------- | ------------------------------------------------------------------------ |
| `status`            | `"valid" \| "invalid"` | `'valid'` | The validation status                                                    |
| `disableUserSelect` | `boolean`              | —         | Make the text unselectable, for use when associated with input elements. |
