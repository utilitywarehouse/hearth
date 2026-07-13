# Badge

Use the `Badge` component to draw attention to another interface element or to provide additional context (such as status).

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Color Schemes](#color-schemes)
- [Advanced Usage](#advanced-usage)

## Playground

```tsx
// Example usage
<Badge {...args} icon={icon} />
```

## Usage

Badge is a stateless component, e.g. it has no Pressed, Disabled, Active states. Badges should not be used as a mechanism for:

- Filtering content
- Assigning a piece of content to a group (tagging)
- Performing an action

```jsx
// Example usage
import { Badge, Center } from '@utilitywarehouse/hearth-react-native';
import { color } from '@utilitywarehouse/hearth-tokens';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => (
  <Center>
    <Badge colorScheme="danger" icon={TickSmallIcon}>
      I'm a badge
    </Badge>
  </Center>
);
```

## Props

| Property      | Type                                                                                                                                                                      | Description                            | Default  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | -------- |
| `variant`     | `'subtle' \| 'emphasis' \| 'outline'`                                                                                                                                     | The variant of the badge.              | `subtle` |
| `colorScheme` | `'info' \| 'positive' \| 'danger' \| 'warning' \| 'functional' \|`<br />`'energy' \| 'broadband' \| 'mobile' \| 'insurance' \|`<br />`'cashback' \| 'pig' \| 'highlight'` | The color scheme to use for the badge. | `info`   |
| `size`        | `'sm' \| 'md'`                                                                                                                                                            | The size of the badge.                 | `sm`     |
| `flatBase`    | `boolean`                                                                                                                                                                 | Whether the badge has a flat base.     | `false`  |
| `icon`        | `ReactNode`                                                                                                                                                               | The icon to display in the badge.      |          |

## Color Schemes

The `Badge` component has different sizes to style the spinner.

```tsx
// Example usage
<Flex direction="column" spacing="lg" style={{ width: '100%' }}>
  {colorSchemes.map(cs => {
    // Determine allowed variants per color scheme based on design constraints:
    // - Remove 'outline' for energy, broadband, mobile, insurance, cashback, pig, highlight
    // - For highlight only show 'subtle'
    const noOutlineSchemes: Array<BadgeProps['colorScheme']> = [
      'energy',
      'broadband',
      'mobile',
      'insurance',
      'cashback',
      'pig',
      'highlight',
    ];
    let variantsForScheme: Array<BadgeProps['variant']> = ['subtle', 'emphasis', 'outline'];

    if (noOutlineSchemes.includes(cs)) {
      variantsForScheme = ['subtle', 'emphasis'];
    }
    if (cs === 'highlight') {
      variantsForScheme = ['subtle'];
    }

    return (
      <Box key={cs} gap="200">
        <VariantTitle title={cs.charAt(0).toUpperCase() + cs.slice(1)}>
          <Flex direction="column" spacing="sm">
            {sizes.map(sz => (
              <Flex key={sz} direction="row" align="center" spacing="md">
                {variantsForScheme.map(variant => (
                  <Badge
                    key={`${cs}-${sz}-${variant}`}
                    colorScheme={cs}
                    size={sz}
                    variant={variant}
                  >
                    {`${variant} ${sz}`}
                  </Badge>
                ))}
              </Flex>
            ))}
          </Flex>
        </VariantTitle>
      </Box>
    );
  })}
</Flex>
```

## Advanced Usage

Although not recommended, the `Badge` component can be used to create more complex UI with the internal parts of the badge.

```tsx
// Example usage
import { Badge, BadgeText, BadgeIcon } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Badge colorScheme="positive" variant="outline">
    <BadgeIcon as={AddSmallIcon} />
    <BadgeText>Plus</BadgeText>
  </Badge>
);
```
