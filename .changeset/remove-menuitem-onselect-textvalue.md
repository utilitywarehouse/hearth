---
'@utilitywarehouse/hearth-react': major
---

💔 [BREAKING CHANGE]: `MenuItem` `onSelect` and `textValue` props removed

`onSelect` and `textValue` were deprecated aliases of `onClick` and `label`, kept during the Base UI migration. They have now been removed.

**Components affected**:
- `MenuItem`

**Developer changes**:

Use `onClick` and `label` instead:

```diff
- <MenuItem onSelect={handleSelect} textValue="Edit">Edit</MenuItem>
+ <MenuItem onClick={handleSelect} label="Edit">Edit</MenuItem>
```

Run the codemod to update your code automatically:

```sh
npx @utilitywarehouse/hearth-codemod react/v1/migrate-menu <path>
```

See the [`v1` migration guide](../packages/react/docs/migration/v1.docs.mdx) for details.
