---
name: hearth-react-component-reference
description: >
  Find the right @utilitywarehouse/hearth-react component for a UI task and understand
  its props, accessibility requirements, and usage patterns. Use this skill whenever
  you're working with the Hearth design system — selecting a component, configuring
  props, using a complex composed component (Modal, CardAccordion, Combobox), ensuring
  a component is accessible, or unsure which component to use for a given UI need.
  Also use it when asked to check prop names or APIs for any hearth-react component.
---

# hearth-react Component Reference

@utilitywarehouse/hearth-react is a React 18/19 component library with 60+ accessible,
design-token-driven components for Utility Warehouse web products.

## Getting started

### Install

```bash
yarn add @utilitywarehouse/hearth-react @utilitywarehouse/hearth-react-icons @utilitywarehouse/hearth-fonts
```

### Root imports

```tsx
import '@utilitywarehouse/hearth-fonts';
import '@utilitywarehouse/hearth-react/styles.css';
```

### HearthProvider

Wrap your app at root. Required for Tooltip (and future providers).

```tsx
import { HearthProvider } from '@utilitywarehouse/hearth-react';

function App({ children }) {
  return <HearthProvider>{children}</HearthProvider>;
}
```

Toast requires a **separate** `ToastProvider` (not included in HearthProvider):

```tsx
import { ToastProvider } from '@utilitywarehouse/hearth-react';
<ToastProvider>{children}</ToastProvider>
```

## Component catalog

| Category | Components |
|---|---|
| Layout | Box, Flex, Grid, Container — see `build-with-hearth-react` skill |
| Typography | Heading, BodyText, DetailText, Label, HelperText, ValidationText, Strong, Em, InlineLink |
| Buttons & links | Button, IconButton, UnstyledIconButton, Link |
| Text inputs | TextInput, PasswordInput, SearchInput, CurrencyInput, DateInput, VerificationInput |
| Select / autocomplete | Select, Combobox |
| Choices | Checkbox, CheckboxGroup, CheckboxTile, RadioGroup (Radio, RadioTile, RadioCard), Switch |
| Other form | TextArea, DatePicker |
| Overlays | Modal, Toast, Tooltip, Menu |
| Feedback | Alert, Badge, Spinner, ProgressBar, ProgressStepper, Skeleton |
| Navigation | Breadcrumbs, Tabs, Pagination |
| Display | Card, CardAccordion, Accordion, DescriptionList, Table, SectionHeader, HighlightBanner, ToggleButtonCard, Avatar, Divider, IconContainer |

All components: `import { ... } from '@utilitywarehouse/hearth-react'`
Icons: `import { ... } from '@utilitywarehouse/hearth-react-icons'`

## Critical failure modes

These are the most common mistakes — most cause silent accessibility failures.

### 1. Using FormField directly (CRITICAL)

`FormField` is internal. All form inputs self-manage their own label, helper text,
and validation. Use them directly.

```tsx
// WRONG
<FormField label="Name" id="name"><TextInput id="name" /></FormField>

// CORRECT
<TextInput label="Name" id="name" />
```

Applies to: TextInput, Select, Combobox, Checkbox, RadioGroup, TextArea, etc.

### 2. Missing loadingTitle on Skeleton (CRITICAL)

`loadingTitle` is required for screen reader announcement — there is no default.
The wrapping container also needs `aria-busy`.

```tsx
// WRONG — silent accessibility failure
<Skeleton><SkeletonHeading width="60%" /></Skeleton>

// CORRECT
<div aria-busy={isLoading}>
  {isLoading ? (
    <Skeleton loadingTitle="user profile">
      <SkeletonHeading width="60%" />
      <SkeletonBodyText lines="3" />
    </Skeleton>
  ) : <ActualContent />}
</div>
```

### 3. Missing label on IconButton (CRITICAL)

`label` is the accessible name. It's required but TypeScript doesn't enforce it.

```tsx
// WRONG
<IconButton variant="ghost" colorScheme="functional"><MenuIcon /></IconButton>

// CORRECT
<IconButton label="Open menu" variant="ghost" colorScheme="functional"><MenuIcon /></IconButton>
```

### 4. Not using HearthProvider (HIGH)

Tooltip silently fails without `TooltipProvider`. `HearthProvider` is the recommended approach.

```tsx
// At app root
<HearthProvider>{children}</HearthProvider>
```

### 5. Invalid Button/IconButton variant + colorScheme (HIGH)

These are discriminated unions — wrong combinations render with no colour.

- `emphasis` / `solid` → only `highlight`
- `outline` / `ghost` → `functional`, `affirmative`, or `destructive`

