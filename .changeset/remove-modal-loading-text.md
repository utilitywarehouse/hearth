---
'@utilitywarehouse/hearth-react': minor
---

💔 [BREAKING CHANGE]: Remove deprecated `loadingText` prop from `Modal`

`loadingText` was deprecated in favour of `loadingHeading` and
`loadingDescription`, which provide a clearer separation of the loading
heading and description. It has now been removed.

**Components affected**:
- `Modal`

**Developer changes**:

Replace `loadingText` with `loadingHeading`:

```diff
- <Modal loadingText="Loading...">
+ <Modal loadingHeading="Loading...">
```

Run the codemod to update your code automatically:

```sh
npx @utilitywarehouse/hearth-codemod react/v1/remove-modal-loading-text <path>
```

See the [`v1` migration guide](../docs/migration/v1.docs.mdx) for details.
