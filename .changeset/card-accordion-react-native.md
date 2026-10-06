---
'@utilitywarehouse/hearth-react-native': minor
---

### Added `CardAccordion` component

Splits a long form into ordered steps, each in its own card. Completed steps collapse to a summary with an Edit button, the current step is expanded, and upcoming steps show only their heading. Mirrors the `CardAccordion` API in `@utilitywarehouse/hearth-react`.

```tsx
import {
  CardAccordion,
  CardAccordionButton,
  CardAccordionFooter,
  CardAccordionItem,
} from '@utilitywarehouse/hearth-react-native';

<CardAccordion>
  <CardAccordionItem value="step-1" title="Step 1: Personal details">
    {/* form fields */}
    <CardAccordionFooter>
      <CardAccordionButton action="next" />
    </CardAccordionFooter>
  </CardAccordionItem>
  <CardAccordionItem value="step-2" title="Step 2: Address details">
    {/* form fields */}
    <CardAccordionFooter>
      <CardAccordionButton action="previous" />
      <CardAccordionButton action="next" />
    </CardAccordionFooter>
  </CardAccordionItem>
</CardAccordion>;
```

- Cards animate their height between steps, and the animation is skipped when reduce motion is on.
- Supports controlled (`value`/`onValueChange`) and uncontrolled (`defaultValue`) use.
- Call `event.preventDefault()` in a `CardAccordionButton`'s `onPress` to keep the user on the current step, for example when validation fails.
