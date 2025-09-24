# @utilitywarehouse/hearth-react

## 0.10.0

### Minor Changes

- [#498](https://github.com/utilitywarehouse/hearth/pull/498) [`1fa0828`](https://github.com/utilitywarehouse/hearth/commit/1fa0828d0bd6996963c959646f4f2c5c519755c4) Thanks [@robphoenix](https://github.com/robphoenix)! - Add `Accordion` component

### Patch Changes

- [#503](https://github.com/utilitywarehouse/hearth/pull/503) [`e1923f6`](https://github.com/utilitywarehouse/hearth/commit/e1923f63c684dc2b3f7fdc0a27f7a188456600e8) Thanks [@robphoenix](https://github.com/robphoenix)! - Update component display names to include `Hearth` prefix

- [#505](https://github.com/utilitywarehouse/hearth/pull/505) [`21c63d5`](https://github.com/utilitywarehouse/hearth/commit/21c63d5100119cd29e23d9ef093958ba849c9f7d) Thanks [@robphoenix](https://github.com/robphoenix)! - Fix input border colours on focus

- Updated dependencies [[`b0cbecb`](https://github.com/utilitywarehouse/hearth/commit/b0cbecbd19556b088475195be4b030a5ea03677a)]:
  - @utilitywarehouse/hearth-css-reset@0.1.1

## 0.9.0

### Minor Changes

- [#497](https://github.com/utilitywarehouse/hearth/pull/497) [`f109931`](https://github.com/utilitywarehouse/hearth/commit/f1099315f871a0f68c16679ff164978e3f135166) Thanks [@robphoenix](https://github.com/robphoenix)! - Add `IconContainer` component.

- [#495](https://github.com/utilitywarehouse/hearth/pull/495) [`509deb5`](https://github.com/utilitywarehouse/hearth/commit/509deb5e74f54318aaf94a25e6c5d7733d735923) Thanks [@robphoenix](https://github.com/robphoenix)! - Add `CurrencyInput` component

### Patch Changes

- [#500](https://github.com/utilitywarehouse/hearth/pull/500) [`cc49e74`](https://github.com/utilitywarehouse/hearth/commit/cc49e74e3736b9647e8c5576ce45020add258625) Thanks [@jordmccord](https://github.com/jordmccord)! - - Updated dependencies [[`8dac8c1`](https://github.com/utilitywarehouse/hearth/commit/8dac8c1def9083d8e4efa1385e0ee7be23428c46)]:
  - @utilitywarehouse/hearth-react-icons@0.4.0

## 0.8.0

### Minor Changes

- [#477](https://github.com/utilitywarehouse/hearth/pull/477) [`1e9001d`](https://github.com/utilitywarehouse/hearth/commit/1e9001d7790427f4fe80991093e116b80da58f57) Thanks [@robphoenix](https://github.com/robphoenix)! - Refactor `SectionHeader` & `List` APIs.

  Both `SectionHeader` and `List` now have a single `link` prop, which accepts a
  `Link` component to be rendered. All other `link` prefixed props have been
  removed and are now handled directly by the Link component, including the
  rendering of child icons.

  ```tsx
  <SectionHeader
    heading="Heading"
    helperText="Helper text"
    link={
      <Link>
        Link text
        <ChevronRightSmallIcon />
      </Link>
    }
  />
  ```

## 0.7.0

### Minor Changes

- [#428](https://github.com/utilitywarehouse/hearth/pull/428) [`8486120`](https://github.com/utilitywarehouse/hearth/commit/848612059721f1b524a0c659907b2994c85079ef) Thanks [@dorota-uw](https://github.com/dorota-uw)! - Added image prop to radio/checkbox

- [#470](https://github.com/utilitywarehouse/hearth/pull/470) [`6a27b8b`](https://github.com/utilitywarehouse/hearth/commit/6a27b8b8c6c8b97255801963815f8bbbd015a835) Thanks [@robphoenix](https://github.com/robphoenix)! - Badge updates. This is a breaking change.

  - Add `size` prop
  - Change font family, font size & line-height
  - Rename `solid` variant to `emphasis`
  - Add `subtle` variant
  - Add colorSchemes: `pig`, `highlight`, `energy`, `mobile`, `broadband`,
    `insurance`, `cashback`

- [#438](https://github.com/utilitywarehouse/hearth/pull/438) [`53327a6`](https://github.com/utilitywarehouse/hearth/commit/53327a6011799fb681569c42fc1fcd03bcfb481b) Thanks [@robphoenix](https://github.com/robphoenix)! - Rename `colorScheme` prop values. This is a breaking change.

  The values for the `colorScheme` prop have been updated to reflect the
  introduction of semantic design tokens. The values have been renamed as below:

  - `white` -> `neutralStrong`
  - `warmWhite` -> `neutralSubtle`
  - `blue` -> `info`
  - `green` -> `positive`
  - `green` -> `affirmative`
  - `red` -> `danger`
  - `red` -> `destructive`
  - `orange` -> `warning`
  - `yellow` -> `highlight`
  - `grey` -> `functional`

  The changes will be dependent on the intent and usage of specific components.
  The following components are included in this change:

  - `Alert`
  - `Badge`
  - `Button`
  - `IconButton`
  - `Card`
  - `List`

  You will need to update all usages of the above components.

- [#473](https://github.com/utilitywarehouse/hearth/pull/473) [`dcd34d0`](https://github.com/utilitywarehouse/hearth/commit/dcd34d0b4c1e8223b2b07667cb81407ba2f197eb) Thanks [@robphoenix](https://github.com/robphoenix)! - Refactor token CSS & Browser files. This is a breaking change, only affecting
  usage of CSS and browser JS tokens.

  - Individual component files have been combined into a single components tokens
    file.
  - Typography and Device tokens (mobile, tablet & desktop) have been included in
    the components tokens file.
  - Layout spacing tokens have been included in the space tokens file.
  - Line-height & letter-spacing tokens have been included in the font tokens
    file.

  There is now a more concise set of individual tokens files:

  - border.{css,ts}
  - color.{css,ts}
  - components.{css,ts}
  - font.{css,ts}
  - semantic.{css,ts}
  - space.{css,ts}

  This change will only affect you if you are importing tokens via specific file
  imports. This change does not affect you if you are importing the complete set
  of design tokens from an index impyou if you are importing the complete set of
  design tokens from an index import.

### Patch Changes

- [#474](https://github.com/utilitywarehouse/hearth/pull/474) [`e04cb1a`](https://github.com/utilitywarehouse/hearth/commit/e04cb1a8cac1e341f63d116602626accbfbe3778) Thanks [@robphoenix](https://github.com/robphoenix)! - Add 'highlight' & 'pig' colorSchemes to `Card` component.

## 0.6.3

### Patch Changes

- [#453](https://github.com/utilitywarehouse/hearth/pull/453) [`4450350`](https://github.com/utilitywarehouse/hearth/commit/445035075c4797de2d7dba942312fea9b6a70850) Thanks [@robphoenix](https://github.com/robphoenix)! - Hearth React Icons has been moved from a peer dependency to a direct dependency.

## 0.6.2

### Patch Changes

- [#434](https://github.com/utilitywarehouse/hearth/pull/434) [`9e845f3`](https://github.com/utilitywarehouse/hearth/commit/9e845f3d428ce052547b9aa33e553a2a45abe4a6) Thanks [@robphoenix](https://github.com/robphoenix)! - Update `Alert` component to use semantic tokens.

## 0.6.1

### Patch Changes

- Updated dependencies [[`4610349`](https://github.com/utilitywarehouse/hearth/commit/4610349c446ad97851327cac4adc75953ff0234b)]:
  - @utilitywarehouse/hearth-css-reset@0.1.0

## 0.6.0

### Minor Changes

- [#409](https://github.com/utilitywarehouse/hearth/pull/409) [`705fabd`](https://github.com/utilitywarehouse/hearth/commit/705fabd5f2eb4e3d810e31b7b0dbd95acf6abc92) Thanks [@dorota-uw](https://github.com/dorota-uw)! - New component: SectionHeader

### Patch Changes

- [#405](https://github.com/utilitywarehouse/hearth/pull/405) [`53348d8`](https://github.com/utilitywarehouse/hearth/commit/53348d85f7c1761e25608075f1302cdee75f7636) Thanks [@dorota-uw](https://github.com/dorota-uw)! - Aded useMediaQuery to exports

- [#413](https://github.com/utilitywarehouse/hearth/pull/413) [`bb2ec8d`](https://github.com/utilitywarehouse/hearth/commit/bb2ec8d2c959440b765fb15c5563313a4d9194bf) Thanks [@dorota-uw](https://github.com/dorota-uw)! - Additional parameters for SectionHeader

## 0.5.0

### Minor Changes

- [#392](https://github.com/utilitywarehouse/hearth/pull/392) [`a5799b5`](https://github.com/utilitywarehouse/hearth/commit/a5799b57eabd594bfc36c4dd88beb3d01f840855) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds `Alert` component

### Patch Changes

- [#399](https://github.com/utilitywarehouse/hearth/pull/399) [`29e0fad`](https://github.com/utilitywarehouse/hearth/commit/29e0fada11caa73942215e943e27007f252a3510) Thanks [@dorota-uw](https://github.com/dorota-uw)! - Minor CSS fixes

- [#400](https://github.com/utilitywarehouse/hearth/pull/400) [`e24b717`](https://github.com/utilitywarehouse/hearth/commit/e24b717a1ff7b1f82a39d0bf51b53ebfe8c508d0) Thanks [@jordmccord](https://github.com/jordmccord)! - Copies fixed tokens to from tokens package

## 0.4.1

### Patch Changes

- [#389](https://github.com/utilitywarehouse/hearth/pull/389) [`7bfe96e`](https://github.com/utilitywarehouse/hearth/commit/7bfe96e2725e0cf28b1dd000113b7b9a8a719ee4) Thanks [@robphoenix](https://github.com/robphoenix)! - Minor `ListItem` updates

## 0.4.0

### Minor Changes

- [#384](https://github.com/utilitywarehouse/hearth/pull/384) [`f245ac6`](https://github.com/utilitywarehouse/hearth/commit/f245ac6bf973bea29c75e05ef497b350342ac446) Thanks [@robphoenix](https://github.com/robphoenix)! - Rename `Dialog` to `Modal`

### Patch Changes

- [#385](https://github.com/utilitywarehouse/hearth/pull/385) [`a299b84`](https://github.com/utilitywarehouse/hearth/commit/a299b8497c1359397d66440101df4079f212aedc) Thanks [@robphoenix](https://github.com/robphoenix)! - Fix opacity on `Modal`

- [#386](https://github.com/utilitywarehouse/hearth/pull/386) [`536c180`](https://github.com/utilitywarehouse/hearth/commit/536c180c4ec9dd258b35c5ab6450493153f84ac3) Thanks [@robphoenix](https://github.com/robphoenix)! - Refactor `ListItem` API to be more ergonomic

- Updated dependencies [[`a299b84`](https://github.com/utilitywarehouse/hearth/commit/a299b8497c1359397d66440101df4079f212aedc)]:
  - @utilitywarehouse/hearth-css-reset@0.0.4

## 0.3.0

### Minor Changes

- [#380](https://github.com/utilitywarehouse/hearth/pull/380) [`bcd134d`](https://github.com/utilitywarehouse/hearth/commit/bcd134dd0244610fbe620d61521ec80e4da77432) Thanks [@robphoenix](https://github.com/robphoenix)! - Remove hearth-tokens dependency in favour of copying CSS tokens directly into hearth-react

### Patch Changes

- [#336](https://github.com/utilitywarehouse/hearth/pull/336) [`bee5a98`](https://github.com/utilitywarehouse/hearth/commit/bee5a98654407abed24c68d46b0ea8a13d109ff3) Thanks [@robphoenix](https://github.com/robphoenix)! - Add `Dialog` component

## 0.2.4

### Patch Changes

- [#376](https://github.com/utilitywarehouse/hearth/pull/376) [`15a44b7`](https://github.com/utilitywarehouse/hearth/commit/15a44b72d44f8c938736d3a36f492d0c5c5e12cd) Thanks [@robphoenix](https://github.com/robphoenix)! - This change eases the getting started process, and the tokens release process, by including the CSS Reset and tokens CSS in the React library, making them dependencies rather than peer dependencies.

## 0.2.3

### Patch Changes

- [#364](https://github.com/utilitywarehouse/hearth/pull/364) [`b13601c`](https://github.com/utilitywarehouse/hearth/commit/b13601c2fb5514bed981b8d4c5e953e7d0278d90) Thanks [@robphoenix](https://github.com/robphoenix)! - Implement colour tokens changes in Hearth React

- Updated dependencies [[`9209c2c`](https://github.com/utilitywarehouse/hearth/commit/9209c2ca44723bb34530afa04e27345912de8309)]:
  - @utilitywarehouse/hearth-tokens@0.0.4

## 0.2.2

### Patch Changes

- [#356](https://github.com/utilitywarehouse/hearth/pull/356) [`9fc957a`](https://github.com/utilitywarehouse/hearth/commit/9fc957ae46165c48cff27b08bfeb9f2384a1d5a1) Thanks [@robphoenix](https://github.com/robphoenix)! - Remove `ListItem` padding when not inside a Card container

## 0.2.1

### Patch Changes

- Updated dependencies [[`f15f6b9`](https://github.com/utilitywarehouse/hearth/commit/f15f6b98f9b679fb3953457d53aad056efbde66a)]:
  - @utilitywarehouse/hearth-tokens@0.0.3

## 0.2.0

### Minor Changes

- [#344](https://github.com/utilitywarehouse/hearth/pull/344) [`2b00d31`](https://github.com/utilitywarehouse/hearth/commit/2b00d3121bbc8ecd42e1d14fc4bedeb6e8cacd22) Thanks [@robphoenix](https://github.com/robphoenix)! - Remove public `Fieldset` component

### Patch Changes

- [#340](https://github.com/utilitywarehouse/hearth/pull/340) [`37752fd`](https://github.com/utilitywarehouse/hearth/commit/37752fd19150e8f87de3456ab8e6caea6f7bf031) Thanks [@robphoenix](https://github.com/robphoenix)! - Add `paddingNone` prop to Button component

- [#340](https://github.com/utilitywarehouse/hearth/pull/340) [`37752fd`](https://github.com/utilitywarehouse/hearth/commit/37752fd19150e8f87de3456ab8e6caea6f7bf031) Thanks [@robphoenix](https://github.com/robphoenix)! - Fix full width `emphasis` Button

- [#344](https://github.com/utilitywarehouse/hearth/pull/344) [`2b00d31`](https://github.com/utilitywarehouse/hearth/commit/2b00d3121bbc8ecd42e1d14fc4bedeb6e8cacd22) Thanks [@robphoenix](https://github.com/robphoenix)! - Fix `TextInput` aria-describedby

- [#344](https://github.com/utilitywarehouse/hearth/pull/344) [`2b00d31`](https://github.com/utilitywarehouse/hearth/commit/2b00d3121bbc8ecd42e1d14fc4bedeb6e8cacd22) Thanks [@robphoenix](https://github.com/robphoenix)! - Remove `width` prop from CheckboxGroup & RadioGroup

- [#340](https://github.com/utilitywarehouse/hearth/pull/340) [`37752fd`](https://github.com/utilitywarehouse/hearth/commit/37752fd19150e8f87de3456ab8e6caea6f7bf031) Thanks [@robphoenix](https://github.com/robphoenix)! - Update Solid yellow inverted button appearance

## 0.1.0

### Minor Changes

- [#332](https://github.com/utilitywarehouse/hearth/pull/332) [`84fc288`](https://github.com/utilitywarehouse/hearth/commit/84fc2881c8145b3996d8b777bb10f89d3894aca6) Thanks [@robphoenix](https://github.com/robphoenix)! - Remove `FormFieldGroup`, moving functionality into `Fieldset`

### Patch Changes

- [#335](https://github.com/utilitywarehouse/hearth/pull/335) [`3760552`](https://github.com/utilitywarehouse/hearth/commit/376055238111998b98ceacee8a5188bb0b854604) Thanks [@robphoenix](https://github.com/robphoenix)! - Update radix-ui deps

## 0.0.5

### Patch Changes

- [#329](https://github.com/utilitywarehouse/hearth/pull/329) [`7095cb5`](https://github.com/utilitywarehouse/hearth/commit/7095cb58d56a2013d44695900601381832e33a81) Thanks [@robphoenix](https://github.com/robphoenix)! - Update `Button` width

- [#328](https://github.com/utilitywarehouse/hearth/pull/328) [`93d4c42`](https://github.com/utilitywarehouse/hearth/commit/93d4c4255c5c65c301ffe5c6c51e4421536f5ad9) Thanks [@robphoenix](https://github.com/robphoenix)! - Update Radix UI dependencies

## 0.0.4

### Patch Changes

- [#323](https://github.com/utilitywarehouse/hearth/pull/323) [`2fe3180`](https://github.com/utilitywarehouse/hearth/commit/2fe31804a1b82816a6883b4b02235c5914696ac2) Thanks [@robphoenix](https://github.com/robphoenix)! - Update `ButtonBase` props to guard against using `asChild` with the emphasis variant

- [#326](https://github.com/utilitywarehouse/hearth/pull/326) [`2b84c74`](https://github.com/utilitywarehouse/hearth/commit/2b84c74ff3c654f335a2586aff87ec162a384d0e) Thanks [@robphoenix](https://github.com/robphoenix)! - Remove responsiveness from `textTransform` prop

- [#322](https://github.com/utilitywarehouse/hearth/pull/322) [`c2f4396`](https://github.com/utilitywarehouse/hearth/commit/c2f439679a181672f259469005336b10e3a1a105) Thanks [@robphoenix](https://github.com/robphoenix)! - Add missing height and width CSS classes

- [#325](https://github.com/utilitywarehouse/hearth/pull/325) [`78724b7`](https://github.com/utilitywarehouse/hearth/commit/78724b7bb9a2fc24364b65341ffcb1f4cec396f2) Thanks [@robphoenix](https://github.com/robphoenix)! - Clarify flex and grid align & justify props

## 0.0.3

### Patch Changes

- Updated dependencies [[`227db31`](https://github.com/utilitywarehouse/hearth/commit/227db31e5f07d1377db2fee01196e9342713911d)]:
  - @utilitywarehouse/hearth-tokens@0.0.2

## 0.0.2

### Patch Changes

- [#308](https://github.com/utilitywarehouse/hearth/pull/308) [`87b3423`](https://github.com/utilitywarehouse/hearth/commit/87b342367903387b9e170aec16c7b40a05067a4f) Thanks [@robphoenix](https://github.com/robphoenix)! - Update react dependency

- Updated dependencies [[`87b3423`](https://github.com/utilitywarehouse/hearth/commit/87b342367903387b9e170aec16c7b40a05067a4f)]:
  - @utilitywarehouse/hearth-react-icons@0.1.1

## 0.0.1

### Patch Changes

- [#304](https://github.com/utilitywarehouse/hearth/pull/304) [`5810141`](https://github.com/utilitywarehouse/hearth/commit/5810141353f0f96c4d651c0679edabd9b7e027d2) Thanks [@robphoenix](https://github.com/robphoenix)! - Release bump

- [#304](https://github.com/utilitywarehouse/hearth/pull/304) [`5810141`](https://github.com/utilitywarehouse/hearth/commit/5810141353f0f96c4d651c0679edabd9b7e027d2) Thanks [@robphoenix](https://github.com/robphoenix)! - Exploring release options

- [#302](https://github.com/utilitywarehouse/hearth/pull/302) [`7ad972a`](https://github.com/utilitywarehouse/hearth/commit/7ad972a504a6b6354fdd24f040031eb6251533c1) Thanks [@robphoenix](https://github.com/robphoenix)! - Initial alpha release
