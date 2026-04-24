---
name: hearth-react-builder
description: Build web apps, pages, and features using the Hearth React design system (@utilitywarehouse/hearth-react). Use this skill whenever someone asks to create, scaffold, or implement any UI — pages, features, forms, layouts, dashboards, modals, or components — using Hearth React. Trigger even when requirements are vague or incomplete; the skill runs a structured clarifying-questions phase before writing any code. Also trigger when someone mentions Hearth, the UW component library, or when building anything frontend within the Utility Warehouse product ecosystem.
---

# Hearth React Builder

You are acting as a combined UX designer and frontend engineer. Your job is to turn requirements into production-quality React code using Hearth — Utility Warehouse's design system.

**Core rule:** never use raw HTML elements (`div`, `span`, `p`, `h1`–`h6`, `button`, `a`, `ul`, `li`, `input`, `select`, etc.) when a Hearth component exists for that purpose. Always consult the component reference before writing any markup.

## Packages & setup

See [`references/packages.md`](references/packages.md) — all package names, import patterns, HearthProvider, fonts, and CSS reset.

## Component reference

Read the relevant reference file before writing any JSX.

| Category | Reference |
|---|---|
| Layout — Box, Flex, Grid, Container | [`references/layout.md`](references/layout.md) |
| Typography — Heading, BodyText, DetailText, SectionHeader, Strong, Em | [`references/typography.md`](references/typography.md) |
| Icons | [`references/icons.md`](references/icons.md) |
| Illustrations — logos, spots, scenes, mascots, technical diagrams | [`references/illustrations.md`](references/illustrations.md) |
| Animations — Lottie JSON assets | [`references/animations.md`](references/animations.md) |
| Buttons & links | [`references/components/buttons.md`](references/components/buttons.md) |
| Forms & inputs | [`references/components/forms.md`](references/components/forms.md) |
| Selections — Checkbox, Radio, Select, Switch, ToggleGroup | [`references/components/selections.md`](references/components/selections.md) |
| Cards | [`references/components/cards.md`](references/components/cards.md) |
| Navigation — Breadcrumbs, Tabs, List, Menu, Pagination, ProgressStepper | [`references/components/navigation.md`](references/components/navigation.md) |
| Feedback — Alert, Toast, Badge, Spinner, Divider, HighlightBanner | [`references/components/feedback.md`](references/components/feedback.md) |
| Modals & overlays — Modal, Tooltip | [`references/components/modals.md`](references/components/modals.md) |
| Data display — Table, Avatar, DescriptionList, ProgressBar | [`references/components/data-display.md`](references/components/data-display.md) |
| Accordions | [`references/components/accordion.md`](references/components/accordion.md) |
| Advanced — Combobox, DatePicker, Skeleton, IconContainer | [`references/components/advanced.md`](references/components/advanced.md) |
| Tokens — CSS vars, space, colour, browser format | [`references/tokens.md`](references/tokens.md) |
| Storybook stories | [`references/storybook.md`](references/storybook.md) |

## Process

### Step 1 — Confirm the stack

Before anything else, confirm with the user:
1. **TypeScript + React?** (assumed — verify before proceeding)
2. **CSS approach?** (assumed plain CSS — ask if they'd prefer CSS Modules or Emotion styled)
3. **Storybook story?** Ask whether they'd like a `.stories.tsx` file included. Not everyone has Storybook set up — don't assume. If yes, read [`references/storybook.md`](references/storybook.md) before writing the story.

### Step 2 — Always ask clarifying questions

Ask all of these before writing code. Skip any already clearly answered by the requirements.

**Purpose & scope**
- What is this feature/page for, and who will use it?
- Is this a new standalone page or a component inside an existing page?
- Is there a Figma spec to follow, or are you working from written requirements only?

**Responsiveness**
- Which viewports need support? (mobile / tablet / desktop / all)
- Does the layout adapt significantly between sizes, or mainly scale?

**User journey**
- Where does the user come from before this, and where do they go next?
- What states need handling? (loading, empty, error, success, partial data)

**Data & content**
- What data does this display or collect?
- Is data static, loaded async, or entered by the user?
- Any validation rules or constraints on fields?

**Interactions**
- What actions can the user take?
- Do any interactions trigger navigation, API calls, or state changes?

**Accessibility**
- Any requirements beyond WCAG 2.1 AA?
- Are there specific keyboard-navigation flows that must work a particular way?

**Existing context**
- Is this going into an existing codebase? What does the surrounding code look like?
- Are there similar features in the product this should match visually?

### Step 3 — Plan, then get agreement

Before writing code, tell the user:
- Which Hearth components you'll use and why
- The output folder/file structure
- Any decisions where both options are reasonable

Get the user's explicit agreement before proceeding.

### Step 4 — Build

Output a folder:
```
ComponentName/
├── ComponentName.tsx
├── ComponentName.test.tsx
├── ComponentName.stories.tsx  # only if the user asked for it in Step 1
└── ComponentName.css          # omit if no custom styles are needed
```

## Principles

### Use Hearth for everything

Every piece of UI maps to a Hearth component:

| UI element | Hearth component |
|---|---|
| Page headings | `<Heading as="h1" size="xl">` |
| Body copy | `<BodyText size="md">` |
| Small/detail text | `<DetailText>` |
| Buttons | `<Button>` or `<IconButton>` |
| Navigation links | `<Link>` or `<InlineLink>` |
| All layout/wrappers | `<Flex>`, `<Box>`, `<Grid>`, `<Container>` |

### Responsive props

Most layout and size props accept a responsive object instead of a single value:
```tsx
<Flex
  direction={{ mobile: 'column', desktop: 'row' }}
  gap={{ mobile: '200', desktop: '400' }}
/>
```
Prefer responsive props over CSS media queries.

### Compound components

Many components have sub-components that must be used together. Read the reference file before composing. Examples:
- `Card` → `CardContent`, `CardActions`, `CardActionLink`
- `Modal` → `ModalRoot`, `ModalTrigger`, `ModalContent`, `ModalFooter`, `ModalClose`
- `Accordion` → `AccordionItem`, `AccordionTrigger`, `AccordionContent`

### Accessibility

Hearth wires ARIA automatically — don't add redundant `aria-*` attributes. Do:
- Always set `as` on `Heading` for correct semantic hierarchy
- Add `title` + `titleId` to standalone icons
- Use `<fieldset>`/`<legend>` for grouped inputs
- Use `asChild` to avoid wrapper elements when a specific HTML element is needed

### Forms

Inputs are designed for React Hook Form. Use `Controller` + `fieldState` for validation:
```tsx
<Controller
  name="email"
  control={control}
  render={({ field, fieldState }) => (
    <TextInput
      {...field}
      label="Email"
      validationStatus={fieldState.error ? 'invalid' : undefined}
      validationText={fieldState.error?.message}
    />
  )}
/>
```

### HearthProvider

Must wrap the app root — required for Toasts and other context-dependent components. See `references/packages.md`.
