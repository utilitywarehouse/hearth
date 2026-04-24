# CardAccordion / CardAccordionItem

Step-by-step accordion with card styling. Each collapsed step shows a summary of the completed data. Use for insurance quotes, complex onboarding, and multi-section forms.

```tsx
import {
  CardAccordion,
  CardAccordionItem,
  CardAccordionFooter,
  CardAccordionButton,
} from '@utilitywarehouse/hearth-react';
```

**CardAccordionItem props:**

| Prop | Values | Notes |
|---|---|---|
| `value` | string | Required — unique step identifier |
| `title` | string | Required — expanded header text |
| `summaryTitle` | string | Collapsed header text |
| `summaryDescription` | ReactNode | Collapsed state content |

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

**Gotcha:** `CardAccordion` is always single-open — only one step is expanded at a time. This is a deliberate UX pattern for guided flows.