```tsx
// WRONG (TypeScript error + renders colourless)
<Button variant="emphasis" colorScheme="functional" />

// CORRECT
<Button variant="emphasis" colorScheme="highlight" />
<Button variant="outline" colorScheme="destructive" />
```

### 6. Omitting accessible label from Checkbox or Radio (HIGH)

`label` is optional in TypeScript but always required in practice.
Without it, provide `aria-label` or `aria-labelledby`.

```tsx
// WRONG — no accessible name
<Checkbox value="agree" />

// CORRECT
<Checkbox label="I agree to the terms and conditions" value="agree" />
```

### 7. Using deprecated loadingText on Modal (MEDIUM)

`loadingText` is deprecated since v0.27.3. Use `loadingHeading` + `loadingDescription`.

```tsx
// DEPRECATED
<Modal loading loadingText="Please wait..." />

// CORRECT
<Modal loading loadingHeading="Please wait..." loadingDescription="Submitting your details" />
```

### 8. RadioTile not filling in row layout (MEDIUM)

Since v0.25.0 RadioTile defaults to content-hug. Use `flex="1"` to fill.

```tsx
// Hugs content (current default)
<RadioGroup direction="row"><RadioTile value="a" label="Option A" /></RadioGroup>

// Fills available space
<RadioGroup direction="row">
  <RadioTile flex="1" value="a" label="Option A" />
  <RadioTile flex="1" value="b" label="Option B" />
</RadioGroup>
```

### 9. Adding colorScheme, shadowColor, or Divider to a Card containing CardActions (MEDIUM)

`CardActions` manages its own visual treatment and renders its own top separator automatically.
Set colour on `leadingIconContainerColorScheme` of the individual action items, not on the Card.
`shadowColor` is for interactive cards with `CardInteraction` — don't apply it to cards with `CardActions`.

```tsx
// WRONG — colorScheme and Divider conflict with CardActions
<Card colorScheme="broadband">
  <BodyText>Content</BodyText>
  <Divider />
  <CardActions>...</CardActions>
</Card>

// CORRECT — neutral Card, content in CardContent, colour on individual action items
<Card>
  <CardContent direction="column" gap="200">
    <BodyText>Content</BodyText>
  </CardContent>
  <CardActions direction="column">
    <CardActionButton
      leadingIcon={<BroadbandMediumIcon />}
      leadingIconContainerColorScheme="broadband"
      heading="Broadband"
      helperText="Some detail"
    />
  </CardActions>
</Card>
```

## Key component APIs

### Button

| Prop | Type |
|---|---|
| `variant` | `'emphasis' \| 'solid' \| 'outline' \| 'ghost'` |
| `colorScheme` | `'highlight' \| 'functional' \| 'affirmative' \| 'destructive'` |
| `size` | `Responsive<'sm' \| 'md'>` |
| `inverted` | `boolean` — use on dark backgrounds (UW Purple/Dark Purple); omitting on Emphasis breaks focus ring |
| `asChild` | `boolean` — **not supported** with `emphasis` variant |
| `loading` | `boolean` |

Disabled state uses `aria-disabled` (stays keyboard-focusable).

**Variant semantics** — wrong variant is a common UX mistake:

- `emphasis` — standalone hero or promotional CTA (one per screen, e.g., "Get started" on a marketing page). **Do not use in forms.**
- `solid` — primary action in forms and regular UI (e.g., "Save changes", "Continue")
- `outline` — secondary action alongside a primary (e.g., "Cancel", "Back")
- `ghost` — low-emphasis action (icon buttons, inline or tertiary actions)

Form buttons should be **left-aligned** (matching form inputs), not right-justified.

```tsx
// Form actions — solid primary, outline secondary, left-aligned
<Flex gap="200">
  <Button variant="solid" colorScheme="highlight">Save changes</Button>
  <Button variant="outline" colorScheme="functional">Cancel</Button>
</Flex>
```

```tsx
// Render as Next.js Link
<Button asChild variant="solid" colorScheme="highlight">
  <NextLink href="/next">Continue</NextLink>
</Button>
```

### Modal

Composed from: `ModalRoot` → `ModalTrigger` → `Modal` → [`ModalContent`] → [`ModalFooter`] → `ModalClose`

```tsx
<ModalRoot>
  <ModalTrigger><Button>Open</Button></ModalTrigger>
  <Modal heading="Confirm action" description="This cannot be undone.">
    <ModalFooter>
      <ModalClose><Button variant="ghost" colorScheme="functional">Cancel</Button></ModalClose>
      <ModalClose><Button variant="solid" colorScheme="highlight">Confirm</Button></ModalClose>
    </ModalFooter>
  </Modal>
</ModalRoot>
```

