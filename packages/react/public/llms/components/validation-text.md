# ValidationText

`ValidationText` should be used with form field components to display validation messages.

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
