# ProgressStepper / ProgressStep / ProgressStepLink / ProgressStepButton

Step indicator for multi-step flows (forms, checkout, onboarding).

```tsx
import {
  ProgressStepper,
  ProgressStep,
  ProgressStepButton,
  ProgressStepLink,
} from '@utilitywarehouse/hearth-react';
```

**ProgressStepper props:** `hideLabels` (boolean), `as` (`'div'` \| `'nav'`)

**All step types share:** `status` (`'complete'` \| `'active'` \| `'incomplete'`), `label`, `disabled`
- `ProgressStep` — static, non-interactive
- `ProgressStepButton` — triggers `onClick`
- `ProgressStepLink` — navigates to `href`

```tsx
// Static display
<ProgressStepper>
  <ProgressStep status="complete" label="Your details" />
  <ProgressStep status="complete" label="Address" />
  <ProgressStep status="active" label="Payment" />
  <ProgressStep status="incomplete" label="Review" />
</ProgressStepper>

// Interactive (controlled by parent)
const getStatus = (step: number) => {
  if (step < currentStep) return 'complete';
  if (step === currentStep) return 'active';
  return 'incomplete';
};

<ProgressStepper>
  {steps.map((step, i) => (
    <ProgressStepButton
      key={step.id}
      status={getStatus(i)}
      label={step.label}
      onClick={() => setCurrentStep(i)}
      disabled={i > currentStep}
    />
  ))}
</ProgressStepper>

// With navigation links
<ProgressStepper as="nav">
  <ProgressStepLink status="complete" href="/details" label="Details" />
  <ProgressStepLink status="active" href="/address" label="Address" />
  <ProgressStepLink status="incomplete" href="/payment" label="Payment" disabled />
</ProgressStepper>
```

**Gotcha:** Status must be managed entirely by the parent — `ProgressStepper` has no internal state.
