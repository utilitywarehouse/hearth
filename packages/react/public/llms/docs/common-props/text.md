# Text

The text props can exist on components independently of each other, and each
reflect their own relevant CSS usage.

```tsx
<BodyText textAlign="left" />
<BodyText textAlign={{ mobile: 'center', desktop: 'left' }}/>

<BodyText textTransform="capitalize" />

<BodyText textWrap="pretty" />
<BodyText textWrap={{ mobile: 'wrap', desktop: 'nowrap' }}/>
```

| Prop            | Type                                                      | Default | Description                                                                               |
| --------------- | --------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------- |
| `textAlign`     | `Responsive<"center" \| "left" \| "right">`               | —       |                                                                                           |
| `textTransform` | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`    | —       | Set the text-transform on the component.                                                  |
| `wrap`          | `Responsive<"wrap" \| "nowrap" \| "balance" \| "pretty">` | —       | DEPRECATED: use `textWrap` instead of `wrap` @deprecated Use `textWrap` instead of `wrap` |
| `textWrap`      | `Responsive<"wrap" \| "nowrap" \| "balance" \| "pretty">` | —       |                                                                                           |
