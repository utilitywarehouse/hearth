---
"@utilitywarehouse/hearth-react": patch
---

💅 [ENHANCEMENT]: `forceMount` support for `AccordionContent` and `MenuContent`

When `forceMount` is set, content remains in the DOM at all times — making it
indexable by search engine crawlers — while still being hidden from view and the
accessibility tree when closed.

**Components affected**:

- `AccordionContent`
- `MenuContent`

**Developer changes**:

No changes required. Pass `forceMount` to opt in:

```tsx
<Accordion>
  <AccordionItem value="item-1">
    <AccordionTrigger>Trigger</AccordionTrigger>
    <AccordionContent forceMount>Content</AccordionContent>
  </AccordionItem>
</Accordion>
```

```tsx
<Menu>
  <MenuTrigger>
    <Button>Open</Button>
  </MenuTrigger>
  <MenuContent forceMount>
    <MenuItem>Item</MenuItem>
  </MenuContent>
</Menu>
```
