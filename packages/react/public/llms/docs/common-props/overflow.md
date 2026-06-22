# Overflow

The overflow props are responsive, and are available for the shorthand as well as both X and Y axis.

```tsx
<Box overflow="hidden" />
<Box overflow={{ mobile: "hidden", desktop: "scroll"}} />
<Box overflowX="auto" />
<Box overflowY="auto" />
```

| Prop        | Type                                                                | Default | Description |
| ----------- | ------------------------------------------------------------------- | ------- | ----------- |
| `overflow`  | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">` | —       |             |
| `overflowX` | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">` | —       |             |
| `overflowY` | `Responsive<"hidden" \| "auto" \| "visible" \| "clip" \| "scroll">` | —       |             |
