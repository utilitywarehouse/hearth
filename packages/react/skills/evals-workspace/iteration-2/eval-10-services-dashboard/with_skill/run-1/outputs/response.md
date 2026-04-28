# Services Dashboard

Here is a services dashboard built with `@utilitywarehouse/hearth-react` that shows three service cards in a responsive grid — stacking on mobile, two columns on tablet, and three columns on desktop.

## How the layout works

The skill's `defaultResponsiveColumns` Grid sets 4 columns on mobile, 8 on tablet, and 12 on desktop+wide. To achieve the required column behaviour:

- **Mobile** — each card spans all 4 columns → single column, cards stack
- **Tablet** — each card spans 4 of 8 columns → two cards per row (the third wraps to a new row)
- **Desktop** — each card spans 4 of 12 columns → three cards per row

`gridColumnSpan` accepts string values, and all responsive prop objects must include `mobile` as the base value.

Card internals use the "card with content" pattern from the skill: a `Flex` column with `gap` for spacing between the title and status line.

## Component code

```tsx
import {
  Container,
  Grid,
  Box,
  Flex,
  Heading,
  BodyText,
} from '@utilitywarehouse/hearth-react';

const services = [
  {
    id: 'broadband',
    title: 'Broadband',
    status: 'Connection active — 72 Mbps',
  },
  {
    id: 'mobile',
    title: 'Mobile',
    status: '2 active SIMs — all calls & data on',
  },
  {
    id: 'energy',
    title: 'Energy',
    status: 'Supply live — next bill in 14 days',
  },
];

function ServiceCard({
  title,
  status,
}: {
  title: string;
  status: string;
}) {
  return (
    <Flex
      direction="column"
      gap="100"
      padding="300"
      backgroundColor="brand-purple-50"
      borderRadius="md"
    >
      <Heading size="sm">{title}</Heading>
      <BodyText>{status}</BodyText>
    </Flex>
  );
}

export function ServicesDashboard() {
  return (
    <Container spacing="xl">
      <Flex direction="column" gap="300">
        <Heading size="lg">Your services</Heading>

        <Grid
          defaultResponsiveColumns
          gap={{ mobile: '200', desktop: '300' }}
        >
          {services.map((service) => (
            <Box
              key={service.id}
              gridColumnSpan={{ mobile: '4', tablet: '4', desktop: '4' }}
            >
              <ServiceCard title={service.title} status={service.status} />
            </Box>
          ))}
        </Grid>
      </Flex>
    </Container>
  );
}
```

## Key decisions

**Grid column spans**

| Breakpoint | Grid columns | Card span | Cards per row |
|---|---|---|---|
| mobile | 4 | 4 | 1 |
| tablet | 8 | 4 | 2 |
| desktop | 12 | 4 | 3 |

Each card always spans 4 columns. Because `defaultResponsiveColumns` changes the total column count at each breakpoint, the same span string `'4'` produces different fractional widths — full-width at mobile, half at tablet, one-third at desktop. This is cleaner than specifying different span values per breakpoint.

**Responsive gap**

`gap={{ mobile: '200', desktop: '300' }}` — tablet inherits the mobile value per the mobile-first cascade rule, so only two breakpoints are needed.

**Spacing tokens**

All spacing uses token strings: `'100'`, `'200'`, `'300'` — never raw numbers or pixel values.

**`mobile` always present**

Every responsive prop object includes `mobile` as the base value, which is required — values do not cascade down from larger breakpoints.

**`gap` on the parent, not margin on children**

Card spacing comes from the `gap` prop on `Grid` and the inner `Flex`, not from `margin` on individual cards. This follows the skill's "Flex over margin" guidance.
