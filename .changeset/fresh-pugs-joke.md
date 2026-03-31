---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `loadingDescription` support to `Modal` and `NavModal`

`Modal` and `NavModal` now accept a `loadingDescription` prop to render supporting text beneath the spinner while `loading` is true. This makes it easier to give users more context during loading states without building custom loading content.

**Components affected**:
- `Modal`
- `NavModal`

**Developer changes**:

No changes are required for existing usage. To show supporting text in a loading state, pass `loadingDescription` alongside `loading` and, if needed, `loadingHeading`.