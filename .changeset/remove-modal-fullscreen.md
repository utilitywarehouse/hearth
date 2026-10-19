---
'@utilitywarehouse/hearth-react': major
---

💔 [BREAKING CHANGE]: Remove deprecated `fullScreen` prop from `Modal`

`fullScreen` has had no effect since `Modal` stopped forcing a 90vh desktop
height, and has been marked `@deprecated` since. It has now been removed.

**Components affected**:
- `Modal`

**Developer changes**:

Remove `fullScreen`:

```diff
- <Modal fullScreen>
+ <Modal>
```

Run the codemod to update your code automatically:

```sh
npx @utilitywarehouse/hearth-codemod react/v1/remove-modal-fullscreen <path>
```

See the [`v1` migration guide](../docs/migration/v1.docs.mdx) for details.
