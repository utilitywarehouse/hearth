# Card

The Card system supports simple content containers, interactive cards, action lists, and decorative banner variants.

```tsx
import {
  Card,
  CardContent,
  CardInteraction,
  CardActions,
  CardActionLink,
  CardActionButton,
  CardBannerContent,
  CardBannerImage,
} from '@utilitywarehouse/hearth-react';
```

---

## Card

Base container. Inherits `Flex` props.

| Prop | Values |
|---|---|
| `variant` | `'emphasis'` \| `'subtle'` |
| `colorScheme` | `'neutralStrong'` \| `'neutralSubtle'` \| `'brand'` \| `'energy'` \| `'broadband'` \| `'mobile'` \| `'insurance'` \| `'cashback'` \| `'pig'` \| `'highlight'` |
| `shadowColor` | `'brand'` \| `'energy'` \| `'broadband'` \| `'mobile'` \| `'insurance'` \| `'cashback'` \| `'pig'` \| `'functional'` |
| `paddingNone` | boolean — removes default padding |

---

## CardContent

Content section with consistent internal spacing.

```tsx
<CardContent direction="column" spacing="md">
  <Heading as="h2" size="md">Title</Heading>
  <BodyText size="md">Description</BodyText>
</CardContent>
```

---

## CardInteraction

Marks interactive regions within a card. Renders the correct hover/focus ring.

```tsx
<CardInteraction asChild>
  <Link href="/services">View services<ChevronRightSmallIcon /></Link>
</CardInteraction>

// Secondary interaction (lower visual priority)
<CardInteraction secondary asChild>
  <Link href="/help">Get help</Link>
</CardInteraction>
```

A card can have one primary and one secondary `CardInteraction`.

---

## CardActions + CardActionLink / CardActionButton

Pre-built action rows with consistent layout and divider. Use when you need a labelled action list.

**CardActionLink / CardActionButton props:**

| Prop | Notes |
|---|---|
| `heading` | Main action label |
| `helperText` | Secondary line |
| `leadingIcon` | Icon on the left |
| `leadingIconContainerColorScheme` | Background colour of the icon container |
| `trailingIcon` | Icon on the right |
| `badge` | Badge element |
| `badgePlacement` | `'middle'` \| `'bottom'` \| `'right'` |
| `href` | CardActionLink only |
| `onClick` | CardActionButton only |

```tsx
<Card>
  <CardContent direction="column" spacing="md">
    <Heading as="h2" size="md">Your December bill</Heading>
    <DetailText size="4xl">£110.00</DetailText>
  </CardContent>
  <CardActions direction={{ mobile: 'column', desktop: 'row' }}>
    <CardActionLink heading="Download PDF" trailingIcon={<DownloadSmallIcon />} href="/bill.pdf" />
    <CardActionButton heading="Open PDF" trailingIcon={<OpenSmallIcon />} onClick={handleOpen} />
  </CardActions>
</Card>
```

---

## CardBannerContent + CardBannerImage

Decorative banner layout for promotional cards.

```tsx
<Card>
  <CardBannerImage width="160px" height="174px">
    <img src={SpotSavingsLight} alt="" role="presentation" />
  </CardBannerImage>
  <CardBannerContent heading="Save a bundle" description="Get up to £150 in credit when you join" />
</Card>
```

---

## Composition examples

### Content card with manage link
```tsx
<Card variant="subtle" colorScheme="neutralSubtle">
  <CardContent direction="column" spacing="md">
    <Heading as="h3" size="md">Gas & Electricity</Heading>
    <BodyText size="sm">Manage your energy account</BodyText>
    <CardInteraction asChild>
      <Link href="/energy">View account<ChevronRightSmallIcon /></Link>
    </CardInteraction>
  </CardContent>
</Card>
```

### Service card with branded icon
```tsx
<Card paddingNone shadowColor="energy">
  <Flex>
    <IconContainer colorScheme="energy" fill="height" borderRadius="none">
      <ElectricityMediumIcon />
    </IconContainer>
    <Flex direction="column" padding="300" gap="100">
      <Heading as="h3" size="sm">Energy</Heading>
      <CardInteraction asChild>
        <Link href="/energy">Manage energy</Link>
      </CardInteraction>
    </Flex>
  </Flex>
</Card>
```

### Responsive card grid
```tsx
<Grid defaultResponsiveColumns gap="300">
  {services.map(service => (
    <Card key={service.id} gridColumnSpan={{ mobile: 'full', tablet: '4', desktop: '3' }}>
      <CardActionLink
        heading={service.name}
        leadingIcon={<service.Icon />}
        leadingIconContainerColorScheme={service.colorScheme}
        href={service.href}
      />
    </Card>
  ))}
</Grid>
```

---

## Accessibility

- Cards are not inherently interactive — wrap interactive elements in `CardInteraction`
- Use `aria-labelledby` pointing to the card heading when extra context helps screen readers

**Gotchas:**
- `paddingNone` is needed when using `IconContainer fill="height"` — the icon container must reach the card edges to look correct
- Don't add a `<Divider>` before `CardActions` — `CardActions` renders its own top separator automatically. Adding a Divider creates a double line.
- Don't set a service `colorScheme` (`energy`, `broadband`, `mobile`, etc.) on a Card that uses `CardActions` or a service `shadowColor`. Use a neutral colorScheme or omit it — service color on the card body competes with the branded action row.
