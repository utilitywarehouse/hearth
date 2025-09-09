---
'@utilitywarehouse/hearth-css-reset': minor
---

Remove list defaults only when `role='list'` is used.

This change updates the CSS reset so that the default styling for `ul` & `ol`
elements is only removed when the list role is explicitly set. These elements
implicitly have this list role, however, setting it explicitly better indicates
that the default appearance will change.

This change means that consumers can render default lists and easily remove the
default styling when necessary.

Developers will need to ensure any `ul` & `ol` elements that intend to override
the default styling have the appropriate role set:

```
<ul role="list">
<ol role="list">
```
