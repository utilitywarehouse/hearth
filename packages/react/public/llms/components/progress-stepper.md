# ProgressStepper

Use the `ProgressStepper` component to show users their progress through a multi-step process.

- [Usage](#usage)
- [Step states](#step-states)
- [Accessability](#accessability)
- [API](#api)

```tsx
<Flex direction="column" gap="400">
  <BodyText weight="bold">Step {currentStep + 1} Content</BodyText>
  <ProgressStepper {...args}>
    <ProgressStep status={getStatus(0)} label="Customer data" />
    <ProgressStep status={getStatus(1)} label="Shipping data" />
    <ProgressStep status={getStatus(2)} label="Payment data" />
    <ProgressStep status={getStatus(3)} label="Summary" />
  </ProgressStepper>
  <Flex gap="200">
    <Button
      disabled={currentStep === 0}
      onClick={() => {
        if (currentStep > 0) setCurrentStep(s => s - 1);
      }}
    >
      Prev
    </Button>
    <Button
      disabled={currentStep === 3}
      onClick={() => {
        if (currentStep < 3) setCurrentStep(s => s + 1);
      }}
    >
      Next
    </Button>
  </Flex>
</Flex>
```

## Usage

There are 3 step components for different scenarios. Do not mix these step
types, they should not be used together.

- `ProgressStep` is a static step
- `ProgressStepButton` is an interactive step for use when the step requires an action
- `ProgressStepLink` is an interactive step for use when the step requires navigation

Wrap the steps in a `ProgressStepper` components.

```tsx
<ProgressStepper>
  <ProgressStep status="complete" label="Customer data"/>
  <ProgressStep status="complete" label="Shipping data"/>
  <ProgressStep status="active" label="Payment data"/>
  <ProgressStep status="incomplete" label="Summary"/>
</ProgressStepper>

[...]

<ProgressStepper>
  <ProgressStepLink status="complete" href="#customer-data" label="Customer data" />
  <ProgressStepLink status="complete" href="#shipping-data" label="Shipping data" />
  <ProgressStepLink status="active" href="#payment-data" label="Payment data" />
  <ProgressStepLink status="incomplete" label="Summary" />
</ProgressStepper>

[...]

<ProgressStepper >
  <ProgressStepButton status="complete" label="Customer data" onClick={setStep('shipping')} />
  <ProgressStepButton status="complete" label="Shipping data" onClick={setStep('payment')} />
  <ProgressStepButton status="active" label="Payment data" onClick={setStep('summary')} />
  <ProgressStepButton status="incomplete" label="Summary" />
</ProgressStepper>
```

## Step states

Each step can have one of three states:

- `complete`
- `active`
- `incomplete`

The `ProgressStepButton` and `ProgressStepLink` components will render a static
step when they have an `active` status.

To prevent users interacting with a `ProgressStepButton` or `ProgressStepLink`
component, use the `disabled` prop. This will prevent click events and remove
the href attribute.

## Step Labels

Each step requires a label, this should be clear and descriptive to guide the user.

The `hideLabels` prop will visually hide the step labels but keep them available for screen readers.

## Accessability

- Use the `as` prop to render the stepper as `nav` when it represents site/app navigation; otherwise use the default `div`.
- Add `name` to `ProgressStepper` when using `nav` as element and having multiple navigations on the page.
- Any `aria-label` value passed to a progress step will be appended to the default `aria-label`.

## API

This component is based on the `div` element and supports the following common props:

- Margin

| Prop           | Type                                                                                                                                                                                                       | Default | Description                 |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | --------------------------- |
| `hideLabels`   | `boolean`                                                                                                                                                                                                  | `false` | Whether to hide step labels |
| `margin`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                             |
| `marginTop`    | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                             |
| `marginRight`  | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                             |
| `marginBottom` | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                             |
| `marginLeft`   | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                             |
| `marginX`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                             |
| `marginY`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                             |
| `as`           | `"div" \| "nav"`                                                                                                                                                                                           | —       |                             |

### ProgressStep API

| Prop     | Type                                     | Default | Description                            |
| -------- | ---------------------------------------- | ------- | -------------------------------------- |
| `label`  | `string`                                 | —       | The label text to display for the step |
| `status` | `"complete" \| "active" \| "incomplete"` | —       | The current status of the step         |

### ProgressStepLink API

This component is based on the `a` element.

| Prop      | Type                                     | Default | Description                                                                                          |
| --------- | ---------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `label`   | `string`                                 | —       | The label text to display for the step                                                               |
| `status`  | `"complete" \| "active" \| "incomplete"` | —       | The current status of the step                                                                       |
| `asChild` | `boolean`                                | —       | Change the default rendered element for the one passed as a child, merging their props and behavior. |

### ProgressStepButton API

This component is based on the `button` element.

| Prop     | Type                                     | Default | Description                            |
| -------- | ---------------------------------------- | ------- | -------------------------------------- |
| `label`  | `string`                                 | —       | The label text to display for the step |
| `status` | `"complete" \| "active" \| "incomplete"` | —       | The current status of the step         |
