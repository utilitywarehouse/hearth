# Size

The size props provide height and width styles, they are responsive but do not
use any token values, instead they accept any valid CSS
[height](https://developer.mozilla.org/en-US/docs/Web/CSS/height) or
[width](https://developer.mozilla.org/en-US/docs/Web/CSS/width) value.

This also means you can use the Hearth browser tokens as values.

```tsx
<Box width="200px" />
<Box height={{ mobile: "100%", desktop: "600px" }}/>
<Box maxWidth={container.width}/>
```

| Prop        | Type                 | Default | Description |
| ----------- | -------------------- | ------- | ----------- |
| `width`     | `Responsive<string>` | —       |             |
| `maxWidth`  | `Responsive<string>` | —       |             |
| `minWidth`  | `Responsive<string>` | —       |             |
| `height`    | `Responsive<string>` | —       |             |
| `maxHeight` | `Responsive<string>` | —       |             |
| `minHeight` | `Responsive<string>` | —       |             |
