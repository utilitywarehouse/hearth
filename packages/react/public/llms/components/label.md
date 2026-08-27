# Label

Use Label to caption a form field or other input — it renders a `label`
element by default, styled as `BodyText`. Set `variant="heading"` to style
it as a `Heading` instead, for labels that need more visual weight.

```tsx
<Label marginTop="300">Label</Label>
```

## API

This component is based on the `label` element, and supports the following common props:

- Margin
- Text transform

| Prop                | Type                      | Default     | Description                                                                                                                                    |
| ------------------- | ------------------------- | ----------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `as`                | `"label" \| "span"`       | `label`     | Shorthand for changing the default rendered element into a semantically appropriate alternative. Cannot be used in combination with `asChild`. |
| `variant`           | `"body" \| "heading"`     | `'body'`    | Sets the visual style of the label, rendering it as `BodyText` or as a `Heading`.                                                              |
| `fontWeight`        | `"regular" \| "semibold"` | `'regular'` | Sets the font-weight when `variant` is `'body'`.                                                                                               |
| `disabled`          | `boolean`                 | —           | Set the label appearance to disabled                                                                                                           |
| `disableUserSelect` | `boolean`                 | —           | Make the text unselectable, for use when associated with input elements.                                                                       |
