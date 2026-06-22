# Z-Index

The `zIndex` prop sets the `z-index` value, it is responsive but does not
use any token values.

```tsx
<Box zIndex="1" />
<Box zIndex={{ mobile: "1", desktop: "-1" }}/>
```

| Prop     | Type                 | Default | Description |
| -------- | -------------------- | ------- | ----------- |
| `zIndex` | `Responsive<string>` | —       |             |
