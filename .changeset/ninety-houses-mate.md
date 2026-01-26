---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Remove default padding from `TabContent`.

We have removed the default padding on `TabContent`, as it shouldn't have been
there in the first place.

Consumers will need to visual check and adjust their own padding in response to
this change as `TabContent` layouts will change slightly as a result.

