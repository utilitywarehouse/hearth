---
name: hearth-react
description: Building UI components with Hearth React, a component library from Utility Warehouse Design Systems. Use this skill implicitly whenever building any UI component in the my-account-web Next.js app — Hearth React is the default. Triggers when creating components, implementing Figma designs, adding UI features, or writing any frontend code in this app. Do not wait for an explicit mention of "Hearth React" — if it's UI work in this app, use this skill.
---

# Building with Hearth React

You are acting as a combined UX designer and frontend engineer. Your job is to turn requirements into production-quality React code using Hearth — Utility Warehouse's design system.

**Core rule:** Hearth React (`@utilitywarehouse/hearth-react`) is the default component library for the my-account-web app. Use it for all UI work unless explicitly told otherwise.

Never use raw HTML elements (`div`, `span`, `p`, `h1`–`h6`, `button`, `a`, `ul`, `li`, `input`, `select`, etc.) when a Hearth component exists for that purpose. Always consult the component reference before writing any markup.

Always check for components in the local application, if they serve your purpose better than Hearth or custom implementations, use them, but only with explicit user input verification.

## Package imports

| Purpose            | Package                                |
| ------------------ | -------------------------------------- |
| Components         | `@utilitywarehouse/hearth-react`       |
| Icons              | `@utilitywarehouse/hearth-react-icons` |
| Illustrations/SVGs | `@utilitywarehouse/hearth-svg-assets`  |

## Before you implement: discover what exists

Use the **`hearth-react`** Storybook MCP server before writing component code:

1. `list-all-documentation` — get an index of all Hearth React components
2. `get-documentation` — get props, API, and usage examples for a specific component
3. `get-documentation-for-story` — get story code and docs for a specific story

The library is broad — always check whether an existing component covers the need before implementing anything custom.

### Plan, then get agreement

Before writing code, tell the user:

- Which Hearth components you'll use and why
- Any local components you'll use and why
- The output folder/file structure
- Any decisions where multiple options are reasonable

Get the user's explicit agreement before proceeding.

## After you implement: verify

Once stories are written, use the **`storybook-playground`** Storybook MCP server to close the feedback loop:

1. `get-storybook-story-instructions` — confirm the correct story format for this app
2. `preview-stories` — visually verify the generated UI
3. `run-story-tests` — run behaviour and accessibility tests

## Storybook stories

Always generate a stories file alongside every new component.

```
apps/my-account-web/src/components/MyComponent/
├── MyComponent.tsx
├── MyComponent.stories.tsx   ← always include
└── index.ts
```

Story conventions:

- Import `Meta` and `StoryObj` from `@storybook/react`
- Title: `'Rebrand Components / ComponentName'`
- Include `tags: ['autodocs']`
- Use `fn()` from `storybook/test` for callback props
- Add a decorator with a constrained `maxWidth` wrapper when the component needs a bounded viewport

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';
import MyComponent from './MyComponent';

