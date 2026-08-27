# AlignSelf

The align-self CSS property overrides a grid or flex item's align-items value.

```tsx
<Flex alignItems="center">
  <Box />
  <Box alignSelf="start" />
  <Box alignSelf={{ mobile: 'end', desktop: 'center' }} />
</Flex>
```

| Prop        | Type                                                    | Default | Description                                                                                                                                       |
| ----------- | ------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alignSelf` | `Responsive<"center" \| "start" \| "end" \| "stretch">` | —       | Override the container's `align-items` value for this individual flex or grid item, aligning it along the cross axis. Supports responsive values. |
