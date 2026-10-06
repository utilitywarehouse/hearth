---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: `CardAccordion` for multi-step forms

`CardAccordion` splits a long form into ordered steps, each in its own card. Completed steps collapse to a summary with an Edit button, the current step is expanded, and upcoming steps show only their heading. It is the React Native counterpart of `CardAccordion` in `@utilitywarehouse/hearth-react`.

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

- Cards animate their height between steps. The animation is skipped when reduce motion is on.
- Supports controlled (`value`/`onValueChange`) and uncontrolled (`defaultValue`) use.
- Call `event.preventDefault()` in a `CardAccordionButton`'s `onPress` to keep the user on the current step, for example when validation fails.

Differences from the web component: the edit callback is `onEditPress` (web: `onEditClick`), the edit label is set with `editButtonText`, there is no `headingElement` prop, and an initial `value` sets the first current step.

**Components affected**:

- `CardAccordion`
- `CardAccordionItem`
- `CardAccordionFooter`
- `CardAccordionButton`
