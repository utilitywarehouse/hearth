---
'@utilitywarehouse/hearth-react': minor
---

🌟 [FEATURE]: Add `ChipGroup` component

`ChipGroup` lays out a collection of `Chip` components, such as the filters
currently applied to a list of results, with an optional leading label.

```tsx
<ChipGroup label="Currently showing:">
  <Chip onClick={() => removeFilter('gas')}>Gas</Chip>
  <Chip onClick={() => removeFilter('electricity')}>Electricity</Chip>
</ChipGroup>
```
