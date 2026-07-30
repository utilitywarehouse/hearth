---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: `Tabs` items don't expose selected state to screen readers on web

On `react-native-web` builds, `Tab` did not expose the active tab to assistive
technology because `react-native-web` does not derive an `aria-selected` DOM
attribute from `accessibilityState`. Active tabs now render `aria-selected`
explicitly, alongside the existing `accessibilityState`.
