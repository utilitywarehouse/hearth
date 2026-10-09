---
'@utilitywarehouse/hearth-react': major
---

💔 [BREAKING CHANGE]: `Accordion` `type` prop replaced by `multiple`; `collapsible` removed; `value`/`defaultValue`/`onValueChange` always arrays; `AccordionContent` `forceMount` removed

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
- `AccordionContent: forceMount` — removed entirely; use `keepMounted` instead.

**Developer changes**:

```diff
- <Accordion type="single" collapsible defaultValue="item-1">
+ <Accordion defaultValue={['item-1']}>
-   <AccordionContent forceMount>...</AccordionContent>
+   <AccordionContent keepMounted>...</AccordionContent>
  </Accordion>
```
