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

| Prop         | Type                 | Default | Description                                                                                                                                               |
| ------------ | -------------------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `flex`       | `Responsive<string>` | —       | Shorthand for `flex-grow`, `flex-shrink` and `flex-basis`, controlling how a flex item grows or shrinks to fit the space available in its flex container. |
| `flexBasis`  | `Responsive<string>` | —       | Set the initial main-size of a flex item before remaining space is distributed along the main axis.                                                       |
| `flexShrink` | `Responsive<string>` | `1`     | Set how much a flex item shrinks relative to the rest of the flex items when there isn't enough space in the container.                                   |
| `flexGrow`   | `Responsive<string>` | `0`     | Set how much a flex item grows relative to the rest of the flex items when there is extra space in the container.                                         |
