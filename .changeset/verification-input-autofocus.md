---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `autoFocus` prop to `VerificationInput`

`VerificationInput` now supports an `autoFocus` prop to control whether the first slot should focus on mount.
Default is `false` to avoid unexpected focus when the component is used.

**Developer changes**:

```tsx
<VerificationInput autoFocus={false} />
```