const meta: Meta<typeof MyComponent> = {
  title: 'Rebrand Components / MyComponent',
  component: MyComponent,
  tags: ['autodocs'],
  decorators: [
    Story => (
      <div style={{ maxWidth: 680, padding: 24 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MyComponent>;

export const Default: Story = {};
```

After generating stories, verify with `my-account-web-local`:

1. `preview-stories` — visual check
2. `run-story-tests` — behaviour and accessibility

---

# Layout

Four layout primitives, all built on design tokens:

| Component   | Use for                                                                    |
| ----------- | -------------------------------------------------------------------------- |
| `Box`       | Spacing, sizing, colour, flex/grid child behaviour, show/hide responsively |
| `Flex`      | Flexbox layouts — rows, columns, centring, wrapping                        |
| `Grid`      | Grid layouts — columns and rows                                            |
| `Container` | Page-width container with responsive gutters and vertical spacing          |

```tsx
// Flex column with responsive gap
<Flex direction="column" gap={{ mobile: '200', desktop: '400' }}>
  <Heading>Title</Heading>
  <BodyText>Content</BodyText>
</Flex>

// Grid with responsive columns
<Grid defaultResponsiveColumns gap="200">
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>...</Box>
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>...</Box>
</Grid>

// Box to hide on mobile, show on tablet+
<Box display={{ mobile: 'none', tablet: 'block' }}>Desktop only</Box>

// Page container
<Container spacing="xl">...</Container>
```

## Use Flex over margin

Use `gap` on the parent container to space children. For distribution and alignment, use
`justifyContent`/`alignItems` on a Flex wrapper. Don't put `margin` on individual sibling
components or wrap them in an extra `Box` just for positioning.

```tsx
// WRONG — margin for spacing
<Flex>
  <Button marginRight="100">Cancel</Button>
  <Button>Submit</Button>
</Flex>

// CORRECT — gap on parent
<Flex gap="100">
  <Button>Cancel</Button>
  <Button>Submit</Button>
</Flex>
```

```tsx
// WRONG — margin hack for alignment
<Flex>
  <BodyText>Summary</BodyText>
  <Button marginLeft="auto">Edit</Button>
</Flex>

// CORRECT — justifyContent on the Flex wrapper
<Flex justifyContent="space-between" alignItems="center">
  <BodyText>Summary</BodyText>
  <Button variant="ghost" colorScheme="functional">Edit</Button>
</Flex>
```

## Style props and space tokens

Style props are the primary way to apply spacing and sizing. They map directly to design
tokens — prefer them over raw CSS values.

**Space tokens** (used for padding, margin, gap, width, height, etc.) — these are **string values**,
not arbitrary numbers:
`'0'` `'25'` `'50'` `'75'` `'100'` `'150'` `'175'` `'200'` `'250'` `'300'` `'350'` `'400'` `'500'` `'600'` `'700'` `'800'` `'900'` `'1000'`

```tsx
// CORRECT
<Box padding="200" />
<Flex gap="300" />
<Box marginBottom="400" />

// WRONG — "3" is not a valid token (the token is "300")
<Flex gap="3" />
// WRONG — numeric values are not valid
<Flex gap={3} />
// WRONG — raw px values bypass the token system
<Box style={{ padding: '16px' }} />
```

Token strings map to CSS custom properties: `"200"` → `var(--h-spacing-200)`.

**IMPORTANT:** When using token values from hearth-tokens, only use browser tokens in JavaScript/JSX/TypeScript/TSX code, including when using styled components. CSS variables should only be used in CSS. When using browser tokens, always check the token exists in the `@utilitywarehouse/hearth-tokens/browser` package before using it.

```tsx
// CORRECT
import { semantic, border, space } "@utilitywarehouse/hearth-tokens/browser";

const CardHighlightHeader = styled(Box)({
 backgroundColor: semantic.surface.highlight.subtle,
 borderBottom: `${border.width[2]} solid ${semantic.border.strong}`,
 padding: space[200],
});

// WRONG — Don't use CSS variables in JS/JSX/TS/TSX code, use browser tokens instead
const CardHighlightHeader = styled(Box)({
 backgroundColor: 'var(--h-surface-highlight-subtle)',
 borderBottom: '2px solid var(--h-border-strong)',
 padding: 'var(--h-space-200)',
});
```

## 2. hearth-tokens/browser in React files

When you need token values in JavaScript (e.g., for inline styles or third-party components),
import from `hearth-tokens/browser`, **not** from `hearth-tokens` root.

```tsx
// CORRECT
import { space, color } from '@utilitywarehouse/hearth-tokens/browser';
<ThirdPartyChart style={{ padding: space[200] }} />;

// WRONG — root import is for Node/build-time use only
import { space } from '@utilitywarehouse/hearth-tokens';
<Box style={{ padding: space[200] }} />;
```

## 3. CSS variables in `.css` files

CSS custom properties are always in scope from the hearth-react stylesheet — no import needed.

```css
.myComponent {
  padding: var(--h-spacing-200);
  color: var(--h-color-brand-purple-500);
  border-radius: var(--h-border-radius-md);
}
```

# Responsive props

Many props accept a `Responsive` object with breakpoint keys. Breakpoints are
**mobile-first**: a value applies from that breakpoint upward until overridden.

Breakpoints: `mobile` | `tablet` | `desktop` | `wide`

```tsx
// All four breakpoints
<Box padding={{ mobile: '100', tablet: '200', desktop: '300', wide: '400' }} />

// Only specify breakpoints that change — mobile-first means smaller values cascade up
<Box padding={{ mobile: '100', desktop: '200' }} />  // tablet inherits mobile value

// Responsive direction and gap
<Flex
  direction={{ mobile: 'column', tablet: 'row' }}
  gap={{ mobile: '200', desktop: '400' }}
>
```

**Never omit `mobile`** when using a responsive prop object — values don't cascade down
from larger breakpoints. An object without `mobile` applies nothing at mobile size.

```tsx
// WRONG — no style applied at mobile
<Flex direction={{ tablet: 'column' }} />

// CORRECT
<Flex direction={{ mobile: 'row', tablet: 'column' }} />
```

## asChild — render any element as another

`asChild` clones the child element and forwards all props and behaviour onto it, using the
Radix Slot pattern. Use it to change the underlying HTML element without breaking semantics.

```tsx
// Button that renders as a Next.js Link (correct HTML — one <a> element)
import NextLink from 'next/link';
<Button asChild variant="solid" colorScheme="highlight">
  <NextLink href="/next-page">Continue</NextLink>
</Button>

// Without asChild — WRONG: <button> wrapping <a>, invalid HTML
<Button variant="solid" colorScheme="highlight">
  <NextLink href="/next-page">Continue</NextLink>
</Button>
```

Box, Flex, and Grid default to `div`. If you need a `span` (e.g., inside a paragraph):

```tsx
// WRONG — renders a div inside a paragraph
<BodyText>Click <Box className="highlight">here</Box></BodyText>

// CORRECT
<BodyText>Click <Box as="span" className="highlight">here</Box></BodyText>
```

## Compound components

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

## Card component

### Translating a Figma Card with a Web Service Dashboard child

The correct implementation depends on the semantic intent of the interaction:

**Navigational intent** (takes the user somewhere):

```tsx
<Card variant="...">
  <CardActionLink heading="..." helperText="..." href="..." leadingIcon={<Icon />} />
</Card>
```

**Action intent** (triggers an operation):

```tsx
<Card variant="...">
  <CardActionButton
    heading="..."
    helperText="..."
    onClick={...}
    leadingIcon={<Icon />}
  />
</Card>
```

### Cards containing a Link

`CardActionLink` and `CardActionButton` are interactive elements — they cannot contain other interactive elements as children. If the Card needs to contain a `Link`, compose `Card` with `CardInteraction` instead, using `IconContainer`, `Heading`, and `Flex` where necessary:

```tsx
<Card paddingNone shadowColor="..." variant="..." colorScheme="...">
  {...}
  <CardInteraction asChild>
    <Link href={href}>
      {linkText}
      <ChevronRightSmallIcon />
    </Link>
  </CardInteraction>
  {...}
</Card>
```

---

## Layout

Use layout components to structure and space content. Do not add margin to individual UI elements to achieve spacing — keep spacing decisions at the layout level so components stay composable.

| Component   | Use for                                           |
| ----------- | ------------------------------------------------- |
| `Box`       | Generic block container; supports all style props |
| `Flex`      | Flex layout                                       |
| `Grid`      | Grid layout                                       |
| `Container` | Page-level width constraint                       |

```tsx
// Good — spacing lives in the layout component
<Flex gap="300" direction="column">
  <ComponentA />
  <ComponentB />
</Flex>

// Bad — don't use margin on components to create spacing between siblings
<ComponentA marginBottom="300" />
<ComponentB />
```

---

## Styling

Apply styles in this order of preference:

### 1. Style props on components

Use `margin`, `padding`, `color`, `border` etc. directly on Hearth React components as props — this is the default.

### 2. Box + asChild

To apply style props to an element that doesn't natively support them, use `Box asChild`. This avoids adding an extra DOM node:

```tsx
<Box asChild padding="300">
  <section>...</section>
</Box>
```

### 3. Emotion styled

For custom styling that can't be achieved via props, use `styled` from `@emotion/styled`. Only use browser tokens from `@utilitywarehouse/hearth-tokens/browser` — no arbitrary values.

### 4. CSS files

If using CSS, only use CSS custom properties exposed by `@utilitywarehouse/hearth-react`.

### Rules

- **No raw pixel values** — except for very specific, unavoidable size adjustments (e.g. a fixed image dimension)
- **Space tokens are for spacing only** — do not use tokens like `200` or `400` for `width`, `height`, or font sizes

# Common patterns

## Full-width button on mobile, auto-width on desktop

```tsx
<Flex direction="column" alignItems={{ mobile: 'stretch', desktop: 'start' }}>
  <Button variant="solid" colorScheme="highlight">
    Submit
  </Button>
</Flex>
```

## Card with content and footer

```tsx
<Flex direction="column" gap="400" padding="400">
  <Flex direction="column" gap="200">
    <Heading size="md">Title</Heading>
    <BodyText>Description text here.</BodyText>
  </Flex>
  <Flex gap="100" justifyContent="end">
    <Button variant="ghost" colorScheme="functional">
      Cancel
    </Button>
    <Button variant="solid" colorScheme="highlight">
      Confirm
    </Button>
  </Flex>
</Flex>
```

## Responsive two-column grid

```tsx
<Grid defaultResponsiveColumns gap={{ mobile: '200', desktop: '400' }}>
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>
    <BodyText>Column one</BodyText>
  </Box>
  <Box gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '6' }}>
    <BodyText>Column two</BodyText>
  </Box>
</Grid>
```

`defaultResponsiveColumns` sets 4 columns on mobile, 8 on tablet, 12 on desktop+wide.
`gridColumnSpan` takes a string value from `'1'` to `'12'`.

---
