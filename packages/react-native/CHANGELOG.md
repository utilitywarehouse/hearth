# @utilitywarehouse/hearth-react-native

## 0.33.0

### Minor Changes

- [#1298](https://github.com/utilitywarehouse/hearth/pull/1298) [`43bf936`](https://github.com/utilitywarehouse/hearth/commit/43bf936fa03db109c669369cac6d0483877ae49a) Thanks [@robphoenix](https://github.com/robphoenix)! - 🧹 [HOUSEKEEPING]: Remove component color tokens in favour of semantic tokens

  Updated `TabsList` to use `theme.color.border.strong` and removed the
  `tabs.divider.color` component token (and other unused component color tokens)
  in favour of semantic tokens.

## 0.32.5

### Patch Changes

- [#1261](https://github.com/utilitywarehouse/hearth/pull/1261) [`745df73`](https://github.com/utilitywarehouse/hearth/commit/745df73a245dfe89d07aae5bac14256a4ff89e0a) Thanks [@robphoenix](https://github.com/robphoenix)! - 🧹 [HOUSEKEEPING]: Update dependencies

## 0.32.4

### Patch Changes

- [#1222](https://github.com/utilitywarehouse/hearth/pull/1222) [`3f35a43`](https://github.com/utilitywarehouse/hearth/commit/3f35a431ba4a0fae45cc640a62ea6cb53f85c384) Thanks [@Utakato](https://github.com/Utakato)! - 🌟 [FEATURE]: `Rating` component `emojis` variant

  The `Rating` component now supports an `emojis` variant that renders emoji faces
  instead of stars. When selected, the chosen emoji appears larger whilst
  unselected emojis become grayscale. Two static labels ("Very dissatisfied" /
  "Very satisfied") are displayed at the extremes.

  **Components affected**:
  - `Rating`

  **Developer changes**:

  ```tsx
  import { Rating } from '@utilitywarehouse/hearth-react-native';

  <Rating value={rating} onChange={setRating} variant="emojis" />;
  ```

  All existing props (`value`, `defaultValue`, `onChange`, `disabled`, `hideLabel`)
  work with the emoji variant. The new `rangeLabels` prop allows overriding the
  endpoint labels (defaulting to "Very dissatisfied" / "Very satisfied"):

  ```tsx
  <Rating variant="emojis" rangeLabels={{ low: 'Not at all', high: 'Absolutely' }} />
  ```

## 0.32.3

### Patch Changes

- [#1192](https://github.com/utilitywarehouse/hearth/pull/1192) [`a74bf02`](https://github.com/utilitywarehouse/hearth/commit/a74bf02c58c12e1b42351e0d7f8e3e79ea0acbd6) Thanks [@robphoenix](https://github.com/robphoenix)! - 🧹 [HOUSEKEEPING]: Fix dependencies and types

## 0.32.2

### Patch Changes

- [#1164](https://github.com/utilitywarehouse/hearth/pull/1164) [`c8848d9`](https://github.com/utilitywarehouse/hearth/commit/c8848d9b01611e4c25b9caef7f211b8c623432c4) Thanks [@MichalCiesliczka](https://github.com/MichalCiesliczka)! - 🐛 [FIX]: Badge and Tabs now adapt their height for larger accessibility font sizes.

  When larger text sizes are enabled (for example in iOS accessibility settings),
  Badge and Tabs no longer clip text within fixed-height layouts. Their containers
  now grow to fit scaled text while keeping the default visual sizing at standard
  font settings.

  **Components affected**:
  - Badge
  - Tab

  **Developer changes**:

  No code changes are required.

- Updated dependencies [[`e4167f2`](https://github.com/utilitywarehouse/hearth/commit/e4167f27325dacc0cbc1feae456697387162aa77)]:
  - @utilitywarehouse/hearth-react-native-icons@0.8.1

## 0.32.1

### Patch Changes

- [#1144](https://github.com/utilitywarehouse/hearth/pull/1144) [`85459f2`](https://github.com/utilitywarehouse/hearth/commit/85459f2f4d7dcd8a99685a11dcda070530cee8dc) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Add the missing `highlight` color scheme support across the `Banner` and `Card` components.

## 0.32.0

### Minor Changes

- [#1134](https://github.com/utilitywarehouse/hearth/pull/1134) [`8824186`](https://github.com/utilitywarehouse/hearth/commit/ebccb55afebcbd47508d7992614b2495c7839cc6) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `Roundel` status indicator component.

`Roundel` is a compact status indicator with `success`, `pending`, and `error` variants, intended for inline state cues.

**Components affected**:

- `Roundel`

**Developer changes**:

Import and use `Roundel` from `@utilitywarehouse/hearth-react-native`:

```tsx
import { Roundel } from '@utilitywarehouse/hearth-react-native';

<Roundel variant="success" />;
```

- [#1132](https://github.com/utilitywarehouse/hearth/pull/1132) [`8824186`](https://github.com/utilitywarehouse/hearth/commit/882418633ee8c3a11e204329d07363dc411996dc) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add the `Rating` component

  **Components affected**:
  - `Rating`

  **Developer changes**:

  ```tsx
  import { Rating } from '@utilitywarehouse/hearth-react-native';

  const MyComponent = () => <Rating value={3} />;
  ```

- [#1129](https://github.com/utilitywarehouse/hearth/pull/1129) [`ec385a8`](https://github.com/utilitywarehouse/hearth/commit/ec385a8185bfa4ec7f4d5f1366ecc069a98cbba8) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `StepperInput` for controlled numeric input with increment and decrement buttons.

  `StepperInput` is a new React Native form component for adjusting numeric values with direct text entry and dedicated step controls. It supports min and max bounds, configurable step size, validation and helper text through `FormField`, and an opt-in `focusInputOnStepPress` prop for keyboard-first flows.

  **Components affected**:
  - `StepperInput`

  **Developer changes**:

  Import and use `StepperInput` from `@utilitywarehouse/hearth-react-native`:

  ```tsx
  import { StepperInput } from '@utilitywarehouse/hearth-react-native';

  <StepperInput label="Guests" min={1} max={10} value={value} onChangeText={setValue} />;
  ```

### Patch Changes

- [#1133](https://github.com/utilitywarehouse/hearth/pull/1133) [`5cae98e`](https://github.com/utilitywarehouse/hearth/commit/5cae98e640a708a7d99eaf0395b7b52e71b8e6ec) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Add a `defaultHeight` prop to `Textarea` so the initial height can be configured.

## 0.31.1

### Patch Changes

- [#1119](https://github.com/utilitywarehouse/hearth/pull/1119) [`19415d4`](https://github.com/utilitywarehouse/hearth/commit/19415d4d54458b3fb019df6647b9a5e4c375b672) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Refresh dark mode tokens across components and semantic colors.

  Dark mode color tokens have been updated across semantic and component tokens to improve contrast and visual consistency. This also fixes `TableHeaderCell` text colors so purple and white header variants resolve the correct foreground token.

  **Components affected**:
  - dark mode tokens
  - `TableHeaderCell`

  **Developer changes**:

  No code changes are required unless you rely on the previous dark mode token values or visual snapshots.

## 0.31.0

### Minor Changes

- [#1108](https://github.com/utilitywarehouse/hearth/pull/1108) [`8c2f3b5`](https://github.com/utilitywarehouse/hearth/commit/8c2f3b5334de83a7dd799b857394a34209b748e7) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add margin, padding, and layout utility props to `Flex`.

  `Flex` now exposes the shared margin and padding utility props, along with the existing layout utility prop surface, so it can be used more like other layout primitives such as `Card`.

  **Component affected**:
  - `Flex`

  **Developer changes**:

  You can now apply spacing and layout utility props directly on `Flex`:

  ```tsx
  <Flex direction="row" spacing="md" padding="300" marginTop="200" flex={1}>
    <Button>Back</Button>
    <Button>Continue</Button>
  </Flex>
  ```

- [#1104](https://github.com/utilitywarehouse/hearth/pull/1104) [`91feeab`](https://github.com/utilitywarehouse/hearth/commit/91feeab091ae6bf80e543f9196214066ce8b29b0) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add custom trigger content options to `ExpandableCard`.

  `ExpandableCard` now supports a `triggerContent` prop for replacing the default trigger layout while keeping the chevron. `ExpandableCardTrigger` also now supports `children` with an optional `showChevron` prop, so you can fully compose the trigger content yourself and still opt in to the built-in expand/collapse chevron.

  **Components affected**:
  - `ExpandableCard`
  - `ExpandableCardTrigger`

  **Developer changes**:

  Use `triggerContent` when you want a single prop on `ExpandableCard` to replace the standard trigger content:

  ```tsx
  <ExpandableCard
    triggerContent={<BodyText weight="semibold">March bill ready</BodyText>}
    expandedContent={<BodyText>Balance: £89.50</BodyText>}
  />
  ```

  Use `ExpandableCardTrigger` children when you want full control over the trigger structure. Add `showChevron` if you still want the built-in chevron:

  ```tsx
  <ExpandableCardTrigger isExpanded={expanded} onPress={toggleExpanded} showChevron>
    <ExpandableCardContent>
      <ExpandableCardText>Custom trigger</ExpandableCardText>
    </ExpandableCardContent>
  </ExpandableCardTrigger>
  ```

- [#1109](https://github.com/utilitywarehouse/hearth/pull/1109) [`8215550`](https://github.com/utilitywarehouse/hearth/commit/8215550745d08a8b4c18a6902e39d3199018092a) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `numberOfLines` support to `Badge` text.

  `Badge` now renders its text content on a single line by default and supports a new `numberOfLines` prop when you want to allow more lines.

  **Components affected**:
  - `Badge`

  **Developer changes**:

  No changes are required unless you want a `Badge` to wrap onto more than one line. To opt in, pass `numberOfLines`:

  ```tsx
  <Badge numberOfLines={2} text="Long badge text that can wrap onto a second line" />
  ```

- [#1108](https://github.com/utilitywarehouse/hearth/pull/1108) [`8c2f3b5`](https://github.com/utilitywarehouse/hearth/commit/8c2f3b5334de83a7dd799b857394a34209b748e7) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add custom footer support to `Modal` and `NavModal`.

  `Modal` and `NavModal` now support a `footer` prop for replacing the built-in primary and secondary action buttons with custom content, plus a `footerStyle` prop for styling the footer container. When `footer` is provided, the button props are now disallowed at the type level.

  **Components affected**:
  - `Modal`
  - `NavModal`

  **Developer changes**:

  Use `footer` when you need a custom footer layout, such as horizontal actions or extra decoration:

  ```tsx
  <Modal
    heading="Update billing details"
    footer={
      <Flex direction="row" spacing="md" pt="250">
        <Button variant="outline" colorScheme="functional" style={{ flex: 1 }}>
          Cancel
        </Button>
        <Button style={{ flex: 1 }}>Save changes</Button>
      </Flex>
    }
    footerStyle={{
      boxShadow: '0px -6px 12px rgba(16, 24, 40, 0.12)',
    }}
  />
  ```

- [#1103](https://github.com/utilitywarehouse/hearth/pull/1103) [`e375a44`](https://github.com/utilitywarehouse/hearth/commit/e375a442c507da1807e49f4d78e44edfff51d245) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add optional vertical resizing to `Textarea`.

  `Textarea` now supports a new `resizable` prop that adds a bottom-right drag handle so people can increase the field height when they need more space for longer content.

  **Components affected**:
  - `Textarea`

  **Developer changes**:

  No changes are required unless you want to enable resizing for a textarea. To opt in, pass the new `resizable` prop:

  ```tsx
  <Textarea
    label="Additional notes"
    helperText="Drag the corner handle to resize"
    placeholder="Enter your text here..."
    resizable
  />
  ```

- [#1108](https://github.com/utilitywarehouse/hearth/pull/1108) [`8c2f3b5`](https://github.com/utilitywarehouse/hearth/commit/8c2f3b5334de83a7dd799b857394a34209b748e7) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add flex utility props to `Container`.

  `Container` now exposes shared flex layout utility props, allowing layout properties such as `flex`, `alignItems`, `justifyContent`, and `flexDirection` to be applied directly through its public prop API.

  **Component affected**:
  - `Container`

  **Developer changes**:

  You can now combine `Container`'s existing spacing props with flex layout props:

  ```tsx
  <Container flex={1} justifyContent="center" alignItems="stretch" gap="200">
    <BodyText>Content</BodyText>
  </Container>
  ```

### Patch Changes

- [#1103](https://github.com/utilitywarehouse/hearth/pull/1103) [`e375a44`](https://github.com/utilitywarehouse/hearth/commit/e375a442c507da1807e49f4d78e44edfff51d245) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Render FormField optional text with regular weight instead of inheriting the label weight.

  This fixes FormField labels that append `(Optional)` so the optional text no longer inherits the main label weight.

  **Components affected**:
  - `FormField`
  - `Textarea`
  - `Input`

  **Developer changes**:

  No changes are required.

- [#1104](https://github.com/utilitywarehouse/hearth/pull/1104) [`91feeab`](https://github.com/utilitywarehouse/hearth/commit/91feeab091ae6bf80e543f9196214066ce8b29b0) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: `ExpandableCard` heading font size and weight

## 0.30.4

### Patch Changes

- [#1096](https://github.com/utilitywarehouse/hearth/pull/1096) [`6fd9021`](https://github.com/utilitywarehouse/hearth/commit/6fd9021a91ef38b56b78755965515a0807b34fa1) Thanks [@fillyD](https://github.com/fillyD)! - 🐛 [FIX]: Restore visibility of bottom sheet content in iOS accessibility tree, enabling automated tests to interact with `Select` options

## 0.30.3

### Patch Changes

- [#1094](https://github.com/utilitywarehouse/hearth/pull/1094) [`a9d8e66`](https://github.com/utilitywarehouse/hearth/commit/a9d8e660b7efa23c7a573af2658fc10ab6c043b9) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Make horizontal pressable `Banner` content flex correctly on native and web.

  This fixes horizontal pressable `Banner` layouts where the content area did not expand consistently, which could misplace the chevron and action content.

  **Components affected**:
  - `Banner`

  **Developer changes**:

  No changes are required.

## 0.30.2

### Patch Changes

- [#1090](https://github.com/utilitywarehouse/hearth/pull/1090) [`1420244`](https://github.com/utilitywarehouse/hearth/commit/1420244fbc23c8a755f9249f8b39cb094a865cea) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `alignChevron` to `Banner` for horizontal pressable layouts.

  `Banner` now supports an `alignChevron` prop to control the chevron alignment when `onPress` is used in the horizontal layout. Use `'start'`, `'center'`, or `'end'` to match the chevron position to the content layout.

  **Components affected**:
  - `Banner`

  **Developer changes**:

  No changes are required unless you want to override the default centred chevron alignment.

## 0.30.1

### Patch Changes

- [#1081](https://github.com/utilitywarehouse/hearth/pull/1081) [`5db8538`](https://github.com/utilitywarehouse/hearth/commit/5db8538b69115a23289f0038f681fc8b87a310c4) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Correct `NavModal` safe area handling across sheet and full-screen presentations.

  `NavModal` now applies safe area insets directly within the component layout, which fixes padding in full-screen presentations and keeps sheet-style presentations aligned with the modal footer behaviour.

  **Developer changes**:

  If you need to disable the inset padding, use the `useSafeAreaInsets` prop. The old `safeAreaViewProps` escape hatch is no longer available.

## 0.30.0

### Minor Changes

- [#1072](https://github.com/utilitywarehouse/hearth/pull/1072) [`55f0095`](https://github.com/utilitywarehouse/hearth/commit/55f009576ba55081de358bccc21691861ddd7c33) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `loadingDescription` support to `Modal` and `NavModal`

  `Modal` and `NavModal` now accept a `loadingDescription` prop to render supporting text beneath the spinner while `loading` is true. This makes it easier to give users more context during loading states without building custom loading content.

  **Components affected**:
  - `Modal`
  - `NavModal`

  **Developer changes**:

  No changes are required for existing usage. To show supporting text in a loading state, pass `loadingDescription` alongside `loading` and, if needed, `loadingHeading`.

### Patch Changes

- [#1070](https://github.com/utilitywarehouse/hearth/pull/1070) [`93c042c`](https://github.com/utilitywarehouse/hearth/commit/93c042c7772ab298e2ea4888a9777e8176453098) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Standardise numeric value typography across list-based components.

  Numeric values in `DescriptionListItem`, `ExpandableCard`, and `ListItem` now render with semibold `BodyText` instead of `DetailText`, aligning them with the updated content hierarchy used elsewhere in the library.

  **Components affected**:
  - `DescriptionListItem`
  - `ExpandableCard`
  - `ListItem`

  **Developer changes**:

  No changes are required.

- [#1073](https://github.com/utilitywarehouse/hearth/pull/1073) [`9759622`](https://github.com/utilitywarehouse/hearth/commit/975962229137dd196e5f72a04037a8f181907818) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Announce `Heading` as a header for assistive technologies.

  `Heading` now sets `accessibilityRole="header"` automatically so VoiceOver and TalkBack can identify headings as part of the screen structure.

  **Components affected**:
  - `Heading`

  **Developer changes**:

  No changes are required.

- [#1074](https://github.com/utilitywarehouse/hearth/pull/1074) [`95fe19e`](https://github.com/utilitywarehouse/hearth/commit/95fe19e6328bf652ff3ac1b2c723e1389fc59936) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Improve accessibility roles for `List`, `ListItem`, and `ListAction`

  `List` now defaults to `accessibilityRole="list"`, `ListAction` now defaults to `accessibilityRole="button"`, and `ListItem` respects an explicitly provided `accessibilityRole` instead of always forcing button semantics when `onPress` is set.

  **Components affected**:
  - `List`
  - `ListItem`
  - `ListAction`

  **Developer changes**:

  No changes are required unless you want a tappable `ListItem` to be announced as something other than a button. In that case, pass `accessibilityRole` explicitly.

## 0.29.2

### Patch Changes

- [#1067](https://github.com/utilitywarehouse/hearth/pull/1067) [`893cbfd`](https://github.com/utilitywarehouse/hearth/commit/893cbfd1bf090b8b75df6f58f2babaf8ba1e0033) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add a `useSafeAreaInsets` prop to `BottomSheetModalProvider` to control Hearth's bottom-sheet safe-area spacing.

  Bottom-sheet wrappers such as `BottomSheetView`, `BottomSheetScrollView`, `BottomSheetFlatList`, and components that render `SafeAreaView` inside a bottom sheet now respect `BottomSheetModalProvider` configuration.

  **Components affected**:
  - `BottomSheetModalProvider`
  - `BottomSheetView`
  - `BottomSheetScrollView`
  - `BottomSheetFlatList`
  - `Modal`
  - `Select`
  - `Combobox`

  **Developer changes**:

  No changes are required if you want the current behaviour. If your app already applies its own safe-area padding around bottom-sheet content, opt out like this:

  ```tsx
  <BottomSheetModalProvider useSafeAreaInsets={false}>
    {/* Your app content */}
  </BottomSheetModalProvider>
  ```

## 0.29.1

### Patch Changes

- [#1062](https://github.com/utilitywarehouse/hearth/pull/1062) [`0da3ffe`](https://github.com/utilitywarehouse/hearth/commit/0da3ffe12691a4287694ae9fcb2290d459e3c041) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Respect the selected `NavModal` background style

  Fixed an issue where `NavModal` always rendered its inner content with the default surface background, which prevented the `background="brand"` treatment from being applied correctly.

  **Components affected**:
  - `NavModal`

  **Developer changes**:

  No changes are required.

## 0.29.0

### Minor Changes

- [#1060](https://github.com/utilitywarehouse/hearth/pull/1060) [`05d38f9`](https://github.com/utilitywarehouse/hearth/commit/05d38f9414fec6d6b4a0733829b4d290d96fccae) Thanks [@jordmccord](https://github.com/jordmccord)! - 💔 [BREAKING CHANGE]: Extract navigation-presented modal behaviour into `NavModal`

  `Modal` now only supports the bottom-sheet modal behaviour. The React Navigation screen-based API that was previously exposed through `inNavModal`, `background`, and `scrollable` has moved to the new `NavModal` component.

  `NavModal` also adds a `presentation` prop so the component can match the React Navigation screen presentation style for sheet-style and full-screen modal routes.

  The package-owned `SafeAreaView` component has also been removed in favour of the `react-native-safe-area-context` `SafeAreaView`. Hearth now re-exports that implementation from the package root.

  **Components affected**:
  - `Modal`
  - `NavModal`
  - `SafeAreaView`

  **Developer changes**:

  Update navigation modal screens to use `NavModal` instead of `Modal`:

  ```diff
  - import { Modal } from '@utilitywarehouse/hearth-react-native';
  + import { NavModal, type NavModalRef } from '@utilitywarehouse/hearth-react-native';

  - const modalRef = useRef<Modal>(null);
  + const modalRef = useRef<NavModalRef>(null);

  - <Modal inNavModal background="brand" scrollable={false}>
  + <NavModal background="brand" scrollable={false} presentation="modal">
      {/* content */}
  - </Modal>
  + </NavModal>
  ```

  If you are using the bottom-sheet modal API, no changes are required.

  If you were importing the old component from the component path, update it to use the package root re-export or import directly from `react-native-safe-area-context`:

  ```diff
  - import { SafeAreaView } from '@utilitywarehouse/hearth-react-native';
  + import { SafeAreaView } from 'react-native-safe-area-context';
  ```

## 0.28.6

### Patch Changes

- [#1050](https://github.com/utilitywarehouse/hearth/pull/1050) [`13d2cca`](https://github.com/utilitywarehouse/hearth/commit/13d2ccab3abda60a35202847e3895017496c4dcf) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Expand react peer dependency to allow any React 19.x version for compatibility with all React 19 releases.

## 0.28.5

### Patch Changes

- [#1045](https://github.com/utilitywarehouse/hearth/pull/1045) [`3778061`](https://github.com/utilitywarehouse/hearth/commit/37780613890221368edb74c0ce83b8bf3d03e5b3) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: The `BannerIllustration` now stays centered in vertical banners and no longer inherits image border styling or horizontal stretching.

## 0.28.4

### Patch Changes

- [#1034](https://github.com/utilitywarehouse/hearth/pull/1034) [`76598eb`](https://github.com/utilitywarehouse/hearth/commit/76598eb0374c79f9e6c2c23c421f2b9602fbb113) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: The `CheckboxTile` spacing now uses the tile gap token instead of the base checkbox gap token.

- [#1034](https://github.com/utilitywarehouse/hearth/pull/1034) [`76598eb`](https://github.com/utilitywarehouse/hearth/commit/76598eb0374c79f9e6c2c23c421f2b9602fbb113) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: The `Combobox` trigger outline so it is only shown when the control is focused.

- [#1034](https://github.com/utilitywarehouse/hearth/pull/1034) [`76598eb`](https://github.com/utilitywarehouse/hearth/commit/76598eb0374c79f9e6c2c23c421f2b9602fbb113) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: The `RadioTile` spacing now uses the tile gap token instead of the base radio gap token.

- [#1036](https://github.com/utilitywarehouse/hearth/pull/1036) [`b7636e6`](https://github.com/utilitywarehouse/hearth/commit/b7636e6185879264e8d929c3be44fd0d1a354c22) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: The `CurrencyInput` font size.

- [#1039](https://github.com/utilitywarehouse/hearth/pull/1039) [`3a895bc`](https://github.com/utilitywarehouse/hearth/commit/3a895bcb8dcceb7d55a454ec63de9256d2d8322f) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Align all `Radio` and `Checkbox` default and tile gap sizes.

- [#1035](https://github.com/utilitywarehouse/hearth/pull/1035) [`01633a7`](https://github.com/utilitywarehouse/hearth/commit/01633a73153563d9b2286f42b764ad771e48ff82) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: The `Pill` component no longer applies extra vertical padding and fixes vertical alignment.

## 0.28.3

### Patch Changes

- [#1028](https://github.com/utilitywarehouse/hearth/pull/1028) [`dccffe1`](https://github.com/utilitywarehouse/hearth/commit/dccffe16342b22e58078dfc0aadfe9a482bfcc74) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: The `Combobox` trigger outline so it is only shown when the control is focused.

## 0.28.2

### Patch Changes

- [#1024](https://github.com/utilitywarehouse/hearth/pull/1024) [`23b6767`](https://github.com/utilitywarehouse/hearth/commit/23b67672b89198a483ddcef88f9c6207b684c4d9) Thanks [@fillyD](https://github.com/fillyD)! - 🐛 [FIX]: Adds missing `testID` to `Select` component

## 0.28.1

### Patch Changes

- [#1018](https://github.com/utilitywarehouse/hearth/pull/1018) [`1c5e02e`](https://github.com/utilitywarehouse/hearth/commit/1c5e02ea4b61329e7c55e52f9aa4ae44abc0da23) Thanks [@fillyD](https://github.com/fillyD)! - 🐛 [FIX]: Adds missing `testID` to `Select`, `SelectOption` and `VerificationInput` component

## 0.28.0

### Minor Changes

- [#1014](https://github.com/utilitywarehouse/hearth/pull/1014) [`c10ff82`](https://github.com/utilitywarehouse/hearth/commit/c10ff82243265217acd95f687d48d803b3c7a4bd) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `Combobox` and `SafeAreaView` to the React Native library

  The React Native package now includes a `Combobox` component for searchable selection in a bottom sheet, plus a `SafeAreaView` primitive that applies Unistyles runtime insets only when a view actually overlaps a screen edge. `Combobox` supports the built-in options API for fixed lists, controlled search values for dynamic results, and custom bottom sheet content for cases where you need to bring your own `BottomSheetFlatList` or bespoke option layout. `Modal` now uses `SafeAreaView` in its full-screen navigation modal path so content like search inputs no longer sits behind the dynamic island on iOS.

  **Components affected**:
  - `Combobox`
  - `ComboboxOption`
  - `SafeAreaView`
  - `Modal`

  **Developer changes**:

  Import the new components from `@utilitywarehouse/hearth-react-native` and choose the API that fits your layout. Use `options` for straightforward searchable lists, render custom sheet content when you need virtualised or dynamic results, and wrap full-screen content in `SafeAreaView` when it should only pick up edge insets if it actually touches that edge.

- [`8e37595`](https://github.com/utilitywarehouse/hearth/commit/8e375958559357ce5c1703505fa7438887d9e18e) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `Pagination` component

  The package now includes a `Pagination` component for moving between pages of content. It supports numbered pagination, a condensed layout for smaller spaces, optional skip buttons for jumping to the first and last page, and controlled page state so it can be wired into lists, tables, or other paged views.

  **Components affected**:
  - `Pagination`

  **Developer changes**:

  Import `Pagination` from `@utilitywarehouse/hearth-react-native` and control the current page in your screen or feature state.

  ```tsx
  import { useState } from 'react';
  import { Pagination } from '@utilitywarehouse/hearth-react-native';

  const MyComponent = () => {
    const [page, setPage] = useState(1);

    return <Pagination currentPage={page} onPageChange={setPage} totalPages={10} />;
  };
  ```

- [`8e37595`](https://github.com/utilitywarehouse/hearth/commit/8e375958559357ce5c1703505fa7438887d9e18e) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `Table` component

  The package now includes a composable `Table` API for presenting structured data with headers, rows, cells, optional card-style containers, horizontal scrolling for narrow viewports, configurable column widths, and pagination support through `TablePagination`. Header cells support trailing actions such as sort controls, and the API is split into smaller building blocks so layouts can be assembled to fit different datasets.

  **Components affected**:
  - `Table`
  - `TableHeader`
  - `TableHeaderCell`
  - `TableBody`
  - `TableRow`
  - `TableCell`
  - `TablePagination`

  **Developer changes**:

  Import the table primitives from `@utilitywarehouse/hearth-react-native` and compose them to match your data shape. Add `columnWidths` when you need fixed or weighted columns, and pass `pagination` when rows should be paged.

  ```tsx
  import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableHeaderCell,
    TableRow,
  } from '@utilitywarehouse/hearth-react-native';

  const MyComponent = () => (
    <Table columnWidths={[180, '2fr', '1fr']} container="subtle">
      <TableHeader color="purple">
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Status</TableHeaderCell>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHeaderCell row>Alex Morgan</TableHeaderCell>
          <TableCell>alex@example.com</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
  ```

- [#1016](https://github.com/utilitywarehouse/hearth/pull/1016) [`33baa9e`](https://github.com/utilitywarehouse/hearth/commit/33baa9e8edb091bbd1d17c9a3838352a7f1b87ea) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Adds `Timeline` and `TimelineItem`

  The package now includes `Timeline` and `TimelineItem` components for showing a sequence of static stops or progress steps. The new API supports labelled items, optional helper text, progress states for complete or active steps, and custom content within an item when you need to show extra context or actions.

  **Components affected**:
  - `Timeline`
  - `TimelineItem`

  **Developer changes**:

  Import `Timeline` and `TimelineItem` from `@utilitywarehouse/hearth-react-native`. Use `variant="static"` for simple ordered events, or `variant="progress"` with item `state` values to communicate step progress.

  ```tsx
  import { Timeline, TimelineItem } from '@utilitywarehouse/hearth-react-native';

  const MyComponent = () => (
    <Timeline variant="progress">
      <TimelineItem label="Ordered" helperText="We have received your order" state="complete" />
      <TimelineItem label="Packed" helperText="Your items are ready" state="complete" />
      <TimelineItem label="Out for delivery" helperText="Arriving today" state="active" />
      <TimelineItem label="Delivered" helperText="Pending" state="incomplete" />
    </Timeline>
  );
  ```

## 0.27.3

### Patch Changes

- [#1006](https://github.com/utilitywarehouse/hearth/pull/1006) [`1996112`](https://github.com/utilitywarehouse/hearth/commit/1996112864146e86972ef6b9b07a8be5a72b552f) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Make `paddingNone` remove horizontal padding for ghost buttons in `md` size

  Fixed an issue where setting `paddingNone` on a ghost button did not remove horizontal padding when using `md` size. The prop now removes horizontal padding for both `sm` and `md` ghost buttons.

  **Components affected**:
  - `Button`

  **Developer changes**:

  No changes required.

- [#1012](https://github.com/utilitywarehouse/hearth/pull/1012) [`4fda116`](https://github.com/utilitywarehouse/hearth/commit/4fda116c2a1bec383df7e630180ab57166ab9da4) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Prevent outlines from being clipped for scrollable children in `Modal`

  Fixed an issue in in-nav modals where child components with outlines could be visually clipped at the horizontal edges when content was scrollable.

  **Components affected**:
  - `Modal`

  **Developer changes**:

  No changes required.

- [#1012](https://github.com/utilitywarehouse/hearth/pull/1012) [`4fda116`](https://github.com/utilitywarehouse/hearth/commit/4fda116c2a1bec383df7e630180ab57166ab9da4) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Update horizontal padding values for scrollable in-nav `Modal` content

  Adjusted horizontal padding behaviour in scrollable in-nav modals to preserve child outlines while keeping visual spacing consistent.

  **Components affected**:
  - `Modal`

  **Developer changes**:

  No changes required.

- [#1009](https://github.com/utilitywarehouse/hearth/pull/1009) [`3d65ef2`](https://github.com/utilitywarehouse/hearth/commit/3d65ef2f8f7701b128a9c679f1910cd3d0f5c0c3) Thanks [@fillyD](https://github.com/fillyD)! - 🐛 [FIX]: testID for `List` component

## 0.27.2

### Patch Changes

- [#1003](https://github.com/utilitywarehouse/hearth/pull/1003) [`cdb95ea`](https://github.com/utilitywarehouse/hearth/commit/cdb95eabb279adaf348487ae3fb4a20e600e039e) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Correct `VerificationInput` focus progression after editing an empty slot

  Fixed an issue where entering a value after selecting an empty verification slot could move focus to the wrong slot. Focus now moves to the slot immediately after the one that was actually updated.

  **Components affected**:
  - `VerificationInput`

  **Developer changes**:

  No changes required.

## 0.27.1

### Patch Changes

- [#990](https://github.com/utilitywarehouse/hearth/pull/990) [`958e0e1`](https://github.com/utilitywarehouse/hearth/commit/958e0e1a9d5451d1e11fecadc69ae3c5ad9d42ca) Thanks [@declanelcocks](https://github.com/declanelcocks)! - 🐛 [FIX]: Fix `Modal` layout when `inNavModal` and `stickyFooter={false}`.

  Corrects the container flex style for `inNavModal` modals with a non-sticky footer, where the UX was not great when scrolling.

  **Components affected**:
  - `Modal`

  **Developer changes**:

  No changes required.

- [#992](https://github.com/utilitywarehouse/hearth/pull/992) [`2560b3d`](https://github.com/utilitywarehouse/hearth/commit/2560b3dcba7ed4981fad585628f96afd07d8de4f) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Add optional leading `icon` support to `SegmentedControlOption`.

  This adds an optional `icon` prop to `SegmentedControlOption`, allowing icons to be displayed before option labels in segmented controls.

  Docs and stories were updated to include icon usage examples.

  **Components affected**:
  - `SegmentedControlOption`

  **Developer changes**:

  No changes required for existing usage.

  To use the new optional icon prop:

  ```tsx
  import { SegmentedControl, SegmentedControlOption } from '@utilitywarehouse/hearth-react-native';
  import { ElectricitySmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

  <SegmentedControl defaultValue="energy">
    <SegmentedControlOption value="energy" icon={ElectricitySmallIcon}>
      Energy
    </SegmentedControlOption>
    <SegmentedControlOption value="broadband">Broadband</SegmentedControlOption>
  </SegmentedControl>;
  ```

## 0.27.0

### Minor Changes

- [#987](https://github.com/utilitywarehouse/hearth/pull/987) [`eb962d2`](https://github.com/utilitywarehouse/hearth/commit/eb962d2f33b63fa3aeda0b291fd41ace90d04c41) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `SegmentedControl` and `SegmentedControlOption` components.

  This introduces a new segmented control component for switching between a small set of related options.
  The component includes controlled and uncontrolled usage, size variants (`sm`, `md`), animated selected indicator movement, and improved accessibility semantics for screen readers.

  **Components affected**:
  - `SegmentedControl`
  - `SegmentedControlOption`

  **Developer changes**:

  Import and compose the new components as follows:

  ```tsx
  import { SegmentedControl, SegmentedControlOption } from '@utilitywarehouse/hearth-react-native';

  <SegmentedControl defaultValue="day" size="sm">
    <SegmentedControlOption value="day">Day</SegmentedControlOption>
    <SegmentedControlOption value="week">Week</SegmentedControlOption>
    <SegmentedControlOption value="month">Month</SegmentedControlOption>
  </SegmentedControl>;
  ```

### Patch Changes

- [#989](https://github.com/utilitywarehouse/hearth/pull/989) [`c97122e`](https://github.com/utilitywarehouse/hearth/commit/c97122eb429ec4adef656fb245a9256a5619df61) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Ensure horizontal `Banner` fills available width when `onPress` is not provided.

  Fixed a layout issue where a horizontal `Banner` without `onPress` could fail to stretch correctly within its parent container.

  **Components affected**:
  - `Banner`

  **Developer changes**:

  No changes required.

## 0.26.0

### Minor Changes

- [#981](https://github.com/utilitywarehouse/hearth/pull/981) [`df56387`](https://github.com/utilitywarehouse/hearth/commit/df563872e6bf040d419f6c7fce2343ebe560edb9) Thanks [@declanelcocks](https://github.com/declanelcocks)! - 🌟 [ENHANCEMENT]: Improve `Modal` behaviour when used inside a React Navigation modal (`inNavModal`).

  The following improvements have been made to the `Modal` component when used in a navigation context with `inNavModal={true}`:
  - **`scrollable` prop**: Content is now rendered inside a `ScrollView` by default. Set `scrollable={false}` to opt out, for example when you need to centre content or use a custom layout.
  - **`stickyFooter` support**: The `stickyFooter` prop now works correctly in `inNavModal` mode.
  - **Auto full-screen detection**: When the modal fills the entire screen (e.g. with `presentation: 'fullScreenModal'`), the `fullscreen` style is applied automatically. The `fullscreen` prop is no longer available when `inNavModal` is `true`.

  **Components affected**:
  - `Modal`

  **Developer changes**:

  No changes are required for existing usage. If you were passing `fullscreen` alongside `inNavModal={true}`, remove the `fullscreen` prop — full-screen styling is now detected automatically:

  ```diff
  - <Modal inNavModal fullscreen>
  + <Modal inNavModal>
  ```

  To disable the default `ScrollView` wrapping in `inNavModal` mode:

  ```tsx
  <Modal inNavModal scrollable={false}>
    {/* custom layout */}
  </Modal>
  ```

## 0.25.0

### Minor Changes

- [#982](https://github.com/utilitywarehouse/hearth/pull/982) [`506b388`](https://github.com/utilitywarehouse/hearth/commit/506b388ae1ef1065f013024a14bd9e2599a6442d) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `TimePicker` and `TimePickerInput` components with 12/24-hour support and minute intervals.

  Includes a shared time picker view, updated wheel behavior for native platforms, and polished visuals like gradient fades.

  **Components affected**:
  - `TimePicker`
  - `TimePickerInput`

  ```tsx
  import { TimePicker, TimePickerInput } from '@utilitywarehouse/hearth-react-native';
  import { useRef, useState } from 'react';
  import type { DateType } from '@utilitywarehouse/hearth-react-native';

  const Example = () => {
    const [value, setValue] = useState<DateType>();
    const pickerRef = useRef(null);

    return (
      <>
        <TimePickerInput
          value={value}
          onChange={({ date }) => setValue(date ?? undefined)}
          onClear={() => setValue(undefined)}
          timePickerProps={{ use12Hours: true, minuteInterval: 5 }}
        />
        <TimePicker
          ref={pickerRef}
          date={value}
          onChange={({ date }) => setValue(date)}
          use12Hours
          minuteInterval={5}
        />
      </>
    );
  };
  ```

## 0.24.0

### Minor Changes

- [#977](https://github.com/utilitywarehouse/hearth/pull/977) [`9d2b534`](https://github.com/utilitywarehouse/hearth/commit/9d2b5348a5748cb613f537808069de2e86bd21d7) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `ProgressBar` component with linear and circular variants.

  **Developer changes**:

  Use `ProgressBar` with a default percentage label, or override the label to show a custom value:

  ```tsx
  import { ProgressBar } from '@utilitywarehouse/hearth-react-native';

  <ProgressBar value={42} label="Uploading documents" />

  <ProgressBar
      value={68}
      max={100}
      label="Data allowance"
      variant="circular"
      formatValueText={(value, { max }) => `${max - value}GB remaining`}
  />
  ```

### Patch Changes

- [#978](https://github.com/utilitywarehouse/hearth/pull/978) [`26a1173`](https://github.com/utilitywarehouse/hearth/commit/26a11731a493a8b92ac2a3a183516376ab54663b) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Tighten `Modal` prop types and fix brand background text styling

  Improves TypeScript safety so `stickyFooter` is not allowed when `inNavModal` is true, and `background` can only be set when `inNavModal` is true. Also ensures headings, body text, and button content are correctly inverted when using the brand background.

  **Components affected**:
  - `Modal`

  **Developer changes**:
  No changes required unless you were relying on invalid prop combinations.

## 0.23.0

### Minor Changes

- [#975](https://github.com/utilitywarehouse/hearth/pull/975) [`102f04e`](https://github.com/utilitywarehouse/hearth/commit/102f04e0d560cf0faa21da5020c230e88e857251) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add a `background` option for Modal when used inside navigation modals

  Modal now supports a `background` prop with `default` and `brand` values. When `background="brand"` is used in a navigation modal, the buttons and close icon invert for contrast, and the content area is scrollable.

  **Components affected**:
  - `Modal`

  **Developer changes**:

  No changes required. To opt in to the brand background:

  ```tsx
  <Modal background="brand" inNavModal>
    ...
  </Modal>
  ```

## 0.22.1

### Patch Changes

- [#971](https://github.com/utilitywarehouse/hearth/pull/971) [`be1dfeb`](https://github.com/utilitywarehouse/hearth/commit/be1dfebd4b43f2df8ef6c5eaa42a88364e796479) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Improve VerificationInput OTP handling and accessibility

  VerificationInput now uses a single hidden input to manage focus, selection, and paste behaviour across platforms, improving caret handling and bulk entry. Accessibility labels and hints are now derived from the form field to provide clearer screen reader output.

  **Components affected**:
  - `VerificationInput`

  **Developer changes**:

  No changes required.

## 0.22.0

### Minor Changes

- [#968](https://github.com/utilitywarehouse/hearth/pull/968) [`cee5811`](https://github.com/utilitywarehouse/hearth/commit/cee5811020af02fe754d8311ec8313c1793f108a) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `badge` support to Radio and Checkbox (including tiles).

  **Components affected**:
  - `Radio`
  - `RadioTile`
  - `Checkbox`
  - `CheckboxTile`

  **Developer changes**:
  You can now pass a `badge` React node to render beneath helper text. No changes required unless you want to use the new prop.

### Patch Changes

- [#966](https://github.com/utilitywarehouse/hearth/pull/966) [`4e9f3f0`](https://github.com/utilitywarehouse/hearth/commit/4e9f3f0284e50da5ba4e49e132dac745a1a8a68d) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Allow Card layout props and remove forced alignment

  Card now accepts flex layout and display props, and it no longer forces `alignItems: flex-start` on the root, so custom alignment works as expected.

- [#969](https://github.com/utilitywarehouse/hearth/pull/969) [`c5c988b`](https://github.com/utilitywarehouse/hearth/commit/c5c988b65f1133b85b822037b086a524bc1255e3) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Render the Modal footer in navigation modals

## 0.21.0

### Minor Changes

- [#917](https://github.com/utilitywarehouse/hearth/pull/917) [`6a016dc`](https://github.com/utilitywarehouse/hearth/commit/6a016dca0d1a06e40a877da15aced590d0c68112) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add 2xl size variant to Heading component

  The `Heading` component now supports a `2xl` size option, providing a larger heading size for prominent page titles and hero sections. This size is responsive across device sizes with appropriate font sizes and line heights for mobile, tablet, and desktop viewports.

  **Components affected**:
  - `Heading`

  **Developer changes**:

  Use the new `2xl` size prop:

  ```tsx
  <Heading size="2xl">Welcome to Hearth</Heading>
  ```

  The `2xl` size will render with:
  - Mobile: 44px font size, 52px line height
  - Tablet: 44px font size, 52px line height
  - Desktop: 54px font size, 62px line height

- [#949](https://github.com/utilitywarehouse/hearth/pull/949) [`e1aacf0`](https://github.com/utilitywarehouse/hearth/commit/e1aacf06a58fd8358e9e7546ec35d8194a0d8d74) Thanks [@MichalCiesliczka](https://github.com/MichalCiesliczka)! - 🌟 [FEATURE]: Add segment refs to `DateInput` for programmatic focus control

  The `DateInput` component now supports direct refs for each segment input via `dayRef`, `monthRef`, and `yearRef`.
  This makes it easier to move focus between segments from custom flows (for example, advancing focus after validation or from custom buttons).

  Documentation and Storybook examples are also updated to show how to use segment refs in real usage.

  **Components affected**:
  - `DateInput`

  **Developer changes**:

  You can now pass refs to each segment and call `.focus()` when needed:

  ```tsx
  import { useRef, useState } from 'react';
  import { TextInput } from 'react-native';
  import { Button, DateInput } from '@utilitywarehouse/hearth-react-native';

  const DateWithSegmentFocus = () => {
    const [day, setDay] = useState('');
    const [month, setMonth] = useState('');
    const [year, setYear] = useState('');

    const dayRef = useRef<TextInput>(null);
    const monthRef = useRef<TextInput>(null);
    const yearRef = useRef<TextInput>(null);

    return (
      <>
        <DateInput
          label="Date of birth"
          dayValue={day}
          monthValue={month}
          yearValue={year}
          onDayChange={setDay}
          onMonthChange={setMonth}
          onYearChange={setYear}
          dayRef={dayRef}
          monthRef={monthRef}
          yearRef={yearRef}
        />

        <Button onPress={() => monthRef.current?.focus()}>Focus month</Button>
      </>
    );
  };
  ```

  This is a non-breaking enhancement, so existing `DateInput` usage continues to work without any changes.

- [#918](https://github.com/utilitywarehouse/hearth/pull/918) [`2db4dbe`](https://github.com/utilitywarehouse/hearth/commit/2db4dbe273583239b148c4399af829df596a00c1) Thanks [@jordmccord](https://github.com/jordmccord)! - 💔 [BREAKING CHANGE]: Simplify semantic token naming and introduce utility prop types

  This release simplifies the semantic token naming convention and introduces a new utility prop system to make the API more intuitive and consistent across components.

  **Components affected**:
  - `Box`
  - `Container`
  - `Card`
  - `Flex`
  - `Grid`
  - `Center`
  - `BodyText`
  - `Heading`
  - `DetailText`
  - `Carousel`
  - `CarouselItem`

  **Developer changes**:

  ### Background Colors

  Background color props now accept simplified semantic tokens. Update your code as follows:

  ```diff
  - <Box backgroundColor="backgroundPrimary">
  + <Box backgroundColor="primary">

  - <Box backgroundColor="backgroundSecondary">
  + <Box backgroundColor="secondary">

  - <Box backgroundColor="backgroundBrand">
  + <Box backgroundColor="brand">

  - <Container bg="backgroundPrimary">
  + <Container bg="primary">
  ```

  You can still use full color tokens (e.g., `backgroundColor={color.blue[400]}`) by using a `StyleSheet`, the `useTheme` hook, or directly importing from the tokens library:

  ```tsx
  import { StyleSheet } from 'react-native';

  const styles = StyleSheet.create(theme => ({
    customBackground: {
      backgroundColor: theme.color.blue[400],
    },
  }));

  <Box style={styles.customBackground} />;
  ```

  ```tsx
  import { useTheme } from '@utilitywarehouse/hearth-react-native';

  const theme = useTheme();

  <Box backgroundColor={theme.color.purple[800]} />;
  ```

  ```tsx
  import { color } from '@utilitywarehouse/hearth-tokens';

  <Box backgroundColor={color.blue[400]} />;
  ```

  ### Text Colors

  Text color props now accept simplified semantic tokens:

  ```diff
  - <BodyText color="white">Text</BodyText>
  + <BodyText color="inverted">Text</BodyText>

  - <BodyText color="grey1000">Text</BodyText>
  + <BodyText color="primary">Text</BodyText>

  - <Heading color="textSecondary">Heading</Heading>
  + <Heading color="secondary">Heading</Heading>
  ```

  ### Border Colors

  Border color props now accept simplified semantic tokens:

  ```diff
  - <Box borderColor="grey800">
  + <Box borderColor="strong">

  - <Box borderColor="borderSubtle">
  + <Box borderColor="subtle">
  ```

  ### Utility Props

  Components now support consistent utility props through shared type interfaces. The following components have been updated to support additional utility props:
  - **Container**: Added `MarginProps`, `PaddingProps`, `GapProps`, and `BackgroundColorProps`
  - **Card**: Added `MarginProps` and `GapProps`
  - **Flex**: Now properly supports `MarginProps`, `PaddingProps`, and `GapProps`
  - **Text components** (BodyText, Heading, DetailText): Now support `MarginProps`

  This means you can now use margin utilities directly on these components:

  ```tsx
  <BodyText mt="200" mb="100">Text with margin utilities</BodyText>
  <Container mx="300" py="200">Container with spacing utilities</Container>
  <Card mt="200" gap="100">Card with margin and gap utilities</Card>
  ```

  **Migration guide**:
  1. Replace semantic background color tokens:
     - `backgroundPrimary` → `primary`
     - `backgroundSecondary` → `secondary`
     - `backgroundBrand` → `brand`
  2. Replace semantic text color tokens:
     - `white` → `inverted` (for text on dark backgrounds)
     - `grey1000` / `textPrimary` → `primary`
     - `textSecondary` → `secondary`
  3. Replace semantic border color tokens:
     - `grey800` / `borderStrong` → `strong`
     - `borderSubtle` → `subtle`
  4. For non-semantic colors, use a `StyleSheet` and use the full color token from the theme:

  ```tsx
  import { StyleSheet } from 'react-native';

  const styles = StyleSheet.create(theme => ({
    customBackground: {
      backgroundColor: theme.color.blue[400],
    },
  }));

  <Box style={styles.customBackground} />;
  ```

  or the `useTheme` hook:

  ```tsx
  import { useTheme } from '@utilitywarehouse/hearth-react-native';

  const theme = useTheme();
  <Box backgroundColor={theme.color.purple[800]} />;
  ```

  or use the tokens library:

  ```tsx
  import { color } from '@utilitywarehouse/hearth-tokens';

  <Box backgroundColor={color.purple[800]} />;
  ```

  **Backwards compatibility**:

  The full color tokens (e.g., `backgroundPrimary`, `grey1000`) are still supported as fallbacks but are deprecated and will cause type errors. We recommend migrating to the simplified tokens for a cleaner API.

  **References**:
  - [Semantic tokens documentation](https://github.com/utilitywarehouse/hearth/blob/main/packages/tokens/src/semantic-light.ts)

### Patch Changes

- [#917](https://github.com/utilitywarehouse/hearth/pull/917) [`6a016dc`](https://github.com/utilitywarehouse/hearth/commit/6a016dca0d1a06e40a877da15aced590d0c68112) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Update design tokens from Figma

  Updated design tokens to include new font sizes, line heights, and component-specific tokens:
  - Added `background.loading` colour token for both light and dark modes
  - Added new font sizes: 575 (44px) and 650 (54px)
  - Added new line heights: 975 (52px) and 1050 (62px)
  - Updated `Modal` component tokens with `mobile.paddingBottom` and `handle.paddingBottom` properties
  - Added `borderBottom` property to `Navigation` component tokens
  - Updated `Skeleton` component `loadingColor` value in light mode

  **Developer changes**:

  No changes required. These tokens are automatically applied to components that use them.

## 0.20.0

### Minor Changes

- [#898](https://github.com/utilitywarehouse/hearth/pull/898) [`d32a188`](https://github.com/utilitywarehouse/hearth/commit/d32a18840c04222b7b1348133137dc5e56745fe3) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add validation and helper text props to `Select` component

  The `Select` component now supports built-in validation messages and helper text through new props: `invalidText`, `validText`, `helperText`, and `helperIcon`. This provides a more integrated validation experience without needing to wrap the component in FormField.

  **Components affected**:
  - `Select`

  **Developer changes**:

  You can now add helper text and validation messages directly to Select:

  ```tsx
  import { Select } from '@utilitywarehouse/hearth-react-native';

  <Select
    label="Choose an option"
    placeholder="Select an option"
    helperText="This is some helper text for the select component."
    validationStatus="invalid"
    invalidText="Please select a valid option"
    options={[
      { label: 'Option 1', value: '1' },
      { label: 'Option 2', value: '2' },
      { label: 'Option 3', value: '3' },
    ]}
    value={value}
    onValueChange={setValue}
  />;
  ```

  The component now also supports a `labelVariant` prop to control label styling:

  ```tsx
  <Select
    label="Choose an option"
    labelVariant="heading"
    // ... other props
  />
  ```

  These new props work seamlessly alongside the existing FormField wrapper if you prefer that approach. No changes are required to existing Select implementations.

## 0.19.1

### Patch Changes

- [#886](https://github.com/utilitywarehouse/hearth/pull/886) [`7a948de`](https://github.com/utilitywarehouse/hearth/commit/7a948dea0d15ce7ca34e4d405e86984213c96196) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Add `loadingHeading` prop to `Modal` component

  The `Modal` component now supports a `loadingHeading` prop to customise the heading text displayed during loading states. If not provided, it defaults to 'Loading...'.

  **Components affected**:
  - `Modal`

  **Developer changes**:

  No changes required. To customise the loading heading text, use the new `loadingHeading` prop:

  ```tsx
  <Modal
    loading={isLoading}
    loadingHeading="Processing your request..."
    heading="Confirm Action"
    description="Please wait while we process your request"
  />
  ```

- [#888](https://github.com/utilitywarehouse/hearth/pull/888) [`9b3e172`](https://github.com/utilitywarehouse/hearth/commit/9b3e172f9964026f4f3ba140731432ac63550256) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Align `Toast` icon and dismiss button to the top

## 0.19.0

### Minor Changes

- [#882](https://github.com/utilitywarehouse/hearth/pull/882) [`7e5338c`](https://github.com/utilitywarehouse/hearth/commit/7e5338c75bf051897a5384fe4ce0f65533b7e1a7) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Add `safeAreaPadding` option to `ToastProvider`

  `ToastProvider` now supports an optional `safeAreaPadding` prop to control whether toasts respect safe-area inset padding. This can be useful when you want to disable additional safe-area inset space while keeping the base toast padding.

  **Components affected**:
  - `ToastProvider`

  **Developer changes**:

  No changes required. To disable safe-area inset padding (while preserving the base bottom padding), set `safeAreaPadding` to `false`:

  ```tsx
  <ToastProvider safeAreaPadding={false}>{children}</ToastProvider>
  ```

- [`da893ff`](https://github.com/utilitywarehouse/hearth/commit/da893ff8a9d576a6ca69021737056c7289f8c6aa) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Unify spacing prop naming across layout components

  The `space` prop has been renamed to `spacing` across all layout components for improved consistency and clarity. The `space` prop is now deprecated but will continue to work alongside the new `spacing` prop to maintain backward compatibility.

  **Components affected**:
  - `Box`
  - `ButtonGroup`
  - `Card`
  - `Container`
  - `Divider`
  - `Flex`
  - `Grid`

  **Developer changes**:

  No immediate changes are required. The `space` prop will continue to work as before. However, we recommend migrating to the `spacing` prop at your convenience:

  ```diff
  - <Flex space="md">
  + <Flex spacing="md">
      <Box>...</Box>
      <Box>...</Box>
    </Flex>
  ```

  ```diff
  - <Grid columns={2} space="lg">
  + <Grid columns={2} spacing="lg">
      <Box>...</Box>
      <Box>...</Box>
    </Grid>
  ```

  ```diff
  - <Container space="xl">
  + <Container spacing="xl">
      <Box>...</Box>
    </Container>
  ```

  The deprecated `space` prop will be removed in a future major version release.

- [#877](https://github.com/utilitywarehouse/hearth/pull/877) [`2cdf3a2`](https://github.com/utilitywarehouse/hearth/commit/2cdf3a2f4251b24f34c260f3f5da39f8c330fff5) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `autoFocus` prop to `VerificationInput`

  `VerificationInput` now supports an `autoFocus` prop to control whether the first slot should focus on mount.
  Default is `false` to avoid unexpected focus when the component is used.

  **Developer changes**:

  ```tsx
  <VerificationInput autoFocus={false} />
  ```

- [#877](https://github.com/utilitywarehouse/hearth/pull/877) [`2cdf3a2`](https://github.com/utilitywarehouse/hearth/commit/2cdf3a2f4251b24f34c260f3f5da39f8c330fff5) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `VerificationInput` ref methods and improve rapid input handling

  `VerificationInput` now forwards a ref with `focus`, `blur`, `clear`, and `focusIndex` helpers. Input updates also use the latest value to avoid dropped digits when typing quickly.

  **Developer changes**:

  If you want to control focus programmatically, pass a ref:

  ```tsx
  import { useRef } from 'react';
  import {
    VerificationInput,
    type VerificationInputHandle,
  } from '@utilitywarehouse/hearth-react-native';

  const inputRef = useRef<VerificationInputHandle>(null);

  <VerificationInput ref={inputRef} onChangeText={setCode} />;
  ```

### Patch Changes

- [#880](https://github.com/utilitywarehouse/hearth/pull/880) [`a52bb03`](https://github.com/utilitywarehouse/hearth/commit/a52bb03352dd8b83c9cfd3311aaa390e96e75662) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Remove the unsupported `colorScheme` prop from `Banner` types so the API matches the `Card` component.

- [#879](https://github.com/utilitywarehouse/hearth/pull/879) [`383b686`](https://github.com/utilitywarehouse/hearth/commit/383b6860c1b68da139f10a67cd001dd884143df0) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Make `Banner` button full width in vertical layout

- [#878](https://github.com/utilitywarehouse/hearth/pull/878) [`b31b8c3`](https://github.com/utilitywarehouse/hearth/commit/b31b8c3d37d4d1ec3df2f187ec18d00b3e663b49) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Fix `Modal` bottom padding

- [#881](https://github.com/utilitywarehouse/hearth/pull/881) [`5681b8f`](https://github.com/utilitywarehouse/hearth/commit/5681b8fd4bcc73ad532229018049f959f06f77ec) Thanks [@jordmccord](https://github.com/jordmccord)! - 📦 [DEPS]: Bump `@utilitywarehouse/hearth-react-native-icons` peerDependency to 0.8.0

## 0.18.0

### Minor Changes

- [#869](https://github.com/utilitywarehouse/hearth/pull/869) [`89231c8`](https://github.com/utilitywarehouse/hearth/commit/89231c818dfd694f53b50f4cc961a38d0a50999e) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add color override props to `IconButton` for service-specific branding

  The `IconButton` component now supports custom color overrides through three new optional props: `backgroundColor`, `activeBackgroundColor`, and `shadowColor`. These props enable service-specific branding for use cases like service buttons (Electricity, Broadband, Mobile, Insurance, Cashback Card).

  ⚠️ **Important**: These props should be used sparingly and only for specific use cases where brand-specific colors are required. For most use cases, continue using the standard `colorScheme` and `variant` props to maintain design system consistency.

  **Components affected**:
  - `IconButton`

  **Developer changes**:

  You can now customise `IconButton` colors for service-specific branding:

  ```tsx
  import { IconButton } from '@utilitywarehouse/hearth-react-native';
  import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

  <IconButton
    icon={ElectricityMediumIcon}
    backgroundColor="energyBlue200"
    activeBackgroundColor="energyBlue300"
    shadowColor="energyBlue300"
    variant="emphasis"
    onPress={handlePress}
  />;
  ```

  The new props are:
  - `backgroundColor` - Sets the base background color, overriding the color scheme's default
  - `activeBackgroundColor` - Sets the background color when pressed or in an active state
  - `shadowColor` - Sets the shadow/elevation color

  These overrides work alongside the existing `variant` and `colorScheme` props, allowing you to maintain structural styling while customising colors for specific branding requirements.

### Patch Changes

- [#871](https://github.com/utilitywarehouse/hearth/pull/871) [`8984335`](https://github.com/utilitywarehouse/hearth/commit/89843355d268aaa184bea75784e6841568c4784f) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: Fix style ordering in `BodyText` to ensure color props properly override custom styles

## 0.17.0

### Minor Changes

- [#867](https://github.com/utilitywarehouse/hearth/pull/867) [`9a15eb8`](https://github.com/utilitywarehouse/hearth/commit/9a15eb8c659aa541988da6f28f6c50261f3557f9) Thanks [@jordmccord](https://github.com/jordmccord)! - 💔 [BREAKING CHANGE]: Require `CardActions` wrapper for `CardAction` groups.

  `Card` now only treats actions as such when they are wrapped in `CardActions`. This removes wrapper heuristics and makes action grouping explicit while keeping automatic content wrapping.

  **Components affected**:
  - `Card`
  - `CardActions`
  - `CardAction`

  **Developer changes**:

  Wrap all `CardAction` items in `CardActions`:

  ```diff
  - <Card>
  -   <CardAction heading="Action 1" onPress={() => {}} />
  -   <CardAction heading="Action 2" onPress={() => {}} />
  - </Card>
  + <Card>
  +   <CardActions>
  +     <CardAction heading="Action 1" onPress={() => {}} />
  +     <CardAction heading="Action 2" onPress={() => {}} />
  +   </CardActions>
  + </Card>
  ```

- [#860](https://github.com/utilitywarehouse/hearth/pull/860) [`ec44a9d`](https://github.com/utilitywarehouse/hearth/commit/ec44a9d3d7a2d95ab69b6e4c461104402d82659d) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `prefix` and `suffix` props to `Input` component

  The `Input` component now supports `prefix` and `suffix` props, allowing you to display text or custom content before and after the input field. This is useful for adding units, currency symbols, or other contextual information.

  **Components affected**:
  - `Input`

  **Developer changes**:

  Use the `prefix` and `suffix` props to add content before or after the input:

  ```tsx
  <Input label="Amount" prefix="£" suffix="GBP" placeholder="0.00" />
  ```

  You can also pass custom React nodes:

  ```tsx
  <Input label="Email" prefix={<CustomIcon />} suffix={<BodyText>@example.com</BodyText>} />
  ```

  **Note**: The `prefix` and `suffix` props are not available on `password` and `search` input types, as these have specific UI patterns.

- [#862](https://github.com/utilitywarehouse/hearth/pull/862) [`654552e`](https://github.com/utilitywarehouse/hearth/commit/654552e33d56e4b2b2ba8fb783b7f9a7c57ba212) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `loading` prop to `ListAction` component

  The `ListAction` component now supports a `loading` prop that displays a skeleton loading state while content is being fetched. This provides better user feedback during asynchronous operations.

  **Components affected**:
  - `ListAction`

  **Developer changes**:

  Use the `loading` prop to show a loading state:

  ```tsx
  <List>
    <ListItem heading="Account details" />
    <ListAction heading="View transactions" loading={isLoading} onPress={handlePress} />
  </List>
  ```

  When `loading` is true, the action will display skeleton placeholders instead of the heading and icon.

- [#862](https://github.com/utilitywarehouse/hearth/pull/862) [`654552e`](https://github.com/utilitywarehouse/hearth/commit/654552e33d56e4b2b2ba8fb783b7f9a7c57ba212) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Add `invalidText` prop to `List` component

  The `List` component now supports an `invalidText` prop for displaying validation error messages in the section header. This provides consistent validation feedback across list-based forms and grouped content.

  **Components affected**:
  - `List`

  **Developer changes**:

  Use the `invalidText` prop to display validation errors:

  ```tsx
  <List
    heading="Payment methods"
    helperText="Select at least one payment method"
    invalidText="You must select a payment method"
  >
    <ListItem heading="Credit card" />
    <ListItem heading="Direct debit" />
  </List>
  ```

### Patch Changes

- [#845](https://github.com/utilitywarehouse/hearth/pull/845) [`9c034f9`](https://github.com/utilitywarehouse/hearth/commit/9c034f98f9d6aa4596a45296d02e01703ef1c762) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Add `invalidText` prop to `ExpandableCardGroup`

  The `ExpandableCardGroup` component now supports an `invalidText` prop that displays validation text below the helper text when the group is in an invalid state.

  **Components affected**:
  - `ExpandableCardGroup`

  **Developer changes**:

  No changes required. If you want to display validation text, you can now use the `invalidText` prop:

  ```tsx
  <ExpandableCardGroup
    heading="Select an option"
    helperText="Choose one of the options below"
    invalidText="Please select at least one option"
  >
    {/* ExpandableCard components */}
  </ExpandableCardGroup>
  ```

- [#867](https://github.com/utilitywarehouse/hearth/pull/867) [`9a15eb8`](https://github.com/utilitywarehouse/hearth/commit/9a15eb8c659aa541988da6f28f6c50261f3557f9) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Improve first-item border detection in `Card` and `List` components

  The `Card` and `List` components now use a more reliable method to detect and style the first rendered `CardAction`, `ListItem`, or `ListAction`. This fixes edge cases where wrapper components that conditionally render `null` would previously interfere with first-item border removal.

  **Components affected**:
  - `Card` / `CardAction`
  - `List` / `ListItem` / `ListAction`

  **Developer changes**:

  No changes required. The improvement is automatic and maintains the same visual behavior. Components that wrap card actions or list items will now work correctly even when some wrappers return `null` conditionally.

  **Note**: The `useCardFirstActionContext` hook has been removed as it was an internal implementation detail.

## 0.16.2

### Patch Changes

- [#837](https://github.com/utilitywarehouse/hearth/pull/837) [`126657c`](https://github.com/utilitywarehouse/hearth/commit/126657cd96008625f9573ed5cc1588709c00f7da) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Add style customisation props to `DateInput` component

  The `DateInput` component now supports three new style props for customising the appearance of date segments: `inputContainerStyle`, `inputStyle`, and `inputLabelStyle`. This allows for greater flexibility when integrating DateInput into different layouts.

  **Components affected**:
  - `DateInput`

  **Developer changes**:

  No changes required. To customise the appearance of date input segments, use the new style props:

  ```tsx
  <DateInput
    label="Custom date input"
    inputContainerStyle={{ maxWidth: 'auto' }}
    inputStyle={{ fontSize: 16 }}
    inputLabelStyle={{ fontWeight: 'bold' }}
  />
  ```

## 0.16.1

### Patch Changes

- [#817](https://github.com/utilitywarehouse/hearth/pull/817) [`fb4f4d0`](https://github.com/utilitywarehouse/hearth/commit/fb4f4d034e5b67b0c75dc093f7fdd8d3ab26edde) Thanks [@jordmccord](https://github.com/jordmccord)! - 🐛 [FIX]: `DateInput` height issue

## 0.16.0

### Minor Changes

- [#810](https://github.com/utilitywarehouse/hearth/pull/810) [`eae4c24`](https://github.com/utilitywarehouse/hearth/commit/eae4c24a421415247c720f88bb8341133340cc7b) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: All `Input` components accessibility improvements and you can now pass a label, helper text and validation to the `Input` component directly.

  ### Input accessibility improvements and FormField integration

  The `Input` component has been updated to internally use `FormField`. This allows you to pass props like `label`, `helperText`, and validation status directly to the `Input` component, streamlining its usage.

  We have also greatly improved accessibility behavior. The `Input` component now intelligently constructs `aria-label` and `accessibilityHint` based on the provided label, helper text, and validation state. To support this, `FormField` now has a mechanism to hide its own accessibility elements when a child component is handling them, preventing duplicate announcements.

  #### Affected components
  - `Input`
  - `CurrencyInput`
  - `DatePickerInput`
  - `Textarea`
  - `FormField`

  #### Developer changes

  You can now use `Input`, `CurrencyInput`, `DatePickerInput`, and `Textarea` without explicitly wrapping them in `FormField` for standard layouts:

  ```tsx
  // Before
  <FormField label="Email" helperText="Enter email">
    <Input />
  </FormField>

  // After
  <Input label="Email" helperText="Enter email" />
  ```

  No breaking changes. The `Input` component continues to support being wrapped externally by `FormField`.

  #### References
  - UWDS-4179

- [#803](https://github.com/utilitywarehouse/hearth/pull/803) [`8e96af6`](https://github.com/utilitywarehouse/hearth/commit/8e96af69f3a3498f264f2a6dc2416cdb6a298275) Thanks [@jordmccord](https://github.com/jordmccord)! - 🌟 [FEATURE]: Adds `labelVariant` prop to components with a label

  ### Adds `labelVariant` prop to components with a label

  Added a `labelVariant` prop to allow consumers to choose between a body or heading style for component labels. Defaults to `body`.

  #### Affected components
  - `CheckboxGroup`
  - `FormField`
  - `Label`
  - `RadioGroup`
  - `RadioCard`
  - `Select`
  - `VerificationInput`
  - `Input`
  - `CurrencyInput`
  - `DatePickerInput`
  - `Textarea`

  #### Developer changes

  You can now pass `labelVariant="heading"` to these components to render the label as a heading instead of body text.

  ```tsx
  <FormField label="My Label" labelVariant="heading">
    <Input />
  </FormField>
  ```

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
