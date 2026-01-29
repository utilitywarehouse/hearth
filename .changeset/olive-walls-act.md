---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: Add `badge` prop to `RadioTile` component.

With the `badge` prop you can now add a badge element to the `RadioTile` component for additional context or status indication.

```tsx
<RadioTile
  value="2"
  label="Two"
  helperText="The number two"
  badge={<Badge colorScheme="positive">Popular</Badge>}
/>
```
