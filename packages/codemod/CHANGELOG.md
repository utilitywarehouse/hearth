# @utilitywarehouse/hearth-codemod

## 0.1.1

### Patch Changes

- [#1794](https://github.com/utilitywarehouse/hearth/pull/1794) [`37ea798`](https://github.com/utilitywarehouse/hearth/commit/37ea798152d66a484f32ebd5f737d3a584f2b5cd) Thanks [@robphoenix](https://github.com/robphoenix)! - 🌟 [FEATURE]: `AccordionContent`'s deprecated `forceMount` prop can be replaced with `keepMounted` by codemod
  
  `react/v1/remove-accordion-content-force-mount` renames `forceMount` to
  `keepMounted`. It is included in `react/pre-v1/migration`, so it can be run on
  the current release before upgrading to `v1`.
  
  ```sh
  npx @utilitywarehouse/hearth-codemod react/v1/remove-accordion-content-force-mount <path...>
  ```

## 0.1.0

### Minor Changes

- [#1778](https://github.com/utilitywarehouse/hearth/pull/1778) [`35e39b5`](https://github.com/utilitywarehouse/hearth/commit/35e39b57ca21d64ad7ae7b64c13394fbd4b76424) Thanks [@robphoenix](https://github.com/robphoenix)! - 🌟 [FEATURE]: `@utilitywarehouse/hearth-codemod` package available
  
  A new CLI package that rewrites deprecated Hearth props to their replacements,
  so you can migrate towards the `v1` API ahead of its release instead of
  updating usages by hand.
  
  ```sh
  npx @utilitywarehouse/hearth-codemod <codemod> <path...>
  ```
  
  Available codemods:
  
  - `react/v1/migrate-menu` — `MenuItem`'s `onSelect` → `onClick` and
    `textValue` → `label`, `MenuContent`'s `forceMount` → `keepMounted`
  - `react/v1/remove-modal-fullscreen` — removes `Modal`'s no-op `fullScreen`
  - `react/v1/remove-modal-loading-text` — `Modal`'s `loadingText` →
    `loadingHeading`
  - `react/v1/remove-text-wrap-prop` — `wrap` → `textWrap` on `BodyText`,
    `Heading`, `Strong`, `Em` and `DetailText`
  - `react/v1/migration` — runs all of the above in one pass
  
  Usages that can't be rewritten safely are left unchanged and reported with
  their file and line. See the package [README](../packages/codemod/README.md)
  and the [`v1` migration guide](../packages/react/docs/migration/v1.docs.mdx)
  for details.

- [#1789](https://github.com/utilitywarehouse/hearth/pull/1789) [`da6fec3`](https://github.com/utilitywarehouse/hearth/commit/da6fec33e9a491f7d2748e11f286eecd84cbb043) Thanks [@robphoenix](https://github.com/robphoenix)! - 💅 [ENHANCEMENT]: Non-breaking codemods can be run on their own before upgrading to `v1`
  
  `react/pre-v1/migration` runs only the non-breaking codemods, so you can apply
  them on the current release and upgrade later. `react/v1/migration` runs those
  plus any breaking-change codemods, and individual `react/v1/<name>` codemods
  are unchanged.
  
  ```sh
  npx @utilitywarehouse/hearth-codemod react/pre-v1/migration <path...>
  ```
