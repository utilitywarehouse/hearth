---
'@utilitywarehouse/hearth-css-reset': minor
---

This PR modifies CSS reset behaviour for lists to preserve native list styling by
default and only remove it when an explicit `role="list"` is present. This aligns
with accessibility best practices where `role="list"` signals intentional removal
of semantic list styling.

- Updates CSS reset to preserve default padding and list styles for `ul` and `ol` elements.
- Only removes list styling when `role="list"` is explicitly set.
- Updates the List component to include `role="list"` in props object rather than inline.

Developers will need to ensure any `ul` & `ol` elements that intend to override
the default styling have the appropriate role set:

```
<ul role="list">
<ol role="list">
```
