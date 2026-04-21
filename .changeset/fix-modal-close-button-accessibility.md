---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: `Modal` close button inaccessible on mobile when browser UI bars are visible

The modal max height on mobile was calculated using `100vh`, which does not
account for the browser's dynamic UI elements such as the address bar. This
could cause the modal to overflow the visible area, pushing the close button
out of reach.

The calculation now uses `100dvh` (dynamic viewport height), which correctly
accounts for browser UI bars. A `100vh`-based fallback is included for older
browsers that don't support `dvh`.
