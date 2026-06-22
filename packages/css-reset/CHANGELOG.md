# @utilitywarehouse/css-reset

## 0.1.5

### Patch Changes

- [#1341](https://github.com/utilitywarehouse/hearth/pull/1341) [`2165fd8`](https://github.com/utilitywarehouse/hearth/commit/2165fd820cc879fe169df878944b41e337a06c89) Thanks [@robphoenix](https://github.com/robphoenix)! - 🧹 [HOUSEKEEPING]: Make all packages public

## 0.1.4

### Patch Changes

- [#951](https://github.com/utilitywarehouse/hearth/pull/951) [`25698c1`](https://github.com/utilitywarehouse/hearth/commit/25698c112ed7f0f2b7c1f814481d00ca74561f4a) Thanks [@robphoenix](https://github.com/robphoenix)! - 🐛 [FIX]: Refine cursor style

## 0.1.3

### Patch Changes

- [#700](https://github.com/utilitywarehouse/hearth/pull/700) [`bb556e6`](https://github.com/utilitywarehouse/hearth/commit/bb556e67219e806f0b8ff4fe21d1a7a84a9fa7db) Thanks [@robphoenix](https://github.com/robphoenix)! - Don't use pointer cursor when `aria-disabled` applied

## 0.1.2

### Patch Changes

- [#537](https://github.com/utilitywarehouse/hearth/pull/537) [`86a6726`](https://github.com/utilitywarehouse/hearth/commit/86a6726139c0ced6f323da65ae0270bb1d2a6558) Thanks [@robphoenix](https://github.com/robphoenix)! - Fix `Button` & `Link` font-family, from detail to body text.

## 0.1.1

### Patch Changes

- [#504](https://github.com/utilitywarehouse/hearth/pull/504) [`b0cbecb`](https://github.com/utilitywarehouse/hearth/commit/b0cbecbd19556b088475195be4b030a5ea03677a) Thanks [@robphoenix](https://github.com/robphoenix)! - Fix usage of semantic color tokens

## 0.1.0

### Minor Changes

- [#431](https://github.com/utilitywarehouse/hearth/pull/431) [`4610349`](https://github.com/utilitywarehouse/hearth/commit/4610349c446ad97851327cac4adc75953ff0234b) Thanks [@robphoenix](https://github.com/robphoenix)! - This PR modifies CSS reset behaviour for lists to preserve native list styling by
  default and only remove it when an explicit `role="list"` is present. This aligns
  with accessibility best practices where `role="list"` signals intentional removal
  of semantic list styling.
  - Updates CSS reset to preserve default padding and list styles for `ul` and `ol` elements.
  - Only removes list styling when `role="list"` is explicitly set.
  - Updates the List component to include `role="list"` in props object rather than inline.

  Developers will need to ensure any `ul` & `ol` elements that intend to override
  the default styling have the appropriate role set:

  ```
  <ul role="list">
  <ol role="list">
  ```

## 0.0.4

### Patch Changes

- [#385](https://github.com/utilitywarehouse/hearth/pull/385) [`a299b84`](https://github.com/utilitywarehouse/hearth/commit/a299b8497c1359397d66440101df4079f212aedc) Thanks [@robphoenix](https://github.com/robphoenix)! - Remove `scrollbar-gutter` as it's causing layout shift when using `Modal`

## 0.0.3

### Patch Changes

- [#344](https://github.com/utilitywarehouse/hearth/pull/344) [`2b00d31`](https://github.com/utilitywarehouse/hearth/commit/2b00d3121bbc8ecd42e1d14fc4bedeb6e8cacd22) Thanks [@robphoenix](https://github.com/robphoenix)! - Add default `fieldset` styles

## 0.0.2

### Patch Changes

- [#318](https://github.com/utilitywarehouse/hearth/pull/318) [`227db31`](https://github.com/utilitywarehouse/hearth/commit/227db31e5f07d1377db2fee01196e9342713911d) Thanks [@robphoenix](https://github.com/robphoenix)! - Release update packages

## 0.1.0

### Minor Changes

- [#195](https://github.com/utilitywarehouse/design-systems/pull/195) [`9028320`](https://github.com/utilitywarehouse/design-systems/commit/9028320cebdd6eb3de2761c24fd54cdca35fd409) Thanks [@robphoenix](https://github.com/robphoenix)! - Ensure svg icons do not shrink. This fixes issues when used inside flex containers.

## 0.0.4

### Patch Changes

- [#149](https://github.com/utilitywarehouse/design-systems/pull/149) [`c0cd74d`](https://github.com/utilitywarehouse/design-systems/commit/c0cd74d3ee42649638b6fd9ce05007c2f73a59b8) Thanks [@robphoenix](https://github.com/robphoenix)! - # text-rendering

  Setting text-rendering to `optimizeSpeed` removes kerning & ligatures, and so
  noticeably affects the typography visuals of the Aeonik font. Therefore we will
  set it to `optimizeLegibility` for all heading elements, and in the Web UI
  `Heading` component.
  - https://css-tricks.com/almanac/properties/t/text-rendering/
  - https://marco.org/2012/11/15/text-rendering-optimize-legibility

- [#150](https://github.com/utilitywarehouse/design-systems/pull/150) [`4079bef`](https://github.com/utilitywarehouse/design-systems/commit/4079bef2ae827b1ecb16ea8601a5a8da361a177f) Thanks [@vivaldi-va](https://github.com/vivaldi-va)! - fix all family and generic names being quoted

## 0.0.3

### Patch Changes

- [#147](https://github.com/utilitywarehouse/design-systems/pull/147) [`44ccfeb`](https://github.com/utilitywarehouse/design-systems/commit/44ccfeb988d51e362607a4ce94c9db8bbea097ae) Thanks [@robphoenix](https://github.com/robphoenix)! - Remove `CssBaseline` theme, and stop including the `CssBaseline` component in the `ThemeProvider`. Recommend using `@utilitywarehouse/css-reset` instead.

## 0.0.2

### Patch Changes

- [#145](https://github.com/utilitywarehouse/design-systems/pull/145) [`750cc5d`](https://github.com/utilitywarehouse/design-systems/commit/750cc5db36db17afa6f06650729f5cde68cbc158) Thanks [@robphoenix](https://github.com/robphoenix)! - Initial release of css-reset package
