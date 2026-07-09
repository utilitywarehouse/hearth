# List

The List component serves as the primary wrapper for List Items and List Heading components.

List item is the main building block of list. Each item has its own set of properties that you can customise and adapt to suit your needs.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
  - [`List`](#list-1)
  - [`ListItem`](#listitem)
- [Examples](#examples)
  - [`ListItem` with container](#listitem-with-container)
  - [`ListItem` with `Badge`](#listitem-with-badge)
  - [`ListItem` with `Switch`](#listitem-with-switch)
  - [`List` with `SectionHeader`](#list-with-sectionheader)
  - [`List` with `ListAction`](#list-with-listaction)
  - [`ListItem` with transaction](#listitem-with-transaction)
  - [`ListItem` with numeric value](#listitem-with-numeric-value)
  - [`ListItem` with `Link`](#listitem-with-link)
  - [`List` with `FlatList`](#list-with-flatlist)
- [Advanced Usage](#advanced-usage)
- [Accessibility](#accessibility)

## Playground

```tsx
<List {...args} container={container}>
  {Array.from({ length: 4 }).map((_, index) => (
    <ListItem key={index} heading="List item text" helperText="Supporting text" />
  ))}
</List>
```

## Usage

```tsx
import { List, ListItem } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <List heading="Heading" helperText="Supporting text">
    <ListItem heading="List Item 1" onPress={() => console.log('item pressed')} />
    <ListItem heading="List Item 2" onPress={() => console.log('item pressed')} />
    <ListItem heading="List Item 3" onPress={() => console.log('item pressed')} />
  </List>
);
```

### `List`

| Name                  | Type                                                                                              | Default  | Description                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------ |
| container             | `'none' \| 'subtleWhite' \| 'emphasisWhite' \|` <br /> `'subtleWarmWhite' \| 'emphasisWarmWhite'` | `'none'` | The container style of the list.                             |
| heading               | `string`                                                                                          |          | The text to display in the heading of the list.              |
| helperText            | `string`                                                                                          |          | The supporting text to display in the heading of the list.   |
| headerTrailingContent | `ReactNode`                                                                                       |          | Optional content to display on the right side of the header. |
| invalidText           | `string`                                                                                          |          | Validation error text to display in the heading of the list. |
| loading               | `boolean`                                                                                         | `false`  | Whether to show the list items in loading state.             |
| disabled              | `boolean`                                                                                         | `false`  | Whether to disable the list.                                 |

### `ListItem`

| Name               | Type                     | Default  | Description                                                     |
| ------------------ | ------------------------ | -------- | --------------------------------------------------------------- |
| heading            | `string`                 |          | The text to display in the list item.                           |
| onPress            | `() => void`             |          | A callback function to be called when the list item is pressed. |
| helperText         | `string`                 |          | The supporting text to display in the list item.                |
| leadingContent     | `ReactNode`              |          | The leading content to display in the list item.                |
| trailingContent    | `ReactNode`              |          | The trailing content to display in the list item.               |
| variant            | `'subtle' \| 'emphasis'` |          | The variant style of the list item.                             |
| disabled           | `boolean`                | `false`  | Whether to disable the list item.                               |
| loading            | `boolean`                | `false`  | Whether to show the list item in loading state.                 |
| badge              | `ReactNode`              |          | The badge component to display in the list item.                |
| badgePosition      | `'top' \| 'bottom'`      | `bottom` | Position of the badge in the list item.                         |
| numericValue       | `string \| number`       |          | A numeric value to display on the right side of the item.       |
| truncateHeading    | `boolean`                | `false`  | Whether to truncate the heading text if it overflows.           |
| truncateHelperText | `boolean`                | `false`  | Whether to truncate the helper text if it overflows.            |

First-item styling is applied to the first rendered `ListItem` or `ListAction`. Wrapper components that render `null`
are ignored, so conditional list items will not affect which item loses the top border.

### `ListAction`

| Name     | Type         | Default | Description                                                            |
| -------- | ------------ | ------- | ---------------------------------------------------------------------- |
| heading  | `string`     |         | The text to display in the list action item.                           |
| onPress  | `() => void` |         | A callback function to be called when the list action item is pressed. |
| disabled | `boolean`    | `false` | Whether to disable the list action item.                               |
| loading  | `boolean`    | `false` | Whether to show the list action in loading state.                      |

#### - `ListItemIcon`

| Name | Type            | Default | Description                                     |
| ---- | --------------- | ------- | ----------------------------------------------- |
| as   | `ComponentType` |         | The icon component to display in the list item. |

#### - `ListItemHeading`

Has all props of the `BodyText` component.

#### - `ListItemHelperText`

Has all props of the `BodyText` component.

#### - `ListItemTrailingIcon`

| Name | Type            | Default | Description                                     |
| ---- | --------------- | ------- | ----------------------------------------------- |
| as   | `ComponentType` |         | The icon component to display in the list item. |

### `ListItem` with Container

Thie `List` has an inbuilt `Card` component to wrap the list items and setting the `container` prop to one if `subtleWhite`,
`emphasisWhite`, `subtleWarmWhite`, or `emphasisWarmWhite` will apply the respective background color and border colour to
the `Card` and child `ListItem` components.

```tsx
<List container="subtleWhite">
  <ListItem
    leadingContent={<BillMediumIcon />}
    heading="Bills"
    onPress={() => console.log('Bills pressed')}
  />
  <ListItem
    leadingContent={<PaymentMediumIcon />}
    heading="Payments"
    onPress={() => console.log('Payments pressed')}
  />
  <ListItem
    leadingContent={<HomeMediumIcon />}
    heading="Moving Home"
    onPress={() => console.log('Moving Home pressed')}
  />
</List>
```

```tsx
import { List, ListItem, Card } from '@utilitywarehouse/hearth-react-native';
import {
  BillMediumIcon,
  PaymentMediumIcon,
  HomeMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <List container="subtleWhite">
    <ListItem
      leadingContent={<BillMediumIcon />}
      heading="Bills"
      onPress={() => console.log('item pressed')}
    />
    <ListItem
      leadingContent={<PaymentMediumIcon />}
      heading="Payments"
      onPress={() => console.log('item pressed')}
    />
    <ListItem
      leadingContent={<HomeMediumIcon />}
      heading="Moving Home"
      onPress={() => console.log('item pressed')}
    />
  </List>
);
```

### `ListItem` with `Badge`

You can use the `Badge` component to display additional information in the list item. You can achieve this by using the List Item's
parts like `ListItemLeadingContent`, `ListItemContent`, and `ListItemTrailingContent` components.

```tsx
<List>
  <ListItem
    heading="Electricity"
    helperText="Last reading 23/03/24"
    onPress={() => console.log('Electricity pressed')}
    leadingContent={
      <IconContainer icon={ElectricityMediumIcon} size="md" variant="emphasis" color="energy" />
    }
    badge={<Badge text="Text" />}
  />
  <ListItem
    heading="Gas"
    helperText="Last reading 23/03/24"
    onPress={() => console.log('Gas pressed')}
    leadingContent={
      <IconContainer icon={GasMediumIcon} size="md" variant="emphasis" color="energy" />
    }
    badge={<Badge text="Smart Meter" />}
  />
</List>
```

```tsx
import {
  List,
  ListItem,
  IconContainer,
  Flex,
  Box,
  Badge,
} from '@utilitywarehouse/hearth-react-native';

import { ElectricityMediumIcon, GasMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const BadgeList = () => {
  return (
    <List>
      <ListItem
        heading="Electricity"
        helperText="Last reading 23/03/24"
        onPress={() => console.log('pressed')}
        leadingContent={
          <IconContainer icon={ElectricityMediumIcon} size="md" variant="emphasis" color="energy" />
        }
        badge={<Badge text="Text" />}
      />
      <ListItem
        heading="Gas"
        helperText="Last reading 23/03/24"
        onPress={() => console.log('pressed')}
        leadingContent={
          <IconContainer icon={GasMediumIcon} size="md" variant="emphasis" color="energy" />
        }
        badge={<Badge text="Smart Meter" />}
      />
    </List>
  );
};

export default BadgeList;
```

### `ListItem` with `Switch`

You can use a `Switch` component as the trailing content of a `ListItem` to create toggleable list items.

```tsx
<List container="subtleWhite">
  <ListItem
    heading="Enable notifications"
    helperText="Receive updates and alerts"
    onPress={() => console.log('Notifications pressed')}
    trailingContent={<Switch size="small" value={notifications} onValueChange={setNotifications} />}
  />
  <ListItem
    heading="Dark mode"
    helperText="Use dark theme throughout the app"
    onPress={() => console.log('Dark mode pressed')}
    trailingContent={<Switch size="small" value={darkMode} onValueChange={setDarkMode} />}
  />
</List>
```

```tsx
import { List, ListItem, Switch } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <List container="subtleWhite">
    <ListItem
      heading="Enable notifications"
      helperText="Receive updates and alerts"
      onPress={() => console.log('item pressed')}
      trailingContent={
        <Switch size="small" value={true} onValueChange={() => console.log('switch toggled')} />
      }
    />
    <ListItem
      heading="Dark mode"
      helperText="Use dark theme throughout the app"
      onPress={() => console.log('item pressed')}
      trailingContent={
        <Switch size="small" value={false} onValueChange={() => console.log('switch toggled')} />
      }
    />
  </List>
);
```

### `List` with `SectionHeader`

You can use the `SectionHeader` component to add a heading and supporting text to your list.

```tsx
<List
  heading="Your account"
  helperText="Tap the links below to view your account"
  headerTrailingContent={<Link onPress={() => console.log('View all pressed')}>View all</Link>}
>
  <ListItem
    heading="Bills"
    helperText="View your bills"
    leadingContent={<ListItemIcon as={BillMediumIcon} />}
    trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
    onPress={() => console.log('Bills pressed')}
  />
  <ListItem
    heading="Payments"
    helperText="Make a payment"
    leadingContent={<ListItemIcon as={PaymentMediumIcon} />}
    trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
    onPress={() => console.log('Payments pressed')}
  />
  <ListItem
    heading="Moving home"
    helperText="Tell us if you're moving"
    leadingContent={<ListItemIcon as={HomeMediumIcon} />}
    trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
    onPress={() => console.log('Moving home pressed')}
  />
  <ListItem
    heading="Refer a friend"
    helperText="Get rewarded with a friend"
    leadingContent={<ListItemIcon as={UserMediumIcon} />}
    trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
    onPress={() => console.log('Refer a friend pressed')}
  />
</List>
```

```tsx
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemTrailingIcon,
} from '@utilitywarehouse/hearth-react-native';
import {
  BillMediumIcon,
  ChevronRightSmallIcon,
  PaymentMediumIcon,
  HomeMediumIcon,
  UserMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = ({ navigate }) => (
  <List
    heading="Your account"
    helperText="Tap the links below to view your account"
    headerTrailingContent={<Link onPress={navigate('account')}>View all</Link>}
  >
    <ListItem
      heading="Bills"
      helperText="View your bills"
      leadingContent={<ListItemIcon as={BillMediumIcon} />}
      trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
      onPress={() => console.log('pressed')}
    />
    <ListItem
      heading="Payments"
      helperText="Make a payment"
      leadingContent={<ListItemIcon as={PaymentMediumIcon} />}
      trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
      onPress={() => console.log('pressed')}
    />
    <ListItem
      heading="Moving home"
      helperText="Tell us if you're moving"
      leadingContent={<ListItemIcon as={HomeMediumIcon} />}
      trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
      onPress={() => console.log('pressed')}
    />
    <ListItem
      heading="Refer a friend"
      helperText="Get rewarded with a friend"
      leadingContent={<ListItemIcon as={UserMediumIcon} />}
      trailingContent={<ListItemTrailingIcon as={ChevronRightSmallIcon} />}
      onPress={() => console.log('pressed')}
    />
  </List>
);
```

### `List` with `ListAction`

You can use the `ListAction` component to add actionable items to your list.

```tsx
<List container="subtleWarmWhite">
  <ListItem
    heading="Upgrade your plan this is really long text to test wrapping"
    truncateHeading={true}
    helperText="Get more features with a premium plan"
    onPress={() => console.log('Upgrade pressed')}
  />
  <ListItem
    heading="Manage payment methods"
    helperText="Update your credit or debit cards"
    onPress={() => console.log('Manage pressed')}
    accessibilityRole="link"
  />
  <ListAction heading="Contact support" onPress={() => console.log('Contact pressed')} />
</List>
```

```tsx
import {
  List,
  ListItem,
  ListItemTrailingIcon,
  ListAction,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <List container="subtleWarmWhite">
    <ListItem
      heading="Upgrade your plan"
      helperText="Get more features with a premium plan"
      onPress={() => console.log('Upgrade pressed')}
    />
    <ListItem
      heading="Manage payment methods"
      helperText="Update your credit or debit cards"
      onPress={() => console.log('Manage pressed')}
    />
    <ListAction heading="Contact support" onPress={() => console.log('Contact pressed')} />
  </List>
);
```

### `ListItem` with transaction

You can use the `ListItem` component to display transaction details.

```tsx
<List container="subtleWhite">
  <ListItem
    heading="Coffee Shop"
    helperText="Apr 5, 2024"
    trailingContent={
      <>
        <BodyText>-£100.00</BodyText>
        <BodyText color="brand">+£1.00 CB</BodyText>
      </>
    }
    onPress={() => console.log('Transaction pressed')}
  />
  <ListItem
    heading="Top up"
    helperText="Apr 4, 2024"
    trailingContent={
      <>
        <BodyText color="affirmative">+£100.00</BodyText>
      </>
    }
    onPress={() => console.log('Transaction pressed')}
  />
</List>
```

```tsx
import { List, ListItem, BodyText } from '@utilitywarehouse/hearth-react-native';
const MyComponent = () => (
  <List container="subtleWhite">
    <ListItem
      heading="Coffee Shop"
      helperText="Apr 5, 2024"
      trailingContent={
        <>
          <BodyText>-£100.00</BodyText>
          <BodyText color="brand">-£100.00</BodyText>
        </>
      }
      onPress={() => console.log('Transaction pressed')}
    />
    <ListItem
      heading="Top up"
      helperText="Apr 4, 2024"
      trailingContent={
        <>
          <BodyText color="affirmative">+£100.00</BodyText>
        </>
      }
      onPress={() => console.log('Transaction pressed')}
    />
  </List>
);
```

### `ListItem` with numeric value

You can use the `numericValue` prop to display a numeric value on the right side of the `ListItem`.

```tsx
<List container="subtleWhite">
  <ListItem
    heading="Steps today"
    numericValue="8,542"
    onPress={() => console.log('Steps pressed')}
  />
  <ListItem
    heading="Calories burned"
    numericValue="2,300 kcal"
    onPress={() => console.log('Calories pressed')}
  />
</List>
```

```tsx
import { List, ListItem } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <List container="subtleWhite">
    <ListItem
      heading="Steps today"
      numericValue="8,542"
      onPress={() => console.log('Steps pressed')}
    />
    <ListItem
      heading="Calories burned"
      numericValue="2,300 kcal"
      onPress={() => console.log('Calories pressed')}
    />
  </List>
);
```

### `ListItem` with `Link`

You can use a `Link` component as the trailing content of a `ListItem` to create list items with links.

```tsx
<List container="subtleWhite">
  <ListItem
    heading="Terms of Service"
    onPress={() => console.log('Terms pressed')}
    trailingContent={<Link onPress={() => console.log('View link pressed')}>View</Link>}
  />
  <ListItem
    heading="Privacy Policy"
    onPress={() => console.log('Privacy pressed')}
    trailingContent={<Link onPress={() => console.log('View link pressed')}>View</Link>}
  />
</List>
```

```tsx
import { List, ListItem, Link } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <List container="subtleWhite">
    <ListItem
      heading="Terms of Service"
      onPress={() => console.log('item pressed')}
      trailingContent={<Link onPress={() => console.log('link pressed')}>View</Link>}
    />
    <ListItem
      heading="Privacy Policy"
      onPress={() => console.log('item pressed')}
      trailingContent={<Link onPress={() => console.log('link pressed')}>View</Link>}
    />
  </List>
);
```

### `List` with `FlatList`

You can use the `FlatList` component to render a large list of items efficiently.

```tsx
import { FlatList } from 'react-native';
import { List, ListItem } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <List container="subtleWhite">
    <FlatList
      data={[
        { id: '1', heading: 'Item 1' },
        { id: '2', heading: 'Item 2' },
        { id: '3', heading: 'Item 3' },
      ]}
      renderItem={({ item }) => (
        <ListItem heading={item.heading} onPress={() => console.log(`${item.heading} pressed`)} />
      )}
      keyExtractor={item => item.id}
    />
  </List>
);
```

## Advanced Usage

If you need to use the `<List>` component in a more advanced way, you can use the parts of the component directly.

```tsx
import {
  List,
  SectionHeader,
  ListItem,
  ListItemIcon,
  ListItemLeadingContent,
  ListItemHelperText,
  ListItemHeading,
  ListItemTrailingContent,
  ListItemTrailingIcon,
  ListItemContent,
} from '@utilitywarehouse/hearth-react-native';
import {
  BillMediumIcon,
  ChevronRightSmallIcon,
  PaymentMediumIcon,
  HomeMediumIcon,
  UserMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <List>
    <SectionHeader heading="Your account" helperText="Tap the links below to view your account" />
    <ListItem onPress={() => console.log('pressed')}>
      <ListItemLeadingContent>
        <ListItemIcon as={BillMediumIcon} />
      </ListItemLeadingContent>
      <ListItemContent>
        <ListItemHeading>Bills</ListItemHeading>
        <ListItemHelperText>View your bills</ListItemHelperText>
      </ListItemContent>
      <ListItemTrailingContent>
        <ListItemTrailingIcon as={ChevronRightSmallIcon} />
      </ListItemTrailingContent>
    </ListItem>
    <ListItem onPress={() => console.log('pressed')}>
      <ListItemLeadingContent>
        <ListItemIcon as={PaymentMediumIcon} />
      </ListItemLeadingContent>
      <ListItemContent>
        <ListItemHeading>Payments</ListItemHeading>
        <ListItemHelperText>Make a payment</ListItemHelperText>
      </ListItemContent>
      <ListItemTrailingContent>
        <ListItemTrailingIcon as={ChevronRightSmallIcon} />
      </ListItemTrailingContent>
    </ListItem>
    <ListItem onPress={() => console.log('pressed')}>
      <ListItemLeadingContent>
        <ListItemIcon as={HomeMediumIcon} />
      </ListItemLeadingContent>
      <ListItemContent>
        <ListItemHeading>Moving home</ListItemHeading>
        <ListItemHelperText>Tell us if your moving</ListItemHelperText>
      </ListItemContent>
      <ListItemTrailingContent>
        <ListItemTrailingIcon as={ChevronRightSmallIcon} />
      </ListItemTrailingContent>
    </ListItem>
    <ListItem onPress={() => console.log('pressed')}>
      <ListItemLeadingContent>
        <ListItemIcon as={UserMediumIcon} />
      </ListItemLeadingContent>
      <ListItemContent>
        <ListItemHeading>Refer a friend</ListItemHeading>
        <ListItemHelperText>Get rewarded with a friend</ListItemHelperText>
      </ListItemContent>
      <ListItemTrailingContent>
        <ListItemTrailingIcon as={ChevronRightSmallIcon} />
      </ListItemTrailingContent>
    </ListItem>
  </List>
);
```

## Accessibility

The List component is designed with accessibility in mind to ensure all users can interact with list items effectively.

### Screen Reader Support

- **List Items with `onPress`**: When a `ListItem` has an `onPress` handler, it is automatically exposed to screen readers (VoiceOver on iOS and TalkBack on Android) as an interactive element. Users can focus on and activate these items using assistive technologies.

- **List Items without `onPress`**: Non-interactive list items are still accessible to screen readers, allowing users to navigate through and read the content. The list structure is preserved for context.

- **List with Container**: When using the `container` prop (e.g., `subtleWhite`, `emphasisWhite`), the List wraps items in a Card component. The Card wrapper itself is hidden from screen readers, but all ListItems remain fully accessible and focusable.

- **ListAction**: The `ListAction` component is always interactive and accessible as a button element with screen readers.

### Best Practices

- Use descriptive `heading` and `helperText` to provide clear context for each list item
- Ensure `onPress` handlers provide meaningful feedback for interactive items
- When using custom content with `children`, ensure all interactive elements are properly labeled
- Test with VoiceOver (iOS) and TalkBack (Android) to verify the experience
- Avoid nesting too many interactive elements within a single ListItem to prevent confusion
