---
'@utilitywarehouse/hearth-react-native': patch
---

🐛 [FIX]: A style function passed to `Button`, `IconButton`, `UnstyledIconButton`, `ToggleButton`, `ToggleButtonCard`, `Radio`, `RadioCard`, `Checkbox`, `Link`, or `Alert` was silently ignored

Each of these components combines its own internal styling with a caller-supplied `style` into an array on the underlying `Pressable`. Since `style` can legally be a function (`({ pressed }) => ...`, matching React Native's own `Pressable` API), passing one meant it was inserted into the array unresolved rather than invoked — React Native only invokes a function passed as the entire `style` prop, not one nested inside an array. `style` is now normalized (called with the current press state when it's a function) before being combined with the component's own styles. No change for callers passing a plain style object or array.
