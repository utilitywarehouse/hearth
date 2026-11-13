---
'@utilitywarehouse/hearth-react-native': major
---

💔 [BREAKING CHANGE]: Tighten peer dependency ranges

The peer dependency ranges now match the versions Hearth is built and tested against.

**Developer changes**:

- `react-native-reanimated` is now `^4.1.0`. Reanimated 3 is no longer supported.
- `react-native-worklets` is a new required peer, `>=0.5.0`. `Toast` imports `scheduleOnRN` from it, which first shipped in 0.5.0. Reanimated 4 needs this package anyway.
- `react-native-unistyles` is now `^3.2.3` (was `>=3.0.0`).
- `react-native` is now `>=0.78` (was `>=0.77`). Reanimated 4 supports React Native 0.78 and later, on the New Architecture only.
- `react-native-web` is now an optional peer. Native-only apps no longer need to install it.
