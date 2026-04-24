# Accordion / AccordionItem

Expandable content sections. Use for FAQs, help content, and progressive disclosure.

```tsx
import {
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionTrigger,
  AccordionContent,
} from '@utilitywarehouse/hearth-react';
```

**Accordion props:**

| Prop | Values | Notes |
|---|---|---|
| `type` | `'single'` \| `'multiple'` | Required |
| `heading` | string | Section title above all items |
| `headingElement` | `'div'` \| `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` | |
| `helperText` | string | |
| `collapsible` | boolean | Single type only — allows closing all items |
| `disabled` | boolean | Disables all items |
| `defaultValue` | `string` or `string[]` | Initially open items |

**AccordionItem props:**

| Prop | Values |
|---|---|
| `value` | string — **required**, unique per item |
| `title` | string — item header text |
| `headingElement` | `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` |
| `disabled` | boolean |

---

### Standard usage

```tsx
// Multiple items open (FAQ)
<Accordion type="multiple" heading="Frequently asked questions" headingElement="h2">
  <AccordionItem value="what" title="What is Utility Warehouse?">
    <AccordionContent>
      <BodyText size="md">
        Utility Warehouse is a multi-service provider offering energy,
        broadband, mobile, and insurance.
      </BodyText>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="how" title="How do I switch?">
    <AccordionContent>
      <BodyText size="md">Switching takes just a few minutes online.</BodyText>
    </AccordionContent>
  </AccordionItem>
</Accordion>

// Single item open at a time (collapsible)
<Accordion type="single" collapsible defaultValue="energy">
  <AccordionItem value="energy" title="Energy">
    <AccordionContent>
      <BodyText size="md">Your energy account details...</BodyText>
    </AccordionContent>
  </AccordionItem>
  <AccordionItem value="broadband" title="Broadband">
    <AccordionContent>
      <BodyText size="md">Your broadband account details...</BodyText>
    </AccordionContent>
  </AccordionItem>
</Accordion>
```

### Custom header (with badge or icon)

Use `AccordionHeader` + `AccordionTrigger` when you need more than a plain text title:

```tsx
<AccordionItem value="energy">
  <AccordionHeader>
    <AccordionTrigger>
      <Flex width="100%" justifyContent="between" alignItems="center">
        <Flex gap="200" alignItems="center">
          <ElectricitySmallIcon />
          <BodyText weight="semibold">Energy</BodyText>
        </Flex>
        <Badge colorScheme="positive">Smart meter</Badge>
      </Flex>
    </AccordionTrigger>
  </AccordionHeader>
  <AccordionContent>
    <BodyText size="md">Account details...</BodyText>
  </AccordionContent>
</AccordionItem>
```

**Accessibility:**
- Item `value` must be unique within the accordion
- Use `headingElement` to fit the accordion correctly into the page's heading hierarchy
- Keyboard navigation (Space/Enter to toggle) is automatic

**Gotchas:**
- All item content renders in the DOM — not lazy-loaded
- `collapsible` only applies to `type="single"`
- When `collapsible` is false on single type, one item is always open

See [CardAccordion.md](CardAccordion.md) for the card-styled accordion used in guided flows.
