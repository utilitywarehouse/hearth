# Expandable Card

The `ExpandableCard` component is an interactive card that expands to reveal additional content when clicked. It's a Card component with smooth expansion animations, making it perfect for displaying collapsible information sections.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
  - [`ExpandableCard`](#expandablecard)
  - [`ExpandableCardGroup`](#expandablecardgroup)
- [Examples](#examples)
  - [Basic Example](#basic-example)
  - [With Leading Icon](#with-leading-icon)
  - [With `Badge`](#with-badge)
  - [With Numeric Value](#with-numeric-value)
  - [With Custom Trigger Content](#with-custom-trigger-content)
  - [`CardGroup`](#cardgroup)
- [Advanced Usage](#advanced-usage)
- [Accessibility](#accessibility)

## Playground

```tsx
<ExpandableCard
  heading="Expandable Card"
  helperText="Click to expand"
  duration={200}
  animateOpacity
  variant="subtle"
  expandedContent={
    <BodyText>
      This is the expanded content. It can contain any component or content you need.
    </BodyText>
  }
/>
```

## Usage

```tsx
<ExpandableCard
  heading="Order Details"
  helperText="View your order information"
  expandedContent={
    <>
      <BodyText>Order #12345</BodyText>
      <BodyText>Status: Delivered</BodyText>
      <BodyText>Date: 10 Nov 2025</BodyText>
    </>
  }
  style={{ width: 350 }}
/>
```

```tsx
import { ExpandableCard, BodyText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <ExpandableCard
    heading="Order Details"
    helperText="View your order information"
    expandedContent={
      <>
        <BodyText>Order #12345</BodyText>
        <BodyText>Status: Delivered</BodyText>
        <BodyText>Date: 10 Nov 2025</BodyText>
      </>
    }
  />
);
```

### `ExpandableCard`

| Prop               | Type                          | Default             | Description                                                    |
| ------------------ | ----------------------------- | ------------------- | -------------------------------------------------------------- |
| `heading`          | `string`                      | -                   | The heading text displayed in the trigger                      |
| `helperText`       | `string`                      | -                   | Optional helper text displayed below the heading               |
| `leadingIcon`      | `ComponentType`               | -                   | Leading icon component (automatically wrapped)                 |
| `leadingContent`   | `ReactNode`                   | -                   | Leading content (icon or custom element)                       |
| `badge`            | `ReactNode`                   | -                   | Badge to display                                               |
| `badgePosition`    | `'top' \| 'bottom'`           | `'bottom'`          | Badge position                                                 |
| `numericValue`     | `string \| number`            | -                   | Numeric value to display on the right                          |
| `triggerContent`   | `ReactNode`                   | -                   | Replaces the default trigger content while keeping the chevron |
| `expandedContent`  | `ReactNode`                   | -                   | The content to show when expanded                              |
| `expanded`         | `boolean`                     | -                   | Whether the card is expanded (controlled)                      |
| `onExpandedChange` | `(expanded: boolean) => void` | -                   | Callback when expanded state changes                           |
| `duration`         | `number`                      | `200`               | Duration of expansion animation in milliseconds                |
| `animateOpacity`   | `boolean`                     | `true`              | Whether to animate opacity during expansion                    |
| `disabled`         | `boolean`                     | `false`             | Whether the card is disabled                                   |
| `colorScheme`      | `CardColorScheme`             | -                   | Color scheme (inherits from Card component)                    |
| `variant`          | `CardVariant`                 | -                   | Variant (inherits from Card component)                         |
| `testID`           | `string`                      | `'expandable-card'` | Test ID for testing                                            |

When `triggerContent` is provided, the default trigger props such as `heading`, `helperText`, `leadingIcon`, `leadingContent`, `badge`, `badgePosition`, and `numericValue` are not available.

### `ExpandableCardGroup`

| Prop                    | Type        | Default                   | Description                                    |
| ----------------------- | ----------- | ------------------------- | ---------------------------------------------- |
| `heading`               | `string`    | -                         | Section heading                                |
| `helperText`            | `string`    | -                         | Helper text displayed below the heading        |
| `headerTrailingContent` | `ReactNode` | -                         | Trailing content for the header (e.g., a link) |
| `children`              | `ReactNode` | -                         | The ExpandableCard children                    |
| `testID`                | `string`    | `'expandable-card-group'` | Test ID for testing                            |

### Basic Example

```tsx
<ExpandableCard
  heading="Order Details"
  helperText="View your order information"
  expandedContent={
    <>
      <BodyText>Order #12345</BodyText>
      <BodyText>Status: Delivered</BodyText>
      <BodyText>Date: 10 Nov 2025</BodyText>
    </>
  }
  style={{ width: 350 }}
/>
```

### With Leading Icon

You can add a leading icon using the `leadingIcon` prop for simple icons, or use `leadingContent` with an `IconContainer` for more customization.

```tsx
<ExpandableCard
  heading="Settings"
  helperText="Configure your preferences"
  leadingIcon={SettingsMediumIcon}
  expandedContent={
    <>
      <BodyText>• Notifications</BodyText>
      <BodyText>• Privacy</BodyText>
      <BodyText>• Account</BodyText>
    </>
  }
  style={{ width: 350 }}
/>
```

```tsx
import { ExpandableCard, BodyText } from '@utilitywarehouse/hearth-react-native';
import { SettingsMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <ExpandableCard
    heading="Settings"
    helperText="Configure your preferences"
    leadingIcon={SettingsMediumIcon}
    expandedContent={
      <>
        <BodyText>• Notifications</BodyText>
        <BodyText>• Privacy</BodyText>
        <BodyText>• Account</BodyText>
      </>
    }
  />
);
```

Or use `leadingContent` with `IconContainer` for emphasis variants:

```tsx
<ExpandableCard
  heading="Electricity"
  helperText="Last reading 23/03/24"
  leadingContent={
    <IconContainer icon={ElectricityMediumIcon} size="md" variant="emphasis" color="energy" />
  }
  expandedContent={
    <>
      <BodyText>Current Usage: 245 kWh</BodyText>
      <BodyText>Estimated Cost: £45.50</BodyText>
      <BodyText>Next Reading: 23/04/24</BodyText>
    </>
  }
  style={{ width: 350 }}
/>
```

```tsx
import { ExpandableCard, IconContainer, BodyText } from '@utilitywarehouse/hearth-react-native';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <ExpandableCard
    heading="Electricity"
    helperText="Last reading 23/03/24"
    leadingContent={
      <IconContainer icon={ElectricityMediumIcon} size="md" variant="emphasis" color="energy" />
    }
    expandedContent={
      <>
        <BodyText>Current Usage: 245 kWh</BodyText>
        <BodyText>Estimated Cost: £45.50</BodyText>
      </>
    }
  />
);
```

### With `Badge`

```tsx
<ExpandableCard
  heading="New Feature"
  helperText="Check out what's new"
  badge={<Badge text="New" colorScheme="info" />}
  expandedContent={
    <BodyText>We've added new features to improve your experience. Explore them now!</BodyText>
  }
  style={{ width: 350 }}
/>
```

```tsx
<ExpandableCard
  heading="New Feature"
  helperText="Check out what's new"
  badge={<Badge text="New" colorScheme="cyan" />}
  expandedContent={<BodyText>We've added new features to improve your experience.</BodyText>}
/>
```

### With Numeric Value

```tsx
<ExpandableCard
  heading="Total Balance"
  helperText="Current account balance"
  numericValue="£123.45"
  expandedContent={
    <>
      <BodyText>Available: £100.00</BodyText>
      <BodyText>Pending: £23.45</BodyText>
    </>
  }
  style={{ width: 350 }}
/>
```

```tsx
<ExpandableCard
  heading="Total Balance"
  helperText="Current account balance"
  numericValue="£123.45"
  expandedContent={
    <>
      <BodyText>Available: £100.00</BodyText>
      <BodyText>Pending: £23.45</BodyText>
    </>
  }
/>
```

    ### With Custom Trigger Content

    Use `triggerContent` when you need to replace the standard trigger layout entirely while keeping the expandable chevron.

```tsx
<ExpandableCard
  triggerContent={
    <View style={{ flex: 1, gap: 4 }}>
      <BodyText weight="semibold">March bill ready</BodyText>
      <BodyText color="secondary">Due on 18 April 2026</BodyText>
    </View>
  }
  expandedContent={
    <>
      <BodyText>Balance: £89.50</BodyText>
      <BodyText>Payment method: Direct Debit</BodyText>
    </>
  }
  style={{ width: 350 }}
/>
```

    ```tsx
    import { ExpandableCard, BodyText } from '@utilitywarehouse/hearth-react-native';
    import { View } from 'react-native';

    const MyComponent = () => (
      <ExpandableCard
        triggerContent={
          <View style={{ flex: 1, gap: 4 }}>
            <BodyText weight="semibold">March bill ready</BodyText>
            <BodyText color="secondary">Due on 18 April 2026</BodyText>
          </View>
        }
        expandedContent={
          <>
            <BodyText>Balance: £89.50</BodyText>
            <BodyText>Payment method: Direct Debit</BodyText>
          </>
        }
      />
    );
    ```

### `CardGroup`

Use `ExpandableCardGroup` to group multiple expandable cards with an optional header.

```tsx
<ExpandableCardGroup
  heading="Your Services"
  helperText="View details for each service"
  headerTrailingContent={<Link href="#">View all</Link>}
>
  <ExpandableCard
    heading="Electricity"
    helperText="Last reading 23/03/24"
    leadingContent={
      <IconContainer icon={ElectricityMediumIcon} size="md" variant="emphasis" color="energy" />
    }
    expandedContent={
      <>
        <BodyText>Current Usage: 245 kWh</BodyText>
        <BodyText>Estimated Cost: £45.50</BodyText>
      </>
    }
  />
  <ExpandableCard
    heading="Gas"
    helperText="Last reading 23/03/24"
    leadingContent={
      <IconContainer icon={GasMediumIcon} size="md" variant="emphasis" color="energy" />
    }
    expandedContent={
      <>
        <BodyText>Current Usage: 180 kWh</BodyText>
        <BodyText>Estimated Cost: £32.00</BodyText>
      </>
    }
  />
</ExpandableCardGroup>
```

```tsx
import {
  ExpandableCard,
  ExpandableCardGroup,
  IconContainer,
  Link,
  BodyText,
} from '@utilitywarehouse/hearth-react-native';
import { ElectricityMediumIcon, GasMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <ExpandableCardGroup
    heading="Your Services"
    helperText="View details for each service"
    headerTrailingContent={<Link href="#">View all</Link>}
  >
    <ExpandableCard
      heading="Electricity"
      helperText="Last reading 23/03/24"
      leadingContent={
        <IconContainer icon={ElectricityMediumIcon} size="md" variant="emphasis" color="energy" />
      }
      expandedContent={
        <>
          <BodyText>Current Usage: 245 kWh</BodyText>
          <BodyText>Estimated Cost: £45.50</BodyText>
        </>
      }
    />
    <ExpandableCard
      heading="Gas"
      helperText="Last reading 23/03/24"
      leadingContent={
        <IconContainer icon={GasMediumIcon} size="md" variant="emphasis" color="energy" />
      }
      expandedContent={
        <>
          <BodyText>Current Usage: 180 kWh</BodyText>
          <BodyText>Estimated Cost: £32.00</BodyText>
        </>
      }
    />
  </ExpandableCardGroup>
);
```

## Advanced Usage

If you need to use the `ExpandableCard` component in a more advanced way, you can use the child components directly for full composition control.

```tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 350 }}>
  <ExpandableCard
    expanded={triggerContentExpanded}
    onExpandedChange={setTriggerContentExpanded}
    expandedContent={
      <>
        <BodyText>Account Number: 1234567890</BodyText>
        <BodyText>Sort Code: 12-34-56</BodyText>
        <BodyText>Balance: £123.45</BodyText>
      </>
    }
    triggerContent={
      <View style={{ flex: 1, gap: 4 }}>
        <BodyText weight="semibold">Use `triggerContent`</BodyText>
        <BodyText color="secondary">Replace the built-in trigger layout</BodyText>
      </View>
    }
  />

  <ExpandableCard expanded={customChildrenExpanded} onExpandedChange={setCustomChildrenExpanded}>
    <ExpandableCardTrigger
      onPress={() => setCustomChildrenExpanded(!customChildrenExpanded)}
      isExpanded={customChildrenExpanded}
      showChevron
    >
      <ExpandableCardContent>
        <ExpandableCardText>Use `children` + `showChevron`</ExpandableCardText>
        <ExpandableCardHelperText>
          Build the trigger yourself and keep the chevron
        </ExpandableCardHelperText>
      </ExpandableCardContent>
    </ExpandableCardTrigger>
    <ExpandableCardExpandedContent isExpanded={customChildrenExpanded}>
      <BodyText>Account Number: 1234567890</BodyText>
      <BodyText>Sort Code: 12-34-56</BodyText>
      <BodyText>Balance: £123.45</BodyText>
      <BodyText>Last Updated: 12/11/25</BodyText>
    </ExpandableCardExpandedContent>
  </ExpandableCard>
</div>
```

```tsx
import {
  ExpandableCard,
  ExpandableCardTrigger,
  ExpandableCardExpandedContent,
  ExpandableCardContent,
  ExpandableCardHelperText,
  ExpandableCardText,
  BodyText,
} from '@utilitywarehouse/hearth-react-native';
import { useState } from 'react';
import { View } from 'react-native';

const MyComponent = () => {
  const [triggerContentExpanded, setTriggerContentExpanded] = useState(false);
  const [customChildrenExpanded, setCustomChildrenExpanded] = useState(false);

  return (
    <>
      <ExpandableCard
        expanded={triggerContentExpanded}
        onExpandedChange={setTriggerContentExpanded}
        expandedContent={<BodyText>Use `triggerContent` for a full replacement.</BodyText>}
        triggerContent={
          <View style={{ flex: 1, gap: 4 }}>
            <BodyText weight="semibold">Use `triggerContent`</BodyText>
            <BodyText color="secondary">Replace the built-in trigger layout</BodyText>
          </View>
        }
      />

      <ExpandableCard
        expanded={customChildrenExpanded}
        onExpandedChange={setCustomChildrenExpanded}
      >
        <ExpandableCardTrigger
          onPress={() => setCustomChildrenExpanded(!customChildrenExpanded)}
          isExpanded={customChildrenExpanded}
          showChevron
        >
          <ExpandableCardContent>
            <ExpandableCardText>Use `children` + `showChevron`</ExpandableCardText>
            <ExpandableCardHelperText>
              Build the trigger yourself and keep the chevron
            </ExpandableCardHelperText>
          </ExpandableCardContent>
        </ExpandableCardTrigger>
        <ExpandableCardExpandedContent isExpanded={customChildrenExpanded}>
          <BodyText>Use `children` when you want full trigger composition control.</BodyText>
        </ExpandableCardExpandedContent>
      </ExpandableCard>
    </>
  );
};
```

### Child Components

When using advanced composition, you have access to these components:

- **`ExpandableCardTrigger`**: The clickable header section with heading, helper text, leading/trailing content
- **`ExpandableCardExpandedContent`**: Wrapper for the expanded content area with animation controls
- **`ExpandableCardContent`**: Content container with proper spacing and gap
- **`ExpandableCardIcon`**: Styled icon component for leading icons
- **`ExpandableCardText`**: Styled text for main heading
- **`ExpandableCardHelperText`**: Styled text for helper/secondary text
- **`ExpandableCardLeadingContent`**: Container for leading content (icons, images, etc.)
- **`ExpandableCardTrailingContent`**: Container for trailing content
- **`ExpandableCardTrailingIcon`**: Styled icon for trailing position

Use `triggerContent` when you want a simpler one-prop replacement on `ExpandableCard`. Use `ExpandableCardTrigger` children when you want to compose the trigger structure yourself. The built-in chevron is shown by default, and you can set `showChevron={false}` if you want to hide it.

## Accessibility

The ExpandableCard component includes built-in accessibility support:

- Uses `accessibilityRole="button"` to indicate it's interactive
- Sets `accessibilityState` to communicate expanded/collapsed and disabled states
- Provides meaningful `accessibilityLabel` combining heading and helper text
- Chevron icon changes direction to indicate current state
- Keyboard accessible when used on web

## Best Practices

1. **Use descriptive headings**: Make sure your heading clearly describes what content will be revealed.

2. **Keep expanded content concise**: While you can put any content inside, try to keep it focused and scannable.

3. **Group related cards**: Use `ExpandableCardGroup` to organize multiple related expandable cards with a common header.

4. **Consider initial state**: Most cards should start collapsed, but you can default to expanded for critical information.

5. **Provide visual context**: Use leading icons or icon containers to help users quickly identify the card's purpose.

6. **Use numeric values appropriately**: Display counts, amounts, or other quantitative data that adds quick context.

7. **Controlled vs Uncontrolled**: Use controlled state (via `expanded` and `onExpandedChange`) when you need to manage expansion state externally, otherwise let the component handle it internally.
