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

| Prop            | Type                                                      | Default | Description                                                                                                  |
| --------------- | --------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------ |
| `textAlign`     | `Responsive<"center" \| "left" \| "right">`               | —       | Set the horizontal alignment of text within the component.                                                   |
| `textTransform` | `"none" \| "uppercase" \| "lowercase" \| "capitalize"`    | —       | Set the text-transform on the component.                                                                     |
| `textWrap`      | `Responsive<"wrap" \| "nowrap" \| "balance" \| "pretty">` | —       | Sets the CSS `text-wrap` property, controlling how text wraps within its container. Can be set responsively. |
