---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: `List` items can use a `subtle` border when the `List` itself uses a stronger `variant`

The new `listItemsVariant` prop overrides the border styling of the child list
items. For example, a `List` with `variant="emphasis"` can render its items with
a subtle border by setting `listItemsVariant="subtle"`.

**Components affected**:

- `List`

**Developer changes**:

No action required. To opt in, add the `listItemsVariant` prop:

```tsx
<List variant="emphasis" listItemsVariant="subtle">
  ...
</List>
```
