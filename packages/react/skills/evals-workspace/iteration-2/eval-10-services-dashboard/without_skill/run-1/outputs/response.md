# Services Dashboard

Here is a services dashboard using `@utilitywarehouse/hearth-react` components.

## Code

```tsx
import {
  Grid,
  Card,
  Heading,
  BodyText,
} from '@utilitywarehouse/hearth-react';

const services = [
  {
    id: 'broadband',
    title: 'Broadband',
    status: 'Connected — 74 Mbps average download speed',
    colorScheme: 'broadband' as const,
  },
  {
    id: 'mobile',
    title: 'Mobile',
    status: '2 active SIMs — all services running normally',
    colorScheme: 'mobile' as const,
  },
  {
    id: 'energy',
    title: 'Energy',
    status: 'Gas & electricity — direct debit up to date',
    colorScheme: 'energy' as const,
  },
];

export function ServicesDashboard() {
  return (
    <Grid
      asChild
      columns={{ mobile: '1', tablet: '2', desktop: '3' }}
      gap="300"
    >
      <ul role="list">
        {services.map(service => (
          <li key={service.id}>
            <Card
              variant="emphasis"
              colorScheme={service.colorScheme}
              direction="column"
              gap="100"
            >
              <Heading as="h2" size="sm">
                {service.title}
              </Heading>
              <BodyText size="md">{service.status}</BodyText>
            </Card>
          </li>
        ))}
      </ul>
    </Grid>
  );
}
```

## Key decisions

### Responsive columns via `Grid`

The `Grid` component accepts a responsive `columns` prop. Passing `{ mobile: '1', tablet: '2', desktop: '3' }` produces a single-column layout on small screens, two columns from the tablet breakpoint (740 px), and three columns from the desktop breakpoint (1024 px). No custom CSS or media queries are needed.

### Semantic list markup

The Card docs recommend wrapping grouped cards in a `ul`/`li` structure. `Grid asChild` lets the `ul` element inherit the grid styles while keeping the correct HTML semantics (`role="list"` is included as a best practice for VoiceOver compatibility when `list-style` is reset by the component styles).

### Per-service colour schemes

`Card` has built-in `colorScheme` values of `'broadband'`, `'mobile'`, and `'energy'`. Using these gives each card its brand-correct background tint without any custom colours or CSS variables.

### Typography

`Heading` with `size="sm"` gives an appropriately scaled card title. `BodyText` with `size="md"` gives the status line readable body copy. Both components render semantic HTML by default (`h2` and `p` respectively).

### Gap

`gap="300"` uses the design token spacing scale (spacing token `300` equals 12 px) to provide comfortable separation between cards at every viewport width.
