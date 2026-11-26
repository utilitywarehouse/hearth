# @utilitywarehouse/hearth-cli

## 0.2.0

### Minor Changes

- [#1879](https://github.com/utilitywarehouse/hearth/pull/1879) [`11895ea`](https://github.com/utilitywarehouse/hearth/commit/11895ea6b1da9ce57f5d09c1ceea1f05502bb9fd) Thanks [@robphoenix](https://github.com/robphoenix)! - 🌟 [FEATURE]: `hearth changes <package>` shows what changed in a Hearth package since the installed version
  
  Lists every changelog entry after the version installed in your project, up to and including the latest version on
  npm, with breaking changes first and a count of entries by type. Use it before an upgrade, or to check whether a newer
  Hearth release already provides what you are about to write.
  
  ```sh
  hearth changes react
  hearth changes tokens --from 0.4.0 --to 0.5.1 --json
  ```
  
  The command reads the latest version from `registry.npmjs.org` and the changelog from `raw.githubusercontent.com`. When
  either cannot be reached, it exits `3` and says which host failed.

### Patch Changes

- Updated dependencies [[`c3f6b4b`](https://github.com/utilitywarehouse/hearth/commit/c3f6b4bb1e8ea4bc29e85d829016bc6f8cff09f7), [`16f8fc9`](https://github.com/utilitywarehouse/hearth/commit/16f8fc952e61728dbd0e179583ac4b1674ad5df6)]:
  - @utilitywarehouse/hearth-svg-assets@0.7.0

## 0.1.0

### Minor Changes

- [#1856](https://github.com/utilitywarehouse/hearth/pull/1856) [`0dbee18`](https://github.com/utilitywarehouse/hearth/commit/0dbee186e49efa77e0ffd9e06e71112ecd2cb4db) Thanks [@robphoenix](https://github.com/robphoenix)! - 🌟 [FEATURE]: `hearth` CLI available through `npx @utilitywarehouse/hearth-cli` to look up tokens, icons and assets from the Hearth packages installed in a project
