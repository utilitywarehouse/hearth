---
'@utilitywarehouse/hearth-react-native': patch
---

💅 [ENHANCEMENT]: Update design tokens from Figma

Updated design tokens to include new font sizes, line heights, and component-specific tokens:

- Added `background.loading` colour token for both light and dark modes
- Added new font sizes: 575 (44px) and 650 (54px)
- Added new line heights: 975 (52px) and 1050 (62px)
- Updated `Modal` component tokens with `mobile.paddingBottom` and `handle.paddingBottom` properties
- Added `borderBottom` property to `Navigation` component tokens
- Updated `Skeleton` component `loadingColor` value in light mode

**Developer changes**:

No changes required. These tokens are automatically applied to components that use them.
