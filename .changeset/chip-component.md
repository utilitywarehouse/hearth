---
'@utilitywarehouse/hearth-react': minor
---

🌟 [FEATURE]: Add `Chip` component

`Chip` is a compact, interactive element that represents an input, attribute,
or filter, letting users see active selections at a glance and remove them
with a single click.

```tsx
<Chip onClick={() => removeFilter(filter)}>{filter.label}</Chip>
```
