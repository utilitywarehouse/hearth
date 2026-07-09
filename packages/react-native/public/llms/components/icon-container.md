# Icon Container

The `IconContainer` component provides a consistent background and sizing (via component tokens) for any standalone icon, with semantic colour families and subtle/emphasis variants.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Variants](#variants)

## Playground

```tsx
<IconContainer {...args} />
```

## Usage

Wrap an icon with the `IconContainer` to apply sizing + background styles without repeating layout code.

```jsx
import { IconContainer } from '@utilitywarehouse/hearth-react-native';
import {
  ElectricityMediumIcon,
  BroadbandMediumIcon,
  MobileMediumIcon,
  InsuranceMediumIcon,
  CashbackCardMediumIcon,
  EmailMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <>
    <IconContainer icon={ElectricityMediumIcon} size="md" variant="emphasis" color="energy" />
    <IconContainer icon={BroadbandMediumIcon} size="md" variant="emphasis" color="broadband" />
    <IconContainer icon={MobileMediumIcon} size="md" variant="emphasis" color="mobile" />
    <IconContainer icon={InsuranceMediumIcon} size="md" variant="emphasis" color="insurance" />
    <IconContainer icon={CashbackCardMediumIcon} size="md" variant="emphasis" color="cashback" />
    <IconContainer icon={EmailMediumIcon} size="md" variant="emphasis" color="pig" />
  </>
);
```

## Props

| Name         | Type                                                                                               | Description                                     | Default    |
| ------------ | -------------------------------------------------------------------------------------------------- | ----------------------------------------------- | ---------- |
| `icon`       | `React.ComponentType`                                                                              | Icon component rendered inside the container    | (required) |
| `size`       | `'sm' \| 'md' \| 'lg'`                                                                             | Size variant (token-based width/height/padding) | `md`       |
| `radiusNone` | `boolean`                                                                                          | Remove border radius (square container)         | `false`    |
| `variant`    | `'subtle' \| 'emphasis'`                                                                           | Background emphasis level                       | `subtle`   |
| `color`      | `'pig' \| 'energy' \| 'broadband' \| 'mobile' \|` <br />`'insurance' \| 'cashback' \| 'highlight'` | Semantic colour family for surface tokens       | `pig`      |
| `...View`    | React Native `ViewProps`                                                                           | Any additional View props                       | -          |

> Colours resolve to `theme.color.surface.<family>.{subtle|default}` depending on variant.

## Variants

Use the matrix below to compare every combination of size, variant, and color.

```tsx
<Flex direction="column" spacing="lg">
  {sizes.map(size => (
    <Box key={size} gap="300">
      <VariantTitle title={`Size: ${size.toUpperCase()} / Subtle`}>
        <Flex direction="row" wrap="wrap" spacing="md">
          {colors.map(color => (
            <IconContainer
              key={`${size}-subtle-${color}`}
              icon={icon}
              size={size}
              variant="subtle"
              color={color}
            />
          ))}
        </Flex>
      </VariantTitle>
      <VariantTitle title={`Size: ${size.toUpperCase()} / Emphasis`}>
        <Flex direction="row" wrap="wrap" spacing="md">
          {colors.map(
            color =>
              color !== 'highlight' && (
                <IconContainer
                  key={`${size}-emphasis-${color}`}
                  icon={icon}
                  size={size}
                  variant="emphasis"
                  color={color}
                />
              )
          )}
        </Flex>
      </VariantTitle>
    </Box>
  ))}
</Flex>
```
