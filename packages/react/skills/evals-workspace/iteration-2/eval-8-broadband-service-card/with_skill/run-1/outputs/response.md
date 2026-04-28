# Broadband Service Card Component

Here is the broadband service card using the correct `Card` + `CardContent` + `CardActions` pattern from the hearth-react component library.

## Key design decisions

1. **No `colorScheme` on `Card`** — When a card contains `CardActions`, you must not set `colorScheme` on the `Card` itself. `CardActions` manages its own visual treatment and renders its own top separator automatically. Set the colour on `leadingIconContainerColorScheme` of each action item instead.
2. **No manual `<Divider />`** — `CardActions` renders its own top separator; adding a `Divider` manually would conflict with it.
3. **Broadband colour on action icons** — `leadingIconContainerColorScheme="broadband"` is set on both `CardActionButton` items to apply the broadband colour scheme to the leading icon containers.
4. **Plan content in `CardContent`** — The plan name and speed live inside `CardContent` so they get consistent padding and layout.

## Component

```tsx
import {
  Card,
  CardContent,
  CardActions,
  CardActionButton,
  Heading,
  BodyText,
} from '@utilitywarehouse/hearth-react';
import { BroadbandMediumIcon, ChevronRightMediumIcon } from '@utilitywarehouse/hearth-react-icons';

interface BroadbandServiceCardProps {
  planName: string;
  speed: string;
}

export function BroadbandServiceCard({ planName, speed }: BroadbandServiceCardProps) {
  return (
    <Card>
      <CardContent direction="column" gap="200">
        <Heading size="sm">{planName}</Heading>
        <BodyText>{speed}</BodyText>
      </CardContent>
      <CardActions direction="column">
        <CardActionButton
          leadingIcon={<BroadbandMediumIcon />}
          leadingIconContainerColorScheme="broadband"
          heading="View usage"
        />
        <CardActionButton
          leadingIcon={<BroadbandMediumIcon />}
          leadingIconContainerColorScheme="broadband"
          heading="Upgrade plan"
        />
      </CardActions>
    </Card>
  );
}
```

## Usage example

```tsx
<BroadbandServiceCard
  planName="Broadband Pro"
  speed="100Mbps"
/>
```

## What to avoid

- Do **not** add `colorScheme="broadband"` to `<Card>` — this conflicts with `CardActions` and is explicitly listed as a critical failure mode in the design system.
- Do **not** add a `<Divider />` between the content and the actions — `CardActions` renders its own separator.
- Do **not** add `shadowColor` to a card with `CardActions` — `shadowColor` is for interactive cards using `CardInteraction`, not `CardActions`.

## If the actions should navigate somewhere

If "View usage" and "Upgrade plan" should link to pages, pass an `onClick` or use `asChild` depending on the `CardActionButton` API. The skill does not document a specific `href` prop on `CardActionButton`, so wire up navigation via click handlers or check the component's TypeScript types for any `asChild` support.
