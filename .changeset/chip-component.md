---
'@utilitywarehouse/hearth-react': patch
---

🌟 [FEATURE]: Add `Chip` & `ChipGroup` components

`Chip` is a compact, interactive element that represents an input, attribute,
or filter, letting users see active selections at a glance and remove them
with a single click.

```tsx
<Chip onClick={() => removeFilter(filter)}>{filter.label}</Chip>
```

`ChipGroup` lays out a collection of `Chip` components, such as the filters
currently applied to a list of results, with an optional leading label.

```tsx
<ChipGroup label="Currently showing:">
  <Chip onClick={() => removeFilter('gas')}>Gas</Chip>
  <Chip onClick={() => removeFilter('electricity')}>Electricity</Chip>
</ChipGroup>
```
