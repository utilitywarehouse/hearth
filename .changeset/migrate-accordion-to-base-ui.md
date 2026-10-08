---
'@utilitywarehouse/hearth-react': minor
---

💔 [BREAKING CHANGE]: Migrate `Accordion` from Radix UI to Base UI

`Accordion` now uses Base UI internally instead of Radix UI. This brings a
simpler, more robust height-animation implementation, but changes a few parts
of the public API.

**Components affected**:

- `Accordion`
- `AccordionContent`

**Breaking changes**:

- `Accordion: type="single"` — remove `type`, the accordion now defaults to single-select behaviour.
- `Accordion: type="multiple"` — replace with `multiple`. Do not simply omit `type` — the new default is single-select, so omitting it silently changes behaviour.
- `Accordion: collapsible` — removed entirely; single-mode panels are now always collapsible.
- `Accordion: value` / `defaultValue` — must now always be an array, regardless of `multiple`, e.g. `defaultValue="item-1"` becomes `defaultValue={['item-1']}`.
- `Accordion: onValueChange` — now always receives an array as its first argument.

**Deprecations** (still work, log a dev-mode warning):

- `AccordionContent: forceMount` is deprecated. Use `keepMounted` instead.

**Developer changes**:

```diff
- <Accordion type="single" collapsible defaultValue="item-1">
+ <Accordion defaultValue={['item-1']}>
-   <AccordionContent forceMount>...</AccordionContent>
+   <AccordionContent keepMounted>...</AccordionContent>
  </Accordion>
```

**Consumer migration prompt**

Paste the following into an agent to update all Accordion usages in your codebase:

```
I'm upgrading @utilitywarehouse/hearth-react. The Accordion component has migrated
from Radix UI to Base UI internally. The following changes affect consumers:

BREAKING:
  - `Accordion: type="single"` → remove `type`, accordion defaults to single-select behaviour
  - `Accordion: type="multiple"` → replace with `multiple`. Do not simply omit `type` — the new default is single-select, so omitting it silently changes behaviour.
  - `Accordion: collapsible` → remove entirely; single-mode panels are now always collapsible
  - `Accordion: value` / `defaultValue` → must now always be an array, e.g.
    `defaultValue="item-1"` becomes `defaultValue={['item-1']}`
  - `Accordion: onValueChange` → now always receives an array as its first argument

DEPRECATED (still works, logs a dev-mode warning):
  - `AccordionContent: forceMount` → use `keepMounted` instead

Please search this codebase for all usages of Accordion imported from
'@utilitywarehouse/hearth-react' and apply the above changes. Do not change any
other logic, styling, or structure. After making changes, run TypeScript to
confirm no type errors remain.
```
