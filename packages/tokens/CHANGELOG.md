# @utilitywarehouse/hearth-tokens

## 0.4.0

### Minor Changes

- [#1330](https://github.com/utilitywarehouse/hearth/pull/1330) [`8a6b5f8`](https://github.com/utilitywarehouse/hearth/commit/8a6b5f869ef8f9f815f7070ae40d0151f5e2fba3) Thanks [@robphoenix](https://github.com/robphoenix)! - 💔 [BREAKING_CHANGE]: Prune unused tokens from Hearth Tokens package.

  The following tokens have been removed:

  **Colors**

  - `blue`: 0, 50, 100, 300, 500, 800, 950, 1000
  - `broadbandGreen`: 0, 50, 100, 400, 500, 600, 700, 950, 1000
  - `cashbackLilac`: 0, 50, 100, 200, 400, 600, 800, 950, 1000
  - `energyBlue`: 0, 50, 100, 400, 500, 600, 800, 950, 1000
  - `green`: 0, 300
  - `insuranceOrange`: 0, 50, 100, 200, 500, 600, 700, 950, 1000
  - `mobileRose`: 0, 50, 100, 300, 500, 600, 700, 950, 1000
  - `orange`: 0, 50, 100, 300, 800, 950, 1000
  - `piggyPink`: 0, 50, 100, 400, 500, 600, 700, 950, 1000
  - `purple`: 0, 50, 500, 600, 950
  - `red`: 0, 200
  - `warmWhite`: 0, 400, 500, 600, 700, 975
  - `yellow`: 0, 50, 100, 700, 800, 950, 1000

  **Border**

  - `borderRadius.lg`

  **Font**

  - `fontSize`: 50, 75, 600, 700, 800, 900, 1000
  - `fontWeight.heavy`

  **Letter spacing**

  - `letterSpacing`: 0, 50, 75, 550, 600, 700, 800, 900, 1000

  **Line height**

  - `lineHeight`: 50, 75, 100, 900, 1000, 1100, 1200

  **Space**

  - `space[1000]`

### Patch Changes

- [#1330](https://github.com/utilitywarehouse/hearth/pull/1330) [`8a6b5f8`](https://github.com/utilitywarehouse/hearth/commit/8a6b5f869ef8f9f815f7070ae40d0151f5e2fba3) Thanks [@robphoenix](https://github.com/robphoenix)! - 💅 [ENHANCEMENT]: Generate and build Hearth tokens

- [#1330](https://github.com/utilitywarehouse/hearth/pull/1330) [`8a6b5f8`](https://github.com/utilitywarehouse/hearth/commit/8a6b5f869ef8f9f815f7070ae40d0151f5e2fba3) Thanks [@robphoenix](https://github.com/robphoenix)! - 💅 [ENHANCEMENT]: Add `xl` variant to `BodyText` tokens

## 0.3.1

### Patch Changes

- [#1296](https://github.com/utilitywarehouse/hearth/pull/1296) [`b27a7d5`](https://github.com/utilitywarehouse/hearth/commit/b27a7d5fff096da2639f225262d58c24cbaf46f5) Thanks [@robphoenix](https://github.com/robphoenix)! - 💅 [ENHANCEMENT]: Generate and build Hearth tokens

## 0.3.0

### Minor Changes

- [#1259](https://github.com/utilitywarehouse/hearth/pull/1259) [`782d1e6`](https://github.com/utilitywarehouse/hearth/commit/782d1e6bac63b706aafc537d88433d3f0cd468d4) Thanks [@robphoenix](https://github.com/robphoenix)! - 💔 [BREAKING CHANGE]: Some tokens have been removed

  The following token changes are being released.
  - Delete tabs/divider/colour variable. This is obsolete now we have border/strong
  - Delete alert/focus variable. It’s not used anywhere
  - Tweaked card action component because it wasn’t using the card action/content/padding-horizontal, card action/content/padding-vertical and card action/content/gap variables properly
  - Altered value of checkbox/group/gap and applied it to all checkbox groups
  - Applied list/item/gap variable to list item component
  - Added frame to Modal Image?=True and added modal/content/gap variable
  - Applied switch/padding variable to switch component
  - Added card accordion variables (only 3 in total)
  - Added list/indicator/padding variable
  - Added pagination/item/gap variable
  - Updated segmented control/group/padding variable and applied it to component

  This is the first release of tokens for quite a while, so there may be some
  undocumented changes.

## 0.2.4

### Patch Changes

- [#1007](https://github.com/utilitywarehouse/hearth/pull/1007) [`ca97a43`](https://github.com/utilitywarehouse/hearth/commit/ca97a435c316498243d44dea42d6e2c6a3707c0c) Thanks [@robphoenix](https://github.com/robphoenix)! - 🐛 [FIX]: Add exports field to Hearth Tokens package.json

## 0.2.3

### Patch Changes

- [#906](https://github.com/utilitywarehouse/hearth/pull/906) [`bb84710`](https://github.com/utilitywarehouse/hearth/commit/bb84710bf370f821b9da5e50f9844341bbdfa888) Thanks [@jordmccord](https://github.com/jordmccord)! - 💅 [ENHANCEMENT]: Update skeleton loading background colour

  Updated the skeleton loading background colour to improve visual consistency across components. The new colour provides better contrast and a more refined loading experience.

  **Developer changes**:

  No changes required. The colour tokens will be automatically updated when you upgrade to this version.

## 0.2.2

### Patch Changes

- [#716](https://github.com/utilitywarehouse/hearth/pull/716) [`e754226`](https://github.com/utilitywarehouse/hearth/commit/e7542265dea0bdb79d6eb200c811fea75bd4a23d) Thanks [@robphoenix](https://github.com/robphoenix)! - Add new typography tokens

## 0.2.1

### Patch Changes

- [#695](https://github.com/utilitywarehouse/hearth/pull/695) [`1e5f3c4`](https://github.com/utilitywarehouse/hearth/commit/1e5f3c45241fc3893d6b3ead394dcc6cb978a72c) Thanks [@robphoenix](https://github.com/robphoenix)! - regenerate tokens

## 0.2.0

### Minor Changes

- [#662](https://github.com/utilitywarehouse/hearth/pull/662) [`b0ba9a2`](https://github.com/utilitywarehouse/hearth/commit/b0ba9a260f2236f3094c169cd3fb841392f05b79) Thanks [@robphoenix](https://github.com/robphoenix)! - Add shadow colours to `Card`, extract layout spacing tokens to own file and add shadow tokens.

## 0.1.3

### Patch Changes

- [#549](https://github.com/utilitywarehouse/hearth/pull/549) [`5407963`](https://github.com/utilitywarehouse/hearth/commit/54079632cdb4a9c6175c53e86b53a61f79dc30d8) Thanks [@robphoenix](https://github.com/robphoenix)! - Enable Hearth tokens to be used in some props.

## 0.1.2

### Patch Changes

- [#556](https://github.com/utilitywarehouse/hearth/pull/556) [`088f801`](https://github.com/utilitywarehouse/hearth/commit/088f80101013360f6c81d2333281ff6f8dab9779) Thanks [@robphoenix](https://github.com/robphoenix)! - Make all component tokens available for the browser

## 0.1.1

### Patch Changes

- [#534](https://github.com/utilitywarehouse/hearth/pull/534) [`9860516`](https://github.com/utilitywarehouse/hearth/commit/986051691c3cfec9eded814a2da882dad76dfda4) Thanks [@robphoenix](https://github.com/robphoenix)! - Handle heading width px tokens

## 0.1.0

### Minor Changes

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

## 0.0.9

### Patch Changes

- [#434](https://github.com/utilitywarehouse/hearth/pull/434) [`9e845f3`](https://github.com/utilitywarehouse/hearth/commit/9e845f3d428ce052547b9aa33e553a2a45abe4a6) Thanks [@robphoenix](https://github.com/robphoenix)! - Include Semantic tokens

## 0.0.8

### Patch Changes

- [#410](https://github.com/utilitywarehouse/hearth/pull/410) [`22cf96c`](https://github.com/utilitywarehouse/hearth/commit/22cf96c17d8ebf4f3c90264b1345a2a2131d7722) Thanks [@jordmccord](https://github.com/jordmccord)! - Updated semantic tokens and removes obsolete component tokens

## 0.0.7

### Patch Changes

- [#399](https://github.com/utilitywarehouse/hearth/pull/399) [`29e0fad`](https://github.com/utilitywarehouse/hearth/commit/29e0fada11caa73942215e943e27007f252a3510) Thanks [@dorota-uw](https://github.com/dorota-uw)! - Minor CSS fixes

- [#400](https://github.com/utilitywarehouse/hearth/pull/400) [`e24b717`](https://github.com/utilitywarehouse/hearth/commit/e24b717a1ff7b1f82a39d0bf51b53ebfe8c508d0) Thanks [@jordmccord](https://github.com/jordmccord)! - Adds semantic theme tokens

## 0.0.6

### Patch Changes

- [#384](https://github.com/utilitywarehouse/hearth/pull/384) [`f245ac6`](https://github.com/utilitywarehouse/hearth/commit/f245ac6bf973bea29c75e05ef497b350342ac446) Thanks [@robphoenix](https://github.com/robphoenix)! - Rename `Dialog` to `Modal`

## 0.0.5

### Patch Changes

- [#336](https://github.com/utilitywarehouse/hearth/pull/336) [`bee5a98`](https://github.com/utilitywarehouse/hearth/commit/bee5a98654407abed24c68d46b0ea8a13d109ff3) Thanks [@robphoenix](https://github.com/robphoenix)! - Add `Dialog` component

## 0.0.4

### Patch Changes

- [#371](https://github.com/utilitywarehouse/hearth/pull/371) [`9209c2c`](https://github.com/utilitywarehouse/hearth/commit/9209c2ca44723bb34530afa04e27345912de8309) Thanks [@robphoenix](https://github.com/robphoenix)! - This change is to release the updated colour tokens. The light and dark colour scales have been combined into a single scale that can be used across both light and dark themes. This change also adds initial semantic tokens.

## 0.0.3

### Patch Changes

- [#347](https://github.com/utilitywarehouse/hearth/pull/347) [`f15f6b9`](https://github.com/utilitywarehouse/hearth/commit/f15f6b98f9b679fb3953457d53aad056efbde66a) Thanks [@robphoenix](https://github.com/robphoenix)! - - **Automated Index File Generation**:
  - **CSS Index**: The `create_css_index` action was implemented to automatically generate an `index.css` file. This action reads all CSS files in the build directory, filters out `index.css` itself, and creates `@import` statements for each CSS file, ensuring that all styles are included in the main CSS file.
  - **JavaScript Index**: The `create_browser_index` action was similarly implemented to generate an `index.js` file. This action reads all JavaScript files in the build directory, filters out `index.js` itself, and creates export statements for each JavaScript file, ensuring that all modules are accessible through the main JavaScript file.

  These changes streamline the process of maintaining the index files, reducing the need for manual updates and ensuring that all generated files are correctly included in the respective index files.

## 0.0.2

### Patch Changes

- [#318](https://github.com/utilitywarehouse/hearth/pull/318) [`227db31`](https://github.com/utilitywarehouse/hearth/commit/227db31e5f07d1377db2fee01196e9342713911d) Thanks [@robphoenix](https://github.com/robphoenix)! - Release update packages
