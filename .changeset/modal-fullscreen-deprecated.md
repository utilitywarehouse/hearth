---
'@utilitywarehouse/hearth-react': minor
---

💔 [BREAKING CHANGE]: `Modal`'s `fullScreen` prop no longer has an effect

`fullScreen` made desktop modals grow to 90vh even though it was documented
as a mobile-only behaviour. Rather than patch the height rules for one
breakpoint, the modal's content area now automatically caps its height (70vh
on mobile, 60vh on tablet and above, 40vh when an image is present) and
scrolls internally whenever content overflows, on every viewport, without
needing an opt-in prop.

`fullScreen` is deprecated and will be removed in a future major version.

**Components affected**:
- `Modal`

**Developer changes**:

No replacement prop is needed — remove `fullScreen` from your `Modal` usage,
long content now scrolls automatically.

```diff
- <Modal heading="Tariff details" fullScreen>
+ <Modal heading="Tariff details">
```
