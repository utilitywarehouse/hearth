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

`loadingDescription` is only rendered when `loadingHeading` is set. Previously
`loadingText` acted as the heading, so a `Modal` with `loadingText` and
`loadingDescription` showed both; after this change that description is no
longer rendered until `loadingText` is replaced with `loadingHeading`. Without a
`loadingHeading` the loading state shows a default "Loading" heading.

Run the codemod to update your code automatically:

```sh
npx @utilitywarehouse/hearth-codemod react/v1/remove-modal-loading-text <path>
```

See the [`v1` migration guide](../docs/migration/v1.docs.mdx) for details.