Use `ModalContent` to wrap long scrollable content. Use `fullScreen` on Modal for long mobile content.
Add `isolation: isolate` to your app root element for correct portal z-index stacking.

### TextInput and other form inputs

All form inputs share the same pattern: `label`, `helperText`, `validationStatus`, `validationText`, `required`.

```tsx
<TextInput
  label="Email address"
  helperText="We'll never share your email"
  required
  validationStatus="invalid"
  validationText="Enter a valid email address"
/>
```

`hideLabel` visually hides the label while keeping it accessible. For grouped inputs, use
`<fieldset>/<legend>`. Add `noValidate` to the form to suppress browser validation UI.

### Select

```tsx
<Select label="Choose an option">
  <SelectItem value="1">Item 1</SelectItem>
  <SelectItem value="2">Item 2</SelectItem>
</Select>
```

### Combobox

```tsx
import { Combobox, useComboboxFilter } from '@utilitywarehouse/hearth-react';

const { contains } = useComboboxFilter({ value });

<Combobox
  label="Search fruits"
  items={fruits}
  filter={contains}
  value={value}
  onValueChange={setValue}
/>
```

Use `triggerOnlyOnType` for lookup-style inputs (postcodes, addresses). Use `statusText`
to announce async loading state to screen readers.

### RadioGroup

```tsx
<RadioGroup label="Choose an option" direction="row">
  <RadioTile flex="1" value="a" label="Option A" />
  <RadioTile flex="1" value="b" label="Option B" />
</RadioGroup>
```

Variants: `Radio` (bare), `RadioTile` (most common), `RadioCard` (with children for extra content).

### Skeleton

```tsx
<div aria-busy={isLoading}>
  {isLoading ? (
    <Skeleton loadingTitle="user profile">
      <SkeletonHeading width="60%" />
      <SkeletonBodyText lines="3" />
      <SkeletonBox width="64px" height="64px" borderRadius="full" />
    </Skeleton>
  ) : <ActualContent />}
</div>
```

### CardAccordion

A step-by-step form journey. Each step has three states: `previous` (collapsed, editable),
`current` (expanded, active), `future` (locked).

```tsx
<CardAccordion>
  <CardAccordionItem value="step-1" title="Step 1: Personal details">
    {/* form inputs */}
    <CardAccordionFooter>
      <CardAccordionButton action="next" />
    </CardAccordionFooter>
  </CardAccordionItem>
  <CardAccordionItem
    value="step-2"
    title="Step 2: Address"
    summaryTitle="Step 2: Address"
    summaryDescription={<HelperText>123 Main St</HelperText>}
  >
    {/* form inputs */}
    <CardAccordionFooter>
      <CardAccordionButton action="previous" />
      <CardAccordionButton action="next" />
    </CardAccordionFooter>
  </CardAccordionItem>
</CardAccordion>
```

### Card

Static content container. Use `CardInteraction` for clickable cards, `CardActions` for action lists.

```tsx
// Static card
<Card direction="column" gap="200">
  <Heading size="sm">Title</Heading>
  <BodyText>Content</BodyText>
</Card>

// Interactive card (CardInteraction extends click area to card bounds)
<Card shadowColor="broadband">
  <Heading size="sm">Broadband</Heading>
  <CardInteraction asChild>
    <Link href="/broadband">View plan <ChevronRightSmallIcon /></Link>
  </CardInteraction>
</Card>

// Card with action list (CardContent + CardActions)
<Card>
  <CardContent direction="column" gap="200">
    <Heading size="md">Your services</Heading>
  </CardContent>
  <CardActions direction="column">
    <CardActionButton
      leadingIcon={<BroadbandMediumIcon />}
      leadingIconContainerColorScheme="broadband"
      heading="Broadband"
      helperText="100Mbps"
    />
    <CardActionButton
      leadingIcon={<MobileMediumIcon />}
      leadingIconContainerColorScheme="mobile"
      heading="Mobile"
      helperText="SIM only"
    />
  </CardActions>
</Card>
```

When grouping cards, render them as a list:

```tsx
<Flex asChild gap="300">
  <ul role="list">
    <li><Card>...</Card></li>
    <li><Card>...</Card></li>
  </ul>
</Flex>
```

### Toast

Requires `ToastProvider` at root. Use `type="foreground"` for user-triggered actions,
`type="background"` for background tasks.

```tsx
<Toast
  description="Settings saved"
  icon={<TickCircleMediumIcon />}
  showDismissButton
  type="foreground"
/>
```

### Tooltip

```tsx
<Tooltip description="More information" align="topCenter">
  <UnstyledIconButton label="more info">
    <InfoSmallIcon />
  </UnstyledIconButton>
</Tooltip>
```

Requires `HearthProvider` (or `TooltipProvider`) in the component tree.
