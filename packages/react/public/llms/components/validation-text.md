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

| Prop                | Type                                                                                                                                                                                                       | Default   | Description                                                              |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | ------------------------------------------------------------------------ |
| `status`            | `"valid" \| "invalid"`                                                                                                                                                                                     | `'valid'` | The validation status                                                    |
| `disableUserSelect` | `boolean`                                                                                                                                                                                                  | —         | Make the text unselectable, for use when associated with input elements. |
| `margin`            | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —         |                                                                          |
| `marginTop`         | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —         |                                                                          |
| `marginRight`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —         |                                                                          |
| `marginBottom`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —         |                                                                          |
| `marginLeft`        | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —         |                                                                          |
| `marginX`           | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —         |                                                                          |
| `marginY`           | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —         |                                                                          |
| `textAlign`         | `Responsive<"center" \| "left" \| "right">`                                                                                                                                                                | —         |                                                                          |
| `textTransform`     | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`                                                                                                                                                     | —         | Set the text-transform on the component.                                 |
