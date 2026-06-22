# Spacing

The `spacing` prop is not responsive, instead it provides a predetermined set
of responsive steps for spacing _between_ elements. These will be overridden by
any usage of the `Flex` or `Grid` gap props.

```tsx
<Flex spacing="lg" />
```

| Prop      | Type                                                               | Default | Description                                    |
| --------- | ------------------------------------------------------------------ | ------- | ---------------------------------------------- |
| `spacing` | `"none" \| "2xs" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "2xl"` | —       | Set responsive spacing between child elements. |
