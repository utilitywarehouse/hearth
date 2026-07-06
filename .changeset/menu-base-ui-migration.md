---
"@utilitywarehouse/hearth-react": minor
---

💅 [ENHANCEMENT]: Migrate `Menu` from Radix UI to Base UI.

**Deprecations:**

- `MenuItem: onSelect` is deprecated. Use `onClick` instead — it fires for both mouse and keyboard activation. `onSelect` continues to work with a dev-mode warning.
- `MenuItem: textValue` is deprecated. Use `label` instead — it is used for accessibility and keyboard navigation. `textValue` continues to work with a dev-mode warning.
- `MenuContent: forceMount` is deprecated. Use `keepMounted` instead. `forceMount` continues to work with a dev-mode warning.

## Consumer migration prompt

Paste the following into an agent to update all Menu usages in your codebase:

```
I'm upgrading @utilitywarehouse/hearth-react. The Menu component has migrated
from Radix UI to Base UI internally. The following prop changes affect consumers:

RENAMED (deprecated — old name still works but logs a dev-mode warning):
  - `MenuItem: onSelect` → `onClick`: Base UI uses standard React onClick for
    both mouse and keyboard activation.
  - `MenuItem: textValue` → `label`: used for keyboard text navigation and
    accessibility.
  - `MenuContent: forceMount` → `keepMounted`: aligned with Base UI's API.

Please search this codebase for all usages of MenuItem and MenuContent imported
from '@utilitywarehouse/hearth-react' and apply the following changes:
  - Replace every `onSelect=` on MenuItem with `onClick=`
  - Replace every `textValue=` on MenuItem with `label=`
  - Replace every `forceMount` on MenuContent with `keepMounted`

Do not change any other logic, styling, or structure. After making changes,
run TypeScript to confirm no type errors remain.
```
