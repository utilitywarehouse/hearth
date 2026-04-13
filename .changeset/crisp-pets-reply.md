---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Long `Modal` content scrolling

This change ensures that when the content of a `Modal` exceeds the viewport
height, it becomes scrollable, allowing users to access all content without
issues. For this to work correctly, the `fullScreen` prop must be set to `true`
on the `Modal` component.
