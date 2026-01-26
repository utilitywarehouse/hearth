# @utilitywarehouse/hearth-react-native

## 0.15.3

### Patch Changes

- [#801](https://github.com/utilitywarehouse/hearth/pull/801) [`6d11339`](https://github.com/utilitywarehouse/hearth/commit/6d1133997b28efa104c282522a5708f1d4d8614c) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: `Modal` without handle heading padding issue

- [#796](https://github.com/utilitywarehouse/hearth/pull/796) [`f0ccadb`](https://github.com/utilitywarehouse/hearth/commit/f0ccadbb48fb7a7a70520d7521746a63421e01cc) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: `CheckboxTile` text wrapping issue

## 0.15.2

### Patch Changes

- [#771](https://github.com/utilitywarehouse/hearth/pull/771) [`5320be5`](https://github.com/utilitywarehouse/hearth/commit/5320be544992c137e201be7750d30ea098a7d399) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Adds missing `ref` prop to the `CurrencyInput` component

## 0.15.1

### Patch Changes

- [#768](https://github.com/utilitywarehouse/hearth/pull/768) [`570f240`](https://github.com/utilitywarehouse/hearth/commit/570f240a448eae546b893ed3ad69235213ee5fac) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Makes `Modal` footer sticky by default

  This change updates the `Modal` component to have a sticky footer by default, enhancing user experience by keeping action buttons accessible. The `stickyFooter` prop has been added to allow developers to disable this behavior if needed.

## 0.15.0

### Minor Changes

- [#766](https://github.com/utilitywarehouse/hearth/pull/766) [`183155a`](https://github.com/utilitywarehouse/hearth/commit/183155a1aaf7713f0ab8a39ab1e5684ef6190d0c) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE] Custom `ListItem` styles for `UL` and `OL` components

  Added new props to `UL`, `OL`, and `ListItem` components to support custom list markers, including icons, images, and colors. This brings the functionality closer to CSS-like list styling. We also fixed a layout issue where list item text could overflow the container.

  **Components affected**:

  - `UL` (UnorderedList)
  - `OL` (OrderedList)
  - `ListItem`

  **Developer changes**:

  You can now customise list bullets/markers using the new `listStyle*` props. These can be set on the list container to apply to all items, or overridden on individual list items.

  ```tsx
  import { UL, LI } from '@utilitywarehouse/hearth-react-native';
  import { TickIcon } from '@utilitywarehouse/hearth-react-native-icons';

  <UL listStyleColour="feedbackPositiveSurfaceDefault" listStyleIcon={TickIcon}>
    <LI>Success item 1</LI>
    <LI listStyleColour="feedbackDangerSurfaceDefault">Error item override</LI>
  </UL>;
  ```

  Supported props:

  - `listStyleImage`: React Element (e.g. `<Image />`)
  - `listStyleIcon`: Icon component
  - `listStyleWidth` / `listStyleHeight`: Dimensions for the marker (default: 20)
  - `listStyleColour`: Color token or value for the marker

### Patch Changes

- [#762](https://github.com/utilitywarehouse/hearth/pull/762) [`2d2bbd2`](https://github.com/utilitywarehouse/hearth/commit/2d2bbd2ba109b9acb2e0b220766eb02c0ad5710e) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Fixes Android error when passing boolean or number as a `Checkbox` value

- [#764](https://github.com/utilitywarehouse/hearth/pull/764) [`46f115d`](https://github.com/utilitywarehouse/hearth/commit/46f115dd4bd9da824496e8ec19e29276523931a1) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Fixes `HelperText` wrapping issue

- [#762](https://github.com/utilitywarehouse/hearth/pull/762) [`2d2bbd2`](https://github.com/utilitywarehouse/hearth/commit/2d2bbd2ba109b9acb2e0b220766eb02c0ad5710e) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Fixes `PillGroup` `onChange` prop types

- [#764](https://github.com/utilitywarehouse/hearth/pull/764) [`46f115d`](https://github.com/utilitywarehouse/hearth/commit/46f115dd4bd9da824496e8ec19e29276523931a1) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: `DescriptionListItem` description disappearing when direction is `column`

- [#762](https://github.com/utilitywarehouse/hearth/pull/762) [`2d2bbd2`](https://github.com/utilitywarehouse/hearth/commit/2d2bbd2ba109b9acb2e0b220766eb02c0ad5710e) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Input styles are now passed to the correct View

## 0.14.1

### Patch Changes

- [#749](https://github.com/utilitywarehouse/hearth/pull/749) [`ded4b2e`](https://github.com/utilitywarehouse/hearth/commit/ded4b2e3dcad9c1cc4860a13120e44a43e5f0dde) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `CardAction` padding

## 0.14.0

### Minor Changes

- [#741](https://github.com/utilitywarehouse/hearth/pull/741) [`acf081a`](https://github.com/utilitywarehouse/hearth/commit/acf081a8e10722ea1e9106f8111f5d9548815646) Thanks [@jordmccord](https://github.com/jordmccord)! - Renames `ListItemText` to `ListItemHeading` (`ListItemText` is deprecated and will be removed in a later release)

### Patch Changes

- [#741](https://github.com/utilitywarehouse/hearth/pull/741) [`acf081a`](https://github.com/utilitywarehouse/hearth/commit/acf081a8e10722ea1e9106f8111f5d9548815646) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `truncateHeading` and `truncateHelperText` props to `ListItem`

- [#740](https://github.com/utilitywarehouse/hearth/pull/740) [`16f1ce0`](https://github.com/utilitywarehouse/hearth/commit/16f1ce073d62c4e72693e7e07233a7498c0d0602) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes custom `ListItem` first child border issue

- [#737](https://github.com/utilitywarehouse/hearth/pull/737) [`85f76db`](https://github.com/utilitywarehouse/hearth/commit/85f76dbbf7c90db96d7e89e5f5e353a772dd84c2) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `Radio` and `Checkbox` Groups row direction issue

- [#741](https://github.com/utilitywarehouse/hearth/pull/741) [`acf081a`](https://github.com/utilitywarehouse/hearth/commit/acf081a8e10722ea1e9106f8111f5d9548815646) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `ListItemText` and `ListItemHelperText` prop types

## 0.13.0

### Minor Changes

- [#682](https://github.com/utilitywarehouse/hearth/pull/682) [`57d6c71`](https://github.com/utilitywarehouse/hearth/commit/57d6c71baedeaa0bc914ff5163e73bbf4281aa79) Thanks [@Utakato](https://github.com/Utakato)! - Add Verification Input component

## 0.12.0

### Minor Changes

- [#685](https://github.com/utilitywarehouse/hearth/pull/685) [`10f5209`](https://github.com/utilitywarehouse/hearth/commit/10f52095e5f36e58f9821e3fec3fdf43f4578fbb) Thanks [@jordmccord](https://github.com/jordmccord)! - [BREAKING] Component props moved from objects to React Nodes

### Patch Changes

- [#687](https://github.com/utilitywarehouse/hearth/pull/687) [`11e8176`](https://github.com/utilitywarehouse/hearth/commit/11e8176ced40b0a8b2d27e07c482ed10a7b7ce7a) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `Input` refs

## 0.11.0

### Minor Changes

- [#674](https://github.com/utilitywarehouse/hearth/pull/674) [`c617257`](https://github.com/utilitywarehouse/hearth/commit/c617257974b11c39d706d6fd46712a284ff5fe10) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `DateInput` component

- [#663](https://github.com/utilitywarehouse/hearth/pull/663) [`8889a07`](https://github.com/utilitywarehouse/hearth/commit/8889a07e347e9289928e679cee495d7656a4e9aa) Thanks [@Utakato](https://github.com/Utakato)! - Add Avatar component

## 0.10.0

### Minor Changes

- [#659](https://github.com/utilitywarehouse/hearth/pull/659) [`99afbed`](https://github.com/utilitywarehouse/hearth/commit/99afbed95df550d5d5a8bb6e04f7640077bf4883) Thanks [@MichalCiesliczka](https://github.com/MichalCiesliczka)! - Adds `Pill` and `PillGroup` components

- [#671](https://github.com/utilitywarehouse/hearth/pull/671) [`706448d`](https://github.com/utilitywarehouse/hearth/commit/706448d91f354cb96a71a5f3acc9d17aaa767078) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `Toast` component

## 0.9.0

### Minor Changes

- [#658](https://github.com/utilitywarehouse/hearth/pull/658) [`2ac2366`](https://github.com/utilitywarehouse/hearth/commit/2ac2366aaa7f3b253fd9336664a73a64f1ab91a5) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `Menu` component

- [#656](https://github.com/utilitywarehouse/hearth/pull/656) [`a01a49a`](https://github.com/utilitywarehouse/hearth/commit/a01a49a49ec1dd3c04684ce010281030d45c77a1) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `fullscreen` and `inNavModal` props to `Modal`

## 0.8.2

### Patch Changes

- [#652](https://github.com/utilitywarehouse/hearth/pull/652) [`5119703`](https://github.com/utilitywarehouse/hearth/commit/5119703a31f663cc8c0a8bb2c6ba5b10f9bf72d6) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `RadioCard` label wrapping issue

- [#648](https://github.com/utilitywarehouse/hearth/pull/648) [`c90ea5c`](https://github.com/utilitywarehouse/hearth/commit/c90ea5ce165f27ccfc9774ec58ac642d02b349d1) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `ListAction` icon size

- [#648](https://github.com/utilitywarehouse/hearth/pull/648) [`c90ea5c`](https://github.com/utilitywarehouse/hearth/commit/c90ea5ce165f27ccfc9774ec58ac642d02b349d1) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `Banner` text gap size

- [#651](https://github.com/utilitywarehouse/hearth/pull/651) [`4ee77b7`](https://github.com/utilitywarehouse/hearth/commit/4ee77b75e58ac4abbeba375ecb367d8899c7f1a0) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `Banner` image and height issue

- [#649](https://github.com/utilitywarehouse/hearth/pull/649) [`7374535`](https://github.com/utilitywarehouse/hearth/commit/737453598ad5e885b35b5fcd2e4c4ccff4910c43) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `List` to only show `Card` container if it has children

- [#648](https://github.com/utilitywarehouse/hearth/pull/648) [`c90ea5c`](https://github.com/utilitywarehouse/hearth/commit/c90ea5ce165f27ccfc9774ec58ac642d02b349d1) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `shadowColor` prop to `Card` and exposes helpers in theme

## 0.8.1

### Patch Changes

- [#641](https://github.com/utilitywarehouse/hearth/pull/641) [`251242e`](https://github.com/utilitywarehouse/hearth/commit/251242e218c0b24589c3fb6fb6963b53bda8a367) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `HighlightBanner` when no image is provided

## 0.8.0

### Minor Changes

- [#635](https://github.com/utilitywarehouse/hearth/pull/635) [`4cac2f2`](https://github.com/utilitywarehouse/hearth/commit/4cac2f28c12279557e2133d67cd75783f30c89ff) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `Expandable` component

- [#631](https://github.com/utilitywarehouse/hearth/pull/631) [`57b4991`](https://github.com/utilitywarehouse/hearth/commit/57b49912c90dce3d88a699bd50217df08dab601a) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `Banner` component

- [#636](https://github.com/utilitywarehouse/hearth/pull/636) [`a363352`](https://github.com/utilitywarehouse/hearth/commit/a363352dbfbc44245c64e2a16347463b89ff519a) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `ExpandableCard` component

- [#631](https://github.com/utilitywarehouse/hearth/pull/631) [`57b4991`](https://github.com/utilitywarehouse/hearth/commit/57b49912c90dce3d88a699bd50217df08dab601a) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `HighlightBanner` component

## 0.7.0

### Minor Changes

- [#613](https://github.com/utilitywarehouse/hearth/pull/613) [`0bdfbe4`](https://github.com/utilitywarehouse/hearth/commit/0bdfbe41ed8b30e5abf49de6ea4cb3a12194921e) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `CardAction` component

## 0.6.0

### Minor Changes

- [#603](https://github.com/utilitywarehouse/hearth/pull/603) [`3f292e9`](https://github.com/utilitywarehouse/hearth/commit/3f292e9960dc708dd6932cff04671dd7ef375c1a) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `Container` component

- [#605](https://github.com/utilitywarehouse/hearth/pull/605) [`f52e0f5`](https://github.com/utilitywarehouse/hearth/commit/f52e0f57eff5f1cfa36dacc45576c08771ca12df) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `ThemedImage` component

## 0.5.0

### Minor Changes

- [#583](https://github.com/utilitywarehouse/hearth/pull/583) [`a31ab40`](https://github.com/utilitywarehouse/hearth/commit/a31ab40e4ccf4533aae2df16cc456d6db92d4e7b) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `Carousel` component

- [#567](https://github.com/utilitywarehouse/hearth/pull/567) [`b6869cf`](https://github.com/utilitywarehouse/hearth/commit/b6869cfaca7b3a5aacb27c06733f0243b6faa02a) Thanks [@MichalCiesliczka](https://github.com/MichalCiesliczka)! - Adds `ProgressStepper` component

- [#596](https://github.com/utilitywarehouse/hearth/pull/596) [`61f1073`](https://github.com/utilitywarehouse/hearth/commit/61f10735a42445b6e4eb90282a2b340317f1ec08) Thanks [@jordmccord](https://github.com/jordmccord)! - `List` component updates:

  - [BREAKING] The `text` prop in `ListItem` is now `heading`.
  - Added `ListAction` component.
  - Added `badge` prop to `ListItem`.
  - Added `numericValue` prop to `ListItem`.
  - Removes `divider` prop from `List` and `ListItem`; dividers are now handled automatically.

- [#585](https://github.com/utilitywarehouse/hearth/pull/585) [`4894c34`](https://github.com/utilitywarehouse/hearth/commit/4894c34acaadcbbaba78fd64be2f8ae862200e1f) Thanks [@dorota-uw](https://github.com/dorota-uw)! - [BREAKING] `DescriptionListItem` updates:

  - Removed `Link` props: `linkText`, `linkHref`, `linkIcon`, `linkIconPosition`, `linkOnPress`, `linkTarget`, `linkShowIcon`.
  - Added `trailingContent` prop to allow custom trailing content (e.g. Link, Button).
  - Added validation text support to `DescriptionListItem` via `invalidText` prop.

- [#572](https://github.com/utilitywarehouse/hearth/pull/572) [`9fa6499`](https://github.com/utilitywarehouse/hearth/commit/9fa6499b6eb1534c2ce7dc4352b1f848b94786ec) Thanks [@MichalCiesliczka](https://github.com/MichalCiesliczka)! - Adds `IndicatorIconButton` component

- [#596](https://github.com/utilitywarehouse/hearth/pull/596) [`61f1073`](https://github.com/utilitywarehouse/hearth/commit/61f10735a42445b6e4eb90282a2b340317f1ec08) Thanks [@jordmccord](https://github.com/jordmccord)! - [BREAKING] `SectionHeader` updates:

  - Removed `Link` props: `linkText`, `linkOnPress`, `linkAccessibilityLabel`.
  - Added `trailingContent` prop to allow custom trailing content (e.g. Link, Button).
  - Added `badge` prop to display a `Badge` next to the heading.
  - Adds `invalidText` prop for validation messages.

- [#596](https://github.com/utilitywarehouse/hearth/pull/596) [`61f1073`](https://github.com/utilitywarehouse/hearth/commit/61f10735a42445b6e4eb90282a2b340317f1ec08) Thanks [@jordmccord](https://github.com/jordmccord)! - [BREAKING] Migrates `DescriptionList` `SectionHeader` to use `headerTrailingContent`

### Patch Changes

- [#596](https://github.com/utilitywarehouse/hearth/pull/596) [`61f1073`](https://github.com/utilitywarehouse/hearth/commit/61f10735a42445b6e4eb90282a2b340317f1ec08) Thanks [@jordmccord](https://github.com/jordmccord)! - Updates all interactive components fonts

- [#589](https://github.com/utilitywarehouse/hearth/pull/589) [`635a392`](https://github.com/utilitywarehouse/hearth/commit/635a392c80e883790e3fe2cae3b22453288911f1) Thanks [@dorota-uw](https://github.com/dorota-uw)! - Added underline to Ghost button

- [#596](https://github.com/utilitywarehouse/hearth/pull/596) [`61f1073`](https://github.com/utilitywarehouse/hearth/commit/61f10735a42445b6e4eb90282a2b340317f1ec08) Thanks [@jordmccord](https://github.com/jordmccord)! - Upgrade `@utilitywarehouse/hearth-react-native-icons` to `0.6.0`

- Updated dependencies [[`e707eec`](https://github.com/utilitywarehouse/hearth/commit/e707eec790550cab71f2541c26a38c5691e9cbca)]:
  - @utilitywarehouse/hearth-react-native-icons@0.7.0

## 0.4.2

### Patch Changes

- [#570](https://github.com/utilitywarehouse/hearth/pull/570) [`364e1ac`](https://github.com/utilitywarehouse/hearth/commit/364e1ac1ee6c83327b0614d90bf280e283144ae6) Thanks [@dorota-uw](https://github.com/dorota-uw)! - Switched the logic for enabling/disabling comma separator in CurrencyInput

- [#573](https://github.com/utilitywarehouse/hearth/pull/573) [`2c28614`](https://github.com/utilitywarehouse/hearth/commit/2c28614b5a9335dda15895c90e08774574d82d85) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `Radio` and `Checkbox` helper overflow issue

- [#573](https://github.com/utilitywarehouse/hearth/pull/573) [`2c28614`](https://github.com/utilitywarehouse/hearth/commit/2c28614b5a9335dda15895c90e08774574d82d85) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes semantic text colour issue

## 0.4.1

### Patch Changes

- [#544](https://github.com/utilitywarehouse/hearth/pull/544) [`98e6423`](https://github.com/utilitywarehouse/hearth/commit/98e642347a0aca8c23babb15ea6b5c70b6adca0f) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds legacy colour palette for backwards compatibility

## 0.4.0

### Minor Changes

- [#511](https://github.com/utilitywarehouse/hearth/pull/511) [`04f804c`](https://github.com/utilitywarehouse/hearth/commit/04f804ca93d6e8881f649a0374a3b878c3217623) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `DatePicker` and `DatePickerInput` components

### Patch Changes

- [#511](https://github.com/utilitywarehouse/hearth/pull/511) [`04f804c`](https://github.com/utilitywarehouse/hearth/commit/04f804ca93d6e8881f649a0374a3b878c3217623) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes `useTheme` typing

## 0.3.1

### Patch Changes

- [#472](https://github.com/utilitywarehouse/hearth/pull/472) [`009fe4b`](https://github.com/utilitywarehouse/hearth/commit/009fe4bff4fc54e424f22629040f715d3d4714ea) Thanks [@jordmccord](https://github.com/jordmccord)! - Add `image` prop to `Checkbox` and `Radio` components

- [#500](https://github.com/utilitywarehouse/hearth/pull/500) [`cc49e74`](https://github.com/utilitywarehouse/hearth/commit/cc49e74e3736b9647e8c5576ce45020add258625) Thanks [@jordmccord](https://github.com/jordmccord)! - - Updated dependencies [[`8dac8c1`](https://github.com/utilitywarehouse/hearth/commit/8dac8c1def9083d8e4efa1385e0ee7be23428c46)]:

  - @utilitywarehouse/hearth-react-native-icons@0.4.0

- [#499](https://github.com/utilitywarehouse/hearth/pull/499) [`7b6781c`](https://github.com/utilitywarehouse/hearth/commit/7b6781cc054cf9f1ed4969a2c663abceb526c249) Thanks [@jordmccord](https://github.com/jordmccord)! - Fixes dark mode styles for several components

## 0.3.0

### Minor Changes

- [`ce2b445`](https://github.com/utilitywarehouse/hearth/commit/ce2b445dfdd11a2912b4328d8259a604a77b31cd) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `IconContainer` component

- [#423](https://github.com/utilitywarehouse/hearth/pull/423) [`af2deea`](https://github.com/utilitywarehouse/hearth/commit/af2deea62be55d6e40fe5bbb41700e054082b583) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `DescriptionList` component

- [#421](https://github.com/utilitywarehouse/hearth/pull/421) [`a7974df`](https://github.com/utilitywarehouse/hearth/commit/a7974df554cb0eb499923a140ebea523fa49761c) Thanks [@jordmccord](https://github.com/jordmccord)! - [BREAKING] Removes `date` and `currency` type from the `Input` component

- [#426](https://github.com/utilitywarehouse/hearth/pull/426) [`997e7cb`](https://github.com/utilitywarehouse/hearth/commit/997e7cb847e4f70de7b995c00aeeee18f1a0a1cd) Thanks [@jordmccord](https://github.com/jordmccord)! - [BREAKING] Adds updated `Badge` colour schemes and variants, replaces `solid` with `emphasis`

- [#429](https://github.com/utilitywarehouse/hearth/pull/429) [`1a818ff`](https://github.com/utilitywarehouse/hearth/commit/1a818ffc97a04f412deac4e892fc2400b8ad8735) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `Tabs` component

- [#421](https://github.com/utilitywarehouse/hearth/pull/421) [`a7974df`](https://github.com/utilitywarehouse/hearth/commit/a7974df554cb0eb499923a140ebea523fa49761c) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `CurrencyInput` component

### Patch Changes

- [#430](https://github.com/utilitywarehouse/hearth/pull/430) [`a151f3a`](https://github.com/utilitywarehouse/hearth/commit/a151f3a116b97ce2756b89c07f2ac3f3105c3ff7) Thanks [@jordmccord](https://github.com/jordmccord)! - Added `autoFormatThousands` prop to `CurrencyInput` component

- [#426](https://github.com/utilitywarehouse/hearth/pull/426) [`997e7cb`](https://github.com/utilitywarehouse/hearth/commit/997e7cb847e4f70de7b995c00aeeee18f1a0a1cd) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds 2 new layout spacing sizes, '2xs' and '2xl'

## 0.2.0

### Minor Changes

- [#419](https://github.com/utilitywarehouse/hearth/pull/419) [`8b5d1fb`](https://github.com/utilitywarehouse/hearth/commit/8b5d1fbe44d7d7e6dd70d79011d273dbf868c5a6) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `fullscreen` prop to `Modal`

- [#410](https://github.com/utilitywarehouse/hearth/pull/410) [`22cf96c`](https://github.com/utilitywarehouse/hearth/commit/22cf96c17d8ebf4f3c90264b1345a2a2131d7722) Thanks [@jordmccord](https://github.com/jordmccord)! - [BREAKING] Updates the `colorScheme` component props to semantic meaning

- [#412](https://github.com/utilitywarehouse/hearth/pull/412) [`bc92ff1`](https://github.com/utilitywarehouse/hearth/commit/bc92ff1ef2e1527fa5f8639a8367b039d14cd30b) Thanks [@dorota-uw](https://github.com/dorota-uw)! - Added SectionHeader component

- [#415](https://github.com/utilitywarehouse/hearth/pull/415) [`614839e`](https://github.com/utilitywarehouse/hearth/commit/614839efec9c7eb7aaed59b4a4289439c170156f) Thanks [@jordmccord](https://github.com/jordmccord)! - [BREAKING] Removed `AccordionHeading` and `ListHeading` components in favour of `SectionHeader`

- [#417](https://github.com/utilitywarehouse/hearth/pull/417) [`2df513f`](https://github.com/utilitywarehouse/hearth/commit/2df513f6f4fd0d695816badf254486f917996a93) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `Modal` component

### Patch Changes

- [#420](https://github.com/utilitywarehouse/hearth/pull/420) [`960ab43`](https://github.com/utilitywarehouse/hearth/commit/960ab436ee5da9359849ff40557171a9c4edb192) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds our semantic colours to the color value types so they can be accessed in things like the `Box` props

- [#410](https://github.com/utilitywarehouse/hearth/pull/410) [`22cf96c`](https://github.com/utilitywarehouse/hearth/commit/22cf96c17d8ebf4f3c90264b1345a2a2131d7722) Thanks [@jordmccord](https://github.com/jordmccord)! - Moves components to use semantic tokens and exposes the new semantic tokens via the color object in the theme

## 0.1.0

### Minor Changes

- [`f6366c4`](https://github.com/utilitywarehouse/hearth/commit/f6366c4da2676c535dca90be570d6e6bae5a0349) Thanks [@jordmccord](https://github.com/jordmccord)! - Initial Release 🎉
