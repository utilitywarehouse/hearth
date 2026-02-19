---
'@utilitywarehouse/hearth-react': patch
---

💅 [ENHANCEMENT]: Include `modal` prop to change behaviour of `Menu` as needed

**Components affected**:
  - `Menu`

This change adds a `modal` prop to `Menu` to allow users to change the behaviour
of the `Menu` when multiple `Menu` components are used together. When `modal` is
set to `false`, if a user has an open `Menu` and they click on a different
`MenuTrigger` the second `Menu` opens immediately, closing the first `Menu`
without the need for the user to click outside of the first `Menu` to close it.
