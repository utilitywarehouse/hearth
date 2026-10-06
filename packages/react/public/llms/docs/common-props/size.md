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

| Prop        | Type                 | Default | Description                                         |
| ----------- | -------------------- | ------- | --------------------------------------------------- |
| `width`     | `Responsive<string>` | —       | Set the width of the component.                     |
| `maxWidth`  | `Responsive<string>` | —       | Set the maximum width the component can grow to.    |
| `minWidth`  | `Responsive<string>` | —       | Set the minimum width the component can shrink to.  |
| `height`    | `Responsive<string>` | —       | Set the height of the component.                    |
| `maxHeight` | `Responsive<string>` | —       | Set the maximum height the component can grow to.   |
| `minHeight` | `Responsive<string>` | —       | Set the minimum height the component can shrink to. |
