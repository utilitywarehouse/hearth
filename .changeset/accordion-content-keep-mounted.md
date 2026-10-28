---
'@utilitywarehouse/hearth-react': minor
---

💅 [ENHANCEMENT]: `keepMounted` added to `AccordionContent`, `forceMount` deprecated

`AccordionContent` accepts a new `keepMounted` prop to keep collapsed content
mounted in the DOM. `forceMount` is deprecated in favour of it and will be
removed when `Accordion` migrates to Base UI. Passing it logs a warning in
development.

**Developer changes**:

```diff
- <AccordionContent forceMount>Content</AccordionContent>
+ <AccordionContent keepMounted>Content</AccordionContent>
```
