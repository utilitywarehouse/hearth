---
'@utilitywarehouse/hearth-react': patch
---

🐛 [FIX]: Disabled or loading `Button`, `IconButton` and `UnstyledIconButton` still submit forms and follow links

These buttons use `aria-disabled` instead of the native `disabled` attribute
so they stay focusable. That only removed their `onClick` handler and didn't
cancel the browser's default action, so a disabled or loading
`type="submit"` button still submitted its form (by click, or by pressing
Enter in a field), and a disabled or loading `asChild` link still navigated.
The default action is now cancelled while disabled or loading.

`UnstyledIconButton` also no longer calls `onClick` while `loading`,
matching `Button` and `IconButton`.

**Components affected**:

- `Button`
- `IconButton`
- `UnstyledIconButton`

**Developer changes**:

No changes required. Removing `href` from disabled `asChild` links is no
longer needed.
