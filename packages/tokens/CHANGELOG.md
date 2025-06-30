# @utilitywarehouse/hearth-tokens

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
