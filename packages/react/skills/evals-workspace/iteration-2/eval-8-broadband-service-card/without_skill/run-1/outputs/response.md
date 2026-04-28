## Broadband Service Card

Here is a broadband service card component built using `@utilitywarehouse/hearth-react` components.

### Component Code

```tsx
import * as React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  CardActionButton,
  Heading,
  DetailText,
} from '@utilitywarehouse/hearth-react';
import {
  BroadbandMediumIcon,
  InfoMediumIcon,
  ChevronRightSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

export function BroadbandServiceCard() {
  return (
    <Card shadowColor="broadband" width="400px">
      <CardContent direction="column" spacing="sm">
        <Heading size="md" as="h2">
          Broadband
        </Heading>
        <DetailText size="2xl">150 Mbps</DetailText>
      </CardContent>
      <CardActions direction="column">
        <CardActionButton
          heading="View usage"
          leadingIcon={<InfoMediumIcon />}
          leadingIconContainerColorScheme="broadband"
        />
        <CardActionButton
          heading="Upgrade plan"
          leadingIcon={<BroadbandMediumIcon />}
          leadingIconContainerColorScheme="broadband"
        />
      </CardActions>
    </Card>
  );
}
```

### How it works

- **`Card`** — the outer container, using `shadowColor="broadband"` to apply the broadband colour scheme to the card's drop shadow. This gives the card its broadband brand identity.
- **`CardContent`** — wraps the plan name and speed information, providing appropriate internal spacing.
- **`Heading`** — displays the broadband plan name ("Broadband") using `size="md"`.
- **`DetailText`** — displays the plan speed ("150 Mbps") using `size="2xl"` for visual emphasis.
- **`CardActions`** — a list container for the two action items at the bottom of the card, rendered as a `<ul>` by default with `direction="column"`.
- **`CardActionButton`** — each action row. Both have `leadingIconContainerColorScheme="broadband"` to apply the broadband colour scheme to their icon containers. A default `ChevronRightSmallIcon` trailing icon is included automatically.
  - "View usage" uses `InfoMediumIcon` as a relevant contextual icon
  - "Upgrade plan" uses `BroadbandMediumIcon` as the broadband service icon

### Customising the plan name and speed

To make the component accept dynamic data, extract the plan name and speed as props:

```tsx
interface BroadbandServiceCardProps {
  planName: string;
  speed: string;
  onViewUsage?: () => void;
  onUpgradePlan?: () => void;
}

export function BroadbandServiceCard({
  planName,
  speed,
  onViewUsage,
  onUpgradePlan,
}: BroadbandServiceCardProps) {
  return (
    <Card shadowColor="broadband" width="400px">
      <CardContent direction="column" spacing="sm">
        <Heading size="md" as="h2">
          {planName}
        </Heading>
        <DetailText size="2xl">{speed}</DetailText>
      </CardContent>
      <CardActions direction="column">
        <CardActionButton
          heading="View usage"
          leadingIcon={<InfoMediumIcon />}
          leadingIconContainerColorScheme="broadband"
          onClick={onViewUsage}
        />
        <CardActionButton
          heading="Upgrade plan"
          leadingIcon={<BroadbandMediumIcon />}
          leadingIconContainerColorScheme="broadband"
          onClick={onUpgradePlan}
        />
      </CardActions>
    </Card>
  );
}
```

### Using links instead of buttons

If the actions should navigate to a page rather than trigger an in-page handler, replace `CardActionButton` with `CardActionLink`:

```tsx
import {
  Card,
  CardContent,
  CardActions,
  CardActionLink,
  Heading,
  DetailText,
} from '@utilitywarehouse/hearth-react';

export function BroadbandServiceCard() {
  return (
    <Card shadowColor="broadband" width="400px">
      <CardContent direction="column" spacing="sm">
        <Heading size="md" as="h2">
          Broadband
        </Heading>
        <DetailText size="2xl">150 Mbps</DetailText>
      </CardContent>
      <CardActions direction="column">
        <CardActionLink
          heading="View usage"
          leadingIcon={<InfoMediumIcon />}
          leadingIconContainerColorScheme="broadband"
          href="/broadband/usage"
        />
        <CardActionLink
          heading="Upgrade plan"
          leadingIcon={<BroadbandMediumIcon />}
          leadingIconContainerColorScheme="broadband"
          href="/broadband/upgrade"
        />
      </CardActions>
    </Card>
  );
}
```
