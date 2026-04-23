# Typography

All text uses Hearth typography components — never raw `<p>`, `<h1>`–`<h6>`, `<span>`, `<strong>`, `<em>`.

## Heading

Semantic heading element. Size and tag are independent — choose `as` for document structure, `size` for visual treatment.

```tsx
import { Heading } from '@utilitywarehouse/hearth-react';
```

| Prop | Values |
|---|---|
| `as` | `'h1'` \| `'h2'` \| `'h3'` \| `'h4'` |
| `size` | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` |
| `inverted` | boolean — light text for dark backgrounds |

```tsx
// Always set both as (semantics) and size (visual)
<Heading as="h1" size="xl">Page title</Heading>
<Heading as="h2" size="md">Section title</Heading>

// Visually large, semantically a lower heading level
<Heading as="h3" size="lg">Card heading</Heading>

// Inverted on a dark background
<Box backgroundColor="brand" padding="400">
  <Heading as="h2" size="lg" inverted>Dark background heading</Heading>
</Box>
```

**Accessibility:** `as` controls what screen readers announce. Never skip heading levels (h1 → h3). Use `size` to change appearance without affecting semantics.

**Rule:** Only one `<Heading as="h1">` per page.

---

## BodyText

Standard body copy for all non-heading, non-numerical text.

```tsx
import { BodyText } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `size` | `'sm'` \| `'md'` \| `'lg'` | Responsive |
| `weight` | `'regular'` \| `'semibold'` \| `'bold'` | Responsive |
| `color` | `'primary'` \| `'secondary'` \| `'brand'` \| `'affirmative'` \| `'inverted'` | |
| `as` | `'span'` \| `'p'` \| `'div'` | |
| `truncate` | boolean | Truncates to one line with ellipsis |
| `paragraphSpacing` | boolean | Adds bottom margin for paragraph rhythm |

```tsx
<BodyText size="md">Standard body copy</BodyText>
<BodyText size="sm">Smaller supporting text</BodyText>
<BodyText size="md" weight="semibold">Emphasised</BodyText>
<BodyText size="md" color="secondary">Subdued label</BodyText>

// Truncate long text
<BodyText truncate width="200px">
  This very long text will be truncated with an ellipsis
</BodyText>

// Paragraph spacing
<BodyText as="p" paragraphSpacing size="md">First paragraph...</BodyText>
<BodyText as="p" size="md">Second paragraph without bottom spacing</BodyText>

// On dark background
<Box backgroundColor="brand" padding="400">
  <BodyText color="inverted">Light text on dark</BodyText>
</Box>

// Responsive size
<BodyText size={{ mobile: 'sm', tablet: 'md', desktop: 'lg' }}>
  Responsive copy
</BodyText>
```

**Color meanings:**
- `primary` — default text
- `secondary` — subdued, supporting text
- `brand` — brand-coloured (use sparingly)
- `affirmative` — success/positive state
- `inverted` — white text for dark backgrounds only

**Gotcha:** `truncate` hides overflow text visually — don't use it on content that users must read in full.

---

## DetailText

Numerical and display text. Use for prices, statistics, counts, and data values.

```tsx
import { DetailText } from '@utilitywarehouse/hearth-react';
```

| Prop | Values | Notes |
|---|---|---|
| `size` | `'sm'` \| `'md'` \| `'lg'` \| `'xl'` \| `'2xl'` \| `'3xl'` \| `'4xl'` | Responsive |
| `color` | `'text'` \| `'valid'` \| `'invalid'` | |
| `inverted` | boolean | Light text for dark backgrounds |
| `as` | `'span'` \| `'p'` \| `'div'` | |

```tsx
// Large price display
<DetailText size="4xl">£110.00</DetailText>

// Monthly amount
<DetailText size="3xl">£163.00</DetailText>

// Success/error state
<DetailText color="valid">Updated</DetailText>
<DetailText color="invalid">Error</DetailText>

// Caption
<DetailText size="sm">per month</DetailText>

// Responsive
<DetailText size={{ mobile: 'xl', desktop: '3xl' }}>£163.00</DetailText>
```

**Size reference:**
- `sm` (12px), `md` (14px), `lg` (16px), `xl` (18px), `2xl` (24px), `3xl` (32px), `4xl` (40px)

**Gotcha:** `color` is semantic — don't use `valid`/`invalid` purely for decoration.

---

## SectionHeader

Section label or eyebrow text, typically above a heading.

```tsx
import { SectionHeader } from '@utilitywarehouse/hearth-react';

<SectionHeader>Your services</SectionHeader>
<Heading as="h2" size="xl">Manage everything in one place</Heading>
```

See `apps/storybook-react/src/components` for full prop reference.

---

## Strong & Em

Inline semantic emphasis. Always used inside a text component.

```tsx
import { Strong, Em } from '@utilitywarehouse/hearth-react';

<BodyText size="md">
  Call us on <Strong>0333 777 8777</Strong> for help.
</BodyText>

<BodyText size="md">
  Prices are <Em>exclusive of VAT</Em>.
</BodyText>
```

**Gotcha:** Don't use `Strong`/`Em` standalone — they're inline elements and need a text component parent.

---

## Label, HelperText, ValidationText

Form-related text components. These are wired automatically by form inputs, but available for custom form layouts.

```tsx
import { Label, HelperText, ValidationText } from '@utilitywarehouse/hearth-react';

<Label htmlFor="email">Email address</Label>
<TextInput id="email" />
<HelperText>We'll never share your email.</HelperText>
<ValidationText status="invalid">Please enter a valid email.</ValidationText>
```

---

## Typography rules

1. Only one `<Heading as="h1">` per page
2. Never skip heading levels — use `size` for visual scaling, `as` for semantic hierarchy
3. `BodyText` for all prose, labels, and supporting copy
4. `DetailText` for prices, statistics, data values, and numerical display
5. `Strong`/`Em` for inline emphasis inside body copy only
6. Always use `color="inverted"` (not custom CSS) for text on dark backgrounds
