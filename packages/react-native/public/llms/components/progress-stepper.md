# Progress Stepper

A form helper component that displays a series of dots connected by lines, showing the progress through a multi-step process. Each step can be marked as completed, active, or uncompleted.

- [Usage](#usage)
- [Examples](#examples)
- [API](#api)
- [Step Statuses](#step-statuses-1)
- [Accessibility](#accessibility)
- [Best Practices](#best-practices)

## Usage

The `ProgressStepper` component uses a compound component pattern, making it easy to define steps declaratively. It provides visual feedback about complete steps, the current active step, and remaining incomplete steps.

### Basic Usage

```tsx
// Example usage
import { ProgressStepper, ProgressStep } from '@utilitywarehouse/hearth-react-native';

<ProgressStepper>
  <ProgressStep id={'1'} status="complete" />
  <ProgressStep id={'2'} status="complete" />
  <ProgressStep id={'3'} status="active" />
  <ProgressStep id={'4'} status="incomplete" />
  <ProgressStep id={'5'} status="incomplete" />
</ProgressStepper>;
```

### Default Layout

```tsx
// Example usage
<ProgressStepper>
  (
  <Flex spacing="xl" direction="column" align="center" style={{ flex: 1, minWidth: 200 }}>
    <ProgressStepper>
      <ProgressStep id={'1'} status="complete" />
      <ProgressStep id={'2'} status="complete" />
      <ProgressStep id={'3'} status="active" />
      <ProgressStep id={'4'} status="incomplete" />
    </ProgressStepper>
    <Flex direction="row" spacing="lg" style={{ width: '100%' }}>
      <ProgressStep id={'1'} status="complete" />
    </Flex>
    <Flex direction="row" spacing="lg" style={{ width: '100%' }}>
      <ProgressStep id={'3'} status="active" />
    </Flex>
    <Flex direction="row" spacing="lg" style={{ width: '100%' }}>
      <ProgressStep id={'5'} status="incomplete" />
    </Flex>
  </Flex>
  )
</ProgressStepper>
```

### Step Statuses

See how different step statuses are visualized:

```tsx
// Example usage
<Flex spacing="xl" direction="column" align="center">
  <VariantTitle title="All Uncompleted Steps">
    <ProgressStepper {...props}>
      <ProgressStep id={'1'} status="incomplete" />
      <ProgressStep id={'2'} status="incomplete" />
      <ProgressStep id={'3'} status="incomplete" />
    </ProgressStepper>
  </VariantTitle>
  <VariantTitle title="One Active Step">
    <ProgressStepper {...props}>
      <ProgressStep id={'1'} status="active" />
      <ProgressStep id={'2'} status="incomplete" />
      <ProgressStep id={'3'} status="incomplete" />
    </ProgressStepper>
  </VariantTitle>
  <VariantTitle title="Mixed Statuses">
    <ProgressStepper {...props}>
      <ProgressStep id={'1'} status="complete" />
      <ProgressStep id={'2'} status="complete" />
      <ProgressStep id={'3'} status="active" />
      <ProgressStep id={'4'} status="incomplete" />
    </ProgressStepper>
  </VariantTitle>
  <VariantTitle title="All Completed">
    <ProgressStepper {...props}>
      <ProgressStep id={'1'} status="complete" />
      <ProgressStep id={'2'} status="complete" />
      <ProgressStep id={'3'} status="complete" />
    </ProgressStepper>
  </VariantTitle>
</Flex>
```

### Basic

```tsx
// Example usage
<Flex spacing="lg" direction="column" align="center">
  <Heading size="md">Progress Stepper</Heading>
  <BodyText>Shows progress through multi-step processes</BodyText>
  <ProgressStepper {...props}>
    <ProgressStep id="services-data" status="complete" />
    <ProgressStep id="customer-data" status="complete" />
    <ProgressStep id="shipping-data" status="active" />
    <ProgressStep id="payment-data" status="incomplete" />
    <ProgressStep id="summary" status="incomplete" />
  </ProgressStepper>
  <BodyText>Step 3 of 5</BodyText>
</Flex>
```

### Progress Stepper Props

| Prop       | Type        | Default  | Description               |
| ---------- | ----------- | -------- | ------------------------- |
| `children` | `ReactNode` | Required | `ProgressStep` components |

### Progress Step Props

| Prop     | Type                                     | Default  | Description                    |
| -------- | ---------------------------------------- | -------- | ------------------------------ |
| `id`     | `string`                                 | Required | Unique identifier for the step |
| `status` | `'complete' \| 'active' \| 'incomplete'` | Required | Current status of the step     |

## Step Statuses

- **complete**: Step has been finished, shows a checkmark icon
- **active**: Current step, shows a number with highlighted background
- **incomplete**: Future step, shows a number with muted styling

## Accessibility

- Each step is properly labeled for screen readers
- The component follows WCAG guidelines for color contrast
- Progress indication is communicated through both visual and textual means

## Best Practices

1. **Keep it simple** - The stepper focuses on essential functionality without complexity
1. **Indicate progress clearly** - Make sure users understand how many steps remain
1. **Use meaningful IDs** - Choose IDs that make sense for your specific use case (numbers, step names, etc.)
