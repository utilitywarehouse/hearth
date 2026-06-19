# Flex items

Flex item props enable styling on components when they are children of a flexbox container.

```tsx
<Flex>
  <Box flex="1 1 0%" />
  <Box flexBasis="0" />
  <Box flexShrink="3" />
  <Box flexGrow={{ mobile: 0, desktop: 1 }} />
</Flex>
```

| Prop         | Type                 | Default | Description |
| ------------ | -------------------- | ------- | ----------- |
| `flex`       | `Responsive<string>` | —       |             |
| `flexBasis`  | `Responsive<string>` | —       |             |
| `flexShrink` | `Responsive<string>` | —       |             |
| `flexGrow`   | `Responsive<string>` | —       |             |
