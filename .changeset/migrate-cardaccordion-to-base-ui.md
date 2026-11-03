---
'@utilitywarehouse/hearth-react': major
---

💔 [BREAKING CHANGE]: `CardAccordion` `value`/`onValueChange` always arrays

`CardAccordion` now uses Base UI internally instead of Radix UI, matching
`Accordion`'s own migration. A step always stays open as before — this is now
preserved internally rather than via a `collapsible` prop, since Base UI has
no such prop.

**Components affected**:

- `CardAccordion`

**Breaking changes**:

- `CardAccordion: value` / `onValueChange` — must now always be an array, e.g.
  `value="step-1"` becomes `value={['step-1']}`, and `onValueChange` now
  receives a `string[]` as its argument.

**Developer changes**:

```diff
- <CardAccordion value="step-1" onValueChange={(value) => ...}>
+ <CardAccordion value={['step-1']} onValueChange={(value) => ...}>
```

A jscodeshift codemod for this change is tracked separately (UWDS-5255) and
is not yet available.
