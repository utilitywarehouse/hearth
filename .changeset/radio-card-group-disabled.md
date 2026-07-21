---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: `RadioCardGroup` supports a `disabled` prop

Setting `disabled` on `RadioCardGroup` now disables every `RadioCard` within
it, dimming each card and blocking interaction. Individual `RadioCard`s can
still set their own `disabled` prop when the group itself isn't disabled.

**Developer changes**:

No action required. This is a new, optional prop.

```tsx
<RadioCardGroup disabled>
  <RadioCard value="fixed" label="Debit card payment" />
  <RadioCard value="variable" label="Instant bank transfer" />
</RadioCardGroup>
```
