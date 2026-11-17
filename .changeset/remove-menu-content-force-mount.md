---
'@utilitywarehouse/hearth-react': major
---

💔 [BREAKING CHANGE]: `MenuContent` `forceMount` removed in favour of `keepMounted`

`forceMount` was a deprecated alias for `keepMounted`. It has now been removed,
matching `AccordionContent`.

**Components affected**:

- `MenuContent`

**Developer changes**:

Replace `forceMount` with `keepMounted`:

```diff
- <MenuContent forceMount>
+ <MenuContent keepMounted>
```

Run the codemod to migrate usages:

```sh
npx @utilitywarehouse/hearth-codemod react/v1/migrate-menu <path>
```

See the [`v1` migration guide](https://github.com/utilitywarehouse/hearth/blob/main/packages/react/docs/migration/v1.docs.mdx) for details.
