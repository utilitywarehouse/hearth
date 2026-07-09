# Indicator Icon Button

The `IndicatorIconButton` component is used to trigger an action or event, such as opening a dialog or navigating to other screen. It extends the regular `UnstyledIconButton` with an optional red dot indicator in the top-right corner, useful for showing notifications or unread status.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)

## Playground

```tsx
<IndicatorIconButton {...args} icon={icon} />
```

## Usage

```tsx
import { IndicatorIconButton } from '@utilitywarehouse/hearth-react-native';
import { BellMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  const handlePress = () => {
    console.log('Button pressed');
  };
  return <IndicatorIconButton icon={BellMediumIcon} onPress={handlePress} indicator={true} />;
};
```

## Props

| Property    | Type         | Description                                                | Default |
| ----------- | ------------ | ---------------------------------------------------------- | ------- |
| `onPress`   | `() => void` | Callback function to be called when the button is pressed. | -       |
| `pressed`   | `boolean`    | Changes the button to a pressed state.                     | `false` |
| `indicator` | `boolean`    | Shows a red dot indicator in the top-right corner.         | `false` |

### Variants

```tsx
<Flex direction="column" spacing="xl">
  <Flex direction="row" spacing="lg">
    <Box>
      <VariantTitle title="Without Indicator" invert={args.inverted}>
        <IndicatorIconButton {...args} icon={icon} indicator={false} />
      </VariantTitle>
    </Box>
    <Box>
      <VariantTitle title="With Indicator" invert={args.inverted}>
        <IndicatorIconButton {...args} icon={icon} indicator={true} />
      </VariantTitle>
    </Box>
  </Flex>
  <Flex direction="row" spacing="lg">
    <Box style={{ backgroundColor: 'purple', padding: 10, borderRadius: 8 }}>
      <VariantTitle title="Inverted" invert={!args.inverted}>
        <IndicatorIconButton {...args} icon={icon} inverted={true} />
      </VariantTitle>
    </Box>
  </Flex>
</Flex>
```

### Colour icons

You can pass color as the iconStyle props:

```javascript
const { color } = useTheme();

return <IndicatorIconButton {...props} iconStyle={{ color: color.energyBlue[300] }} />;
```

It does not work on Storybook on web, only mobile.

```tsx
<Flex direction="column" spacing="xl">
  <Flex direction="row" spacing="lg">
    <Box>
      <IndicatorIconButton
        {...args}
        icon={icon}
        iconStyle={{ color: theme.color.energyBlue[300] }}
      />
    </Box>
    <Box>
      <IndicatorIconButton
        {...args}
        icon={icon}
        iconStyle={{ color: theme.color.cashbackLilac[500] }}
      />
    </Box>
  </Flex>
</Flex>
```

### Adding accessibility label

```tsx
<Flex direction="column" spacing="xl">
  <Box>
    <VariantTitle title="Notification label" invert={args.inverted}>
      <IndicatorIconButton
        {...args}
        icon={Icons.BellMediumIcon}
        indicator={true}
        accessibilityLabel="New notifications available"
      />
    </VariantTitle>
  </Box>
  <Box>
    <VariantTitle title="No new actions, cashback section" invert={args.inverted}>
      <IndicatorIconButton
        {...args}
        icon={Icons.CashbackCardMediumIcon}
        indicator={false}
        accessibilityLabel="Cashback section"
      />
    </VariantTitle>
  </Box>
  <Box>
    <VariantTitle title="New action, cashback section" invert={args.inverted}>
      <IndicatorIconButton
        {...args}
        icon={Icons.CashbackCardMediumIcon}
        indicator={true}
        accessibilityLabel="Cashback section, new transactions"
      />
    </VariantTitle>
  </Box>
</Flex>
```
