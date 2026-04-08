---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add custom trigger content options to `ExpandableCard`.

`ExpandableCard` now supports a `triggerContent` prop for replacing the default trigger layout while keeping the chevron. `ExpandableCardTrigger` also now supports `children` with an optional `showChevron` prop, so you can fully compose the trigger content yourself and still opt in to the built-in expand/collapse chevron.

**Components affected**:
- `ExpandableCard`
- `ExpandableCardTrigger`

**Developer changes**:

Use `triggerContent` when you want a single prop on `ExpandableCard` to replace the standard trigger content:

```tsx
<ExpandableCard
  triggerContent={<BodyText weight="semibold">March bill ready</BodyText>}
  expandedContent={<BodyText>Balance: £89.50</BodyText>}
/>
```

Use `ExpandableCardTrigger` children when you want full control over the trigger structure. Add `showChevron` if you still want the built-in chevron:

```tsx
<ExpandableCardTrigger isExpanded={expanded} onPress={toggleExpanded} showChevron>
  <ExpandableCardContent>
    <ExpandableCardText>Custom trigger</ExpandableCardText>
  </ExpandableCardContent>
</ExpandableCardTrigger>
```