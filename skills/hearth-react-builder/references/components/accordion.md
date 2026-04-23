# Accordions

## Accordion

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

---

## CardAccordion

A step-by-step accordion with card styling. Each collapsed step shows a summary of the completed data.

```tsx
import {
  CardAccordion,
  CardAccordionItem,
  CardAccordionFooter,
  CardAccordionButton,
} from '@utilitywarehouse/hearth-react';
```

**CardAccordionItem props:**

| Prop | Values |
|---|---|
| `value` | string — unique step identifier |
| `title` | string — expanded header text |
| `summaryTitle` | string — collapsed header text |
| `summaryDescription` | React node — collapsed state content |
| `children` | React node — expanded content |

**CardAccordionButton props:** `action` (`'next'` \| `'previous'`)

```tsx
<CardAccordion>
  <CardAccordionItem
    value="cover"
    title="1a. Your new cover"
    summaryTitle="1a. Your home"
    summaryDescription={
      <Flex direction="column" gap="100">
        <HelperText>Type of cover, address & start date</HelperText>
        <BodyText size="lg">31/08/2025</BodyText>
      </Flex>
    }
  >
    {/* Form fields for step 1 */}
    <TextInput label="Property address" />
    <DateInput label="Cover start date" />
    <CardAccordionFooter>
      <CardAccordionButton action="next" />
    </CardAccordionFooter>
  </CardAccordionItem>

  <CardAccordionItem
    value="personal"
    title="1b. Your personal details"
    summaryTitle="1b. Your details"
    summaryDescription={
      <Flex direction="column" gap="100">
        <HelperText>Name & date of birth</HelperText>
        <BodyText size="lg">Rob Phoenix</BodyText>
      </Flex>
    }
  >
    <TextInput label="Full name" />
    <DateInput label="Date of birth" />
    <CardAccordionFooter>
      <CardAccordionButton action="previous" />
      <CardAccordionButton action="next" />
    </CardAccordionFooter>
  </CardAccordionItem>
</CardAccordion>
```

**Use case:** Insurance quotes, complex onboarding, multi-section forms where earlier steps need to show a summary when the user advances.

**Gotcha:** `CardAccordion` is always `type="single"` — only one step is expanded at a time. This is a deliberate UX pattern for guided flows.
