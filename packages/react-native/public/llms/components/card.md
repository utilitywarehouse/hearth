# Card

A Card component serves as a visual container that groups related content and actions.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
  - [`CardPressHandler` Props](#cardpresshandler-props)
  - [`CardAction` Props](#cardaction-props)
- [Variants](#variants)
- [Examples](#examples)
  - [Interactive](#interactive)
  - [With Shadow](#with-shadow)
  - [With `CardAction`](#with-cardaction)
    - [`CardAction` Playground](#cardaction-playground)
    - [`CardAction` With Badge](#cardaction-with-badge)
    - [`CardAction` Size Variants](#cardaction-size-variants)
    - [`CardAction` Advanced Usage with Children](#cardaction-advanced-usage-with-children)
    - [`CardAction` Component Parts](#cardaction-component-parts)
    - [`CardAction` Accessibility](#cardaction-accessibility)

## Playground

```tsx
<Card {...props}>
  <BodyText>{children as string}</BodyText>
</Card>
```

## Usage

```jsx
import { Card, BodyText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Card colorScheme="neutralStrong" variant="subtle">
    <DetailText size="2xl">Quick Start</DetailText>
    <BodyText>Start building your next project in minutes.</BodyText>
  </Card>
);
```

## Props

| Property       | Type                                                                                                                                                       | Description                                | Default           |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------ | ----------------- |
| variant        | `'subtle' \| 'emphasis' `                                                                                                                                  | The variant of the card.                   | `'subtle'`        |
| colorScheme    | `'neutralStrong' \| 'neutralSubtle' \| 'brand' \| 'energy'` <br /> `'broadband' \| 'mobile' \| 'insurance' \| 'cashback' \|` <br /> `'highlight' \| 'pig'` | The color scheme of the card.              | `'neutralStrong'` |
| shadowColor    | `'functional' \| 'brand' \| 'energy' \| 'broadband' \| 'mobile' `<br /> `'insurance' \| 'cashback' \| 'pig'`                                               | The shadow color of the card.              | `-`               |
| noPadding      | `boolean`                                                                                                                                                  | Whether or not the card has padding.       | `false`           |
| onPress        | `() => void`                                                                                                                                               | Callback function to be called.            | `-`               |
| disabled       | `boolean`                                                                                                                                                  | Whether the card is disabled.              | `false`           |
| spacing        | `'none' \| '2xs' \| 'xs' \| 'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl'`                                                                                         | The space between the content.             | `none`            |
| alignItems     | `'flex-start' \| 'flex-end' \| `<br />`'center' \| 'stretch' \| 'baseline'`                                                                                | The align items of the flex container.     | `flex-start`      |
| justifyContent | `'flex-start' \| 'flex-end' \| 'center' \| 'space-between' \| `<br />` 'space-around' \| 'space-evenly'`                                                   | The justify content of the flex container. | `flex-start`      |
| flexWrap       | `'wrap' \| 'nowrap' \| 'wrap-reverse'`                                                                                                                     | The wrap of the flex container.            | `nowrap`          |
| flexDirection  | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'`                                                                                                   | The direction of the flex container.       | `column`          |
| gap            | `number`                                                                                                                                                   | The gap between the content.               | `0`               |
| rowGap         | `number`                                                                                                                                                   | The row gap between the content.           | `0`               |
| columnGap      | `number`                                                                                                                                                   | The column gap between the content.        | `0`               |

### `CardPressHandler` Props

| Property         | Type     | Description                                                                 | Default   |
| ---------------- | -------- | --------------------------------------------------------------------------- | --------- |
| handlerToInherit | `string` | The handler to inherit from the child component when the `Card` is pressed. | `onPress` |

### `CardAction` Props

| Property             | Type                                                                                               | Description                                              | Default    |
| -------------------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------- | ---------- |
| loading              | `boolean`                                                                                          | Show loading skeleton state                              | `false`    |
| disabled             | `boolean`                                                                                          | Disable interactions                                     | `false`    |
| size                 | `'md' \| 'lg'`                                                                                     | Size of the heading text                                 | `'md'`     |
| onPress              | `() => void`                                                                                       | Callback when the action is pressed                      | `-`        |
| heading              | `string`                                                                                           | The main heading text (required when not using children) | `-`        |
| helperText           | `string`                                                                                           | Optional secondary text below the heading                | `-`        |
| leadingIcon          | `ReactNode`                                                                                        | The leading icon.                                        | `-`        |
| trailingIcon         | `ReactNode`                                                                                        | The trailing icon.                                       | `-`        |
| leadingContent       | `ReactNode`                                                                                        | Content to display on the left (typically an icon)       | `-`        |
| trailingContent      | `ReactNode`                                                                                        | Content to display on the right (typically an icon)      | `-`        |
| iconContainer        | `boolean`                                                                                          | Whether to show the icon container                       | `false`    |
| iconContainerVariant | `'subtle' \| 'emphasis'`                                                                           | Variant of the icon container                            | `'subtle'` |
| iconContainerColor   | `'pig' \| 'energy' \| 'broadband' \| 'mobile' \|` <br />`'insurance' \| 'cashback' \| 'highlight'` | Semantic colour family for surface tokens                | `pig`      |
| badge                | `BadgeProps`                                                                                       | Badge configuration object                               |            |
| badgePosition        | `'bottom' \| 'middle' \| 'right' \| 'top'`                                                         | Position of the badge                                    | `'bottom'` |

## Variants

```tsx
<Flex spacing="lg">
  <VariantTitle title="Subtle - White">
    <Card {...props} variant="subtle" colorScheme="neutralStrong">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Emphasis - White">
    <Card {...props} variant="emphasis" colorScheme="neutralStrong">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Subtle - Warm White">
    <Card {...props} variant="subtle" colorScheme="neutralSubtle">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Emphasis - Warm White">
    <Card {...props} variant="emphasis" colorScheme="neutralSubtle">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Brand - Subtle">
    <Card {...props} colorScheme="brand" variant="subtle">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Brand - Emphasis">
    <Card {...props} colorScheme="brand" variant="emphasis">
      <BodyText inverted>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Energy - Subtle">
    <Card {...props} colorScheme="energy" variant="subtle">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Energy - Emphasis">
    <Card {...props} colorScheme="energy" variant="emphasis">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Broadband - Subtle">
    <Card {...props} colorScheme="broadband" variant="subtle">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Broadband - Emphasis">
    <Card {...props} colorScheme="broadband" variant="emphasis">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Mobile - Subtle">
    <Card {...props} colorScheme="mobile" variant="subtle">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Mobile - Emphasis">
    <Card {...props} colorScheme="mobile" variant="emphasis">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Insurance - Subtle">
    <Card {...props} colorScheme="insurance" variant="subtle">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Insurance - Emphasis">
    <Card {...props} colorScheme="insurance" variant="emphasis">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Cashback - Subtle">
    <Card {...props} colorScheme="cashback" variant="subtle">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Cashback - Emphasis">
    <Card {...props} colorScheme="cashback" variant="emphasis">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Piggy - Subtle">
    <Card {...props} colorScheme="pig" variant="subtle">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Piggy - Emphasis">
    <Card {...props} colorScheme="pig" variant="emphasis">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Highlight - Subtle">
    <Card {...props} colorScheme="highlight" variant="subtle">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Highlight - Emphasis">
    <Card {...props} colorScheme="highlight" variant="emphasis">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
</Flex>
```

### Interactive

You can make the card interactive by adding an `onPress` prop. You can also toggle the `selected` prop
to change the card's appearance.

Alternatively to make the card inherit an event handler from a child component, you can use the `CardPressHandler` component.
This will by default inherit the `onPress` handler from the child component. You can specify a different action
by passing the `handlerToInherit` prop e.g `onChange`. Wrapping a component in a `CardPressHandler` component will
make the card interactive and also show the `active` state of the child component when the `Card` is pressed.

```tsx
<Flex spacing="lg">
  <VariantTitle title="Pressable - Subtle - White">
    <Card
      {...props}
      onPress={() => console.log('pressed')}
      variant="subtle"
      colorScheme="neutralStrong"
      spacing="md"
      flexDirection="column"
      alignItems="stretch"
    >
      <Heading size="md">Heading</Heading>
      <BodyText>{children as string}</BodyText>
      <Button onPress={() => console.log('pressed')}>Press me</Button>
    </Card>
  </VariantTitle>
  <VariantTitle title="Pressable - Emphasis - White">
    <Card
      {...props}
      onPress={() => console.log('pressed')}
      variant="emphasis"
      colorScheme="neutralStrong"
      spacing="md"
      flexDirection="column"
      alignItems="stretch"
    >
      <Heading size="md">Heading</Heading>
      <BodyText>{children as string}</BodyText>
      <Button onPress={() => console.log('pressed')}>Press me</Button>
    </Card>
  </VariantTitle>
  <VariantTitle title="Pressable - Subtle - Warm White">
    <Card
      {...props}
      onPress={() => console.log('pressed')}
      variant="subtle"
      colorScheme="neutralSubtle"
      spacing="md"
      flexDirection="column"
      alignItems="stretch"
    >
      <Heading size="md">Heading</Heading>
      <BodyText>{children as string}</BodyText>
      <Button onPress={() => console.log('pressed')}>Press me</Button>
    </Card>
  </VariantTitle>
  <VariantTitle title="Pressable - Emphasis - Warm White">
    <Card
      {...props}
      variant="emphasis"
      colorScheme="neutralSubtle"
      spacing="md"
      flexDirection="column"
      alignItems="stretch"
    >
      <Heading size="md">Heading</Heading>
      <BodyText>{children as string}</BodyText>
      <CardPressHandler>
        <Button onPress={() => console.log('pressed')}>Press me</Button>
      </CardPressHandler>
    </Card>
  </VariantTitle>
</Flex>
```

See example below for how to use the `CardPressHandler` component:

```jsx
import {
  Card,
  CardPressHandler,
  BodyText,
  Heading,
  Flex,
  Button,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Card variant="emphasis" colorScheme="neutralSubtle">
    <Flex spacing="md" direction="column" align="stretch">
      <Heading size="md">Heading</Heading>
      <BodyText>Content</BodyText>
      <CardPressHandler>
        <Button onPress={() => console.log('pressed')}>Press me</Button>
      </CardPressHandler>
    </Flex>
  </Card>
);
```

### With Shadow

You can add shadow to the `Card` component by using the `shadowColor` prop. This prop accepts various semantic color options to match your design needs.

```tsx
<Flex spacing="lg">
  <VariantTitle title="Subtle - White - Shadow">
    <Card {...props} variant="subtle">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
  <VariantTitle title="Emphasis - White - Shadow">
    <Card {...props} variant="emphasis">
      <BodyText>{children as string}</BodyText>
    </Card>
  </VariantTitle>
</Flex>
```

```jsx
import { Card, BodyText, Heading } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Card shadowColor="functional" variant="emphasis">
    <Heading size="lg">Card with Shadow</Heading>
    <BodyText>This card has a shadow applied using the shadowColor prop.</BodyText>
  </Card>
);
```

### With `CardAction`

You can use the `CardAction` component within a `Card` to create actionable items with consistent styling.

```tsx
<Flex gap="400">
  <Card {...props} flexDirection="column" alignItems="stretch" spacing="md" variant="emphasis">
    <BodyText>{children as string}</BodyText>
    <CardActions>
      <CardAction
        onPress={() => console.log('Card action pressed')}
        heading="Card Action Head"
        helperText="Some helper text"
        leadingIcon={BellMediumIcon}
      />
      <CardAction
        onPress={() => console.log('Card action pressed')}
        heading="Card Action Head"
        leadingIcon={BellMediumIcon}
      />
      <CardAction
        onPress={() => console.log('Card action pressed')}
        heading="Card Action Head"
        helperText="Testing"
        leadingIcon={BellMediumIcon}
        iconContainer={false}
      />
    </CardActions>
  </Card>
  <Card {...props} flexDirection="column" alignItems="stretch" spacing="md" variant="subtle">
    <BodyText>{children as string}</BodyText>
    <CardActions>
      <CardAction
        onPress={() => console.log('Card action pressed')}
        heading="Card Action Head"
        helperText="Some helper text"
        leadingIcon={BellMediumIcon}
      />
      <CardAction
        onPress={() => console.log('Card action pressed')}
        heading="Card Action Head"
        leadingIcon={BellMediumIcon}
      />
      <CardAction
        onPress={() => console.log('Card action pressed')}
        heading="Card Action Head"
        helperText="Testing"
        leadingIcon={BellMediumIcon}
        iconContainer={false}
      />
    </CardActions>
  </Card>
</Flex>
```

```jsx
import {
  Card,
  CardAction,
  CardActions,
  BodyText,
  Heading,
  Flex,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Card variant="emphasis">
    <BodyText>Content</BodyText>
    <CardActions>
      <CardAction
        onPress={() => console.log('Card action pressed')}
        heading="Card Action Head"
        helperText="Some helper text"
        leadingIcon={BellMediumIcon}
      />
      <CardAction
        onPress={() => console.log('Card action pressed')}
        heading="Card Action Head"
        leadingIcon={BellMediumIcon}
      />
      <CardAction
        onPress={() => console.log('Card action pressed')}
        heading="Card Action Head"
        helperText="Testing"
        leadingIcon={BellMediumIcon}
        iconContainer={false}
      />
    </CardActions>
  </Card>
);
```

#### `CardAction` Playground

```tsx
<View style={{ width: '100%', maxWidth: 400, gap: 16 }}>
  <Card variant="emphasis">
    <CardActions>
      <CardAction {...args} leadingIcon={leadingIcon} trailingIcon={trailingIcon} />
    </CardActions>
  </Card>
</View>
```

#### `CardAction` With Badge

The badge can be positioned in three different locations:

```tsx
import { Card, CardAction, CardActions, Badge } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <>
    {/* Badge at bottom (default) */}
    <Card>
      <CardActions>
        <CardAction
          heading="Action"
          helperText="Helper text"
          badge={<Badge text="New" />}
          badgePosition="bottom"
          onPress={() => console.log('pressed')}
        />
      </CardActions>
    </Card>

    {/* Badge in middle (between heading and helper text) */}
    <Card>
      <CardActions>
        <CardAction
          heading="Action"
          helperText="Helper text"
          badge={<Badge text="New" />}
          badgePosition="middle"
          onPress={() => console.log('pressed')}
        />
      </CardActions>
    </Card>

    {/* Badge on the right */}
    <Card>
      <CardActions>
        <CardAction
          heading="Action"
          helperText="Helper text"
          badge={<Badge text="New" />}
          badgePosition="right"
          onPress={() => console.log('pressed')}
        />
      </CardActions>
    </Card>
  </>
);
```

#### `CardAction` Size Variants

```tsx
import { Card, CardAction, CardActions } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <>
    <Card>
      <CardActions>
        <CardAction
          heading="Medium heading"
          helperText="Default md size"
          size="md"
          onPress={() => console.log('pressed')}
        />
      </CardActions>
    </Card>

    <Card>
      <CardActions>
        <CardAction
          heading="Large heading"
          helperText="Larger lg size"
          size="lg"
          onPress={() => console.log('pressed')}
        />
      </CardActions>
    </Card>
  </>
);
```

#### `CardAction` Advanced Usage with Children

For more complex layouts, you can use the component parts directly:

```tsx
import {
  Card,
  CardAction,
  CardActions,
  CardActionLeadingContent,
  CardActionContent,
  CardActionText,
  CardActionHelperText,
  CardActionTrailingContent,
  CardActionIcon,
  CardActionTrailingIcon,
} from '@utilitywarehouse/hearth-react-native';
import {
  ElectricityMediumIcon,
  ChevronRightSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <Card>
    <CardActions>
      <CardAction onPress={() => console.log('pressed')}>
        <CardActionLeadingContent>
          <CardActionIcon as={ElectricityMediumIcon} />
        </CardActionLeadingContent>
        <CardActionContent>
          <CardActionText>Custom Layout</CardActionText>
          <CardActionHelperText>With complete control</CardActionHelperText>
        </CardActionContent>
        <CardActionTrailingContent>
          <CardActionTrailingIcon as={ChevronRightSmallIcon} />
        </CardActionTrailingContent>
      </CardAction>
    </CardActions>
  </Card>
);
```

#### `CardAction` Usage Patterns and Best Practices

Understanding how `Card` detects and renders `CardAction` components will help you structure your code correctly.

##### Using `CardActions`

`CardAction` components must be wrapped in a `CardActions` container. Place `CardActions` as a
direct child of `Card` to give the component a clear boundary for actions and remove heuristics.

```tsx
import { Card, CardAction, CardActions, BodyText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Card>
    <BodyText>Card content here</BodyText>
    <CardActions>
      <CardAction heading="First Action" onPress={() => {}} />
      <CardAction heading="Second Action" onPress={() => {}} />
    </CardActions>
  </Card>
);
```

**Using `CardContent` wrapper (For complex mixed content):**

```tsx
import {
  Card,
  CardContent,
  CardAction,
  CardActions,
  BodyText,
  Heading,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Card>
    <CardContent>
      <Heading>Title</Heading>
      <BodyText>Complex content that shouldn't be auto-wrapped</BodyText>
    </CardContent>
    <CardActions>
      <CardAction heading="Action 1" onPress={() => {}} />
      <CardAction heading="Action 2" onPress={() => {}} />
    </CardActions>
  </Card>
);
```

##### How Card Detects Actions

The `Card` component determines whether it contains only actions or mixed content using the following rules:

- **Type comparison**: Directly checks if children include a `CardActions` container
- **Action boundary**: Only `CardActions` is treated as the action block
- **Automatic wrapping**: When mixing content and actions, non-action content is automatically wrapped in `CardContent`

##### When to Use `CardContent`

Use the explicit `CardContent` wrapper when:

1. **Complex content structure**: You have multiple components and want precise control over what gets wrapped
2. **Avoiding auto-wrap heuristics**: The automatic detection isn't working as expected for your use case
3. **Nested components**: You have deeply nested content structures that might confuse the detection

```tsx
// Scenario: Complex nested structure with custom wrappers
const MyComponent = () => (
  <Card>
    <CardContent>
      <CustomHeader />
      <CustomBody />
      <CustomFooter />
    </CardContent>
    <CardAction heading="Learn More" onPress={() => {}} />
  </Card>
);
```

##### Mapped Actions Best Practices

When mapping over data to create `CardAction` components:

1. **Wrap actions in `CardActions`** for better organisation:

```tsx
const ActionItem = ({ item }) => (
  <CardAction
    heading={item.label}
    helperText={item.description}
    onPress={() => handlePress(item)}
  />
);

<Card>
  <CardActions>
    {actions.map(action => (
      <ActionItem key={action.id} item={action} />
    ))}
  </CardActions>
</Card>;
```

2. **Keep action items simple** - avoid adding extra content alongside `CardAction` items:

```tsx
// ✅ Good: Simple action item
const ActionItem = ({ label }) => <CardAction heading={label} onPress={() => {}} />;

// ❌ Avoid: Adding extra content inside CardActions
const ActionItem = ({ label }) => (
  <View>
    <Text>Extra content</Text>
    <CardAction heading={label} onPress={() => {}} />
  </View>
);
```

3. **Mix mapped actions with direct actions when needed**:

```tsx
<Card>
  <BodyText>Content</BodyText>
  <CardActions>
    {dynamicActions.map(action => (
      <CardAction key={action.id} {...action} />
    ))}
    <CardAction heading="Static Action" onPress={() => {}} />
  </CardActions>
</Card>
```

##### First Action Styling

The first rendered `CardAction` in a card automatically has no top border. This applies even when actions are wrapped in custom components, and follows render order to maintain visual consistency.

#### `CardAction` Component Parts

- `CardAction` - Main component wrapper
- `CardActionContent` - Container for text content
- `CardActionText` - Heading text
- `CardActionHelperText` - Secondary helper text
- `CardActionLeadingContent` - Container for leading content
- `CardActionTrailingContent` - Container for trailing content
- `CardActionIcon` - Styled icon for leading content
- `CardActionTrailingIcon` - Styled icon for trailing content

#### `CardAction` Accessibility

The component automatically sets `accessibilityRole="button"` when an `onPress` handler is provided, ensuring proper screen reader announcements.
