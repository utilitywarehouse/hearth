---
'@utilitywarehouse/hearth-react': minor
---

🌟 [FEATURE]: Add `CardAccordion` component

`CardAccordion` breaks a form journey into multiple collapsible cards, allowing
users to progress step-by-step on a single page while keeping previously
completed steps visible and editable. Each card represents one logical step in
the journey. As the user progresses, completed cards collapse into a summary
view while the next card expands.

```tsx
<CardAccordion>
  <CardAccordionItem value="step-1" title="Step 1: Personal details">
    ...
    <CardAccordionFooter>
      <CardAccordionButton action="next" />
    </CardAccordionFooter>
  </CardAccordionItem>
  <CardAccordionItem value="step-2" title="Step 2: Address details">
    ...
    <CardAccordionFooter>
      <CardAccordionButton action="previous" />
      <CardAccordionButton action="next" />
    </CardAccordionFooter>
  </CardAccordionItem>
  <CardAccordionItem value="step-3" title="Step 3: Payment details">
    ...
    <CardAccordionFooter>
      <CardAccordionButton action="previous" />
    </CardAccordionFooter>
  </CardAccordionItem>
</CardAccordion>
```
