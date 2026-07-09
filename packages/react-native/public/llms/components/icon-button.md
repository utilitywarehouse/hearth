# Icon Button

The `IconButton` component is used to trigger an action or event, such as opening a dialog, canceling an action, or performing a delete operation.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Variants](#variants)
- [Custom Color Overrides](#custom-color-overrides)

## Playground

```tsx
<IconButton {...args} icon={icon} />
```

## Usage

```tsx
import { IconButton } from '@utilitywarehouse/hearth-react-native';
import { ChevronRightMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  const handlePress = () => {
    console.log('Button pressed');
  };
  return (
    <IconButton
      icon={ChevronRightMediumIcon}
      size="sm"
      onPress={handlePress}
      colorScheme="affirmative"
    />
  );
};
```

## Props

| Property                | Type                                                                             | Description                                                                                 | Default     |
| ----------------------- | -------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- | ----------- |
| `onPress`               | `() => void`                                                                     | Callback function to be called when the button is pressed.                                  | -           |
| `variant`               | `'emphasis' \| 'solid' \| 'outline' \| 'ghost'`                                  | The variant of the button.                                                                  | 'solid'     |
| `size`                  | `'xs' \| 'md' `                                                                  | The size of the button.                                                                     | 'md'        |
| `colorScheme`           | `'highlight' \| 'affirmative \| 'destructive' \|`<br />` 'functional' \| 'gold'` | The colour scheme of the button.                                                            | 'highlight' |
| `loading`               | `boolean`                                                                        | Changes the button to a loading state.                                                      | `false`     |
| `disabled`              | `boolean`                                                                        | Disables the button.                                                                        | `false`     |
| `pressed`               | `boolean`                                                                        | Changes the button to a pressed state.                                                      | `false`     |
| `backgroundColor`       | `ColorValue`                                                                     | Custom background color override. Use sparingly for specific use cases only.                | -           |
| `activeBackgroundColor` | `ColorValue`                                                                     | Custom active/pressed background color override. Use sparingly for specific use cases only. | -           |
| `shadowColor`           | `ColorValue`                                                                     | Custom shadow color override. Use sparingly for specific use cases only.                    | -           |

## Variants

```tsx
<Flex direction="row" spacing="lg" wrap="wrap">
  {schemes.map(scheme => (
    <Flex direction="column" spacing="lg" key={scheme}>
      {variants
        .filter(variant => {
          if (inverted) {
            if (scheme === 'highlight') {
              return variant === 'emphasis' || variant === 'solid';
            }
            if (scheme === 'functional') {
              return variant === 'outline' || variant === 'ghost';
            } else return false;
          }
          if (scheme === 'highlight') {
            return variant === 'emphasis' || variant === 'solid';
          }
          if (scheme === 'functional') {
            return variant === 'outline' || variant === 'ghost';
          } else {
            return variant === 'solid' || variant === 'ghost' || variant === 'outline';
          }
        })
        .map(variant => (
          <Box key={variant} mb="100">
            <Box mb="100">
              <DetailText size="lg" color={inverted ? 'warmWhite50' : 'grey1000'}>
                {scheme} - {variant}
              </DetailText>
            </Box>
            <Flex direction="column" spacing="lg">
              <VariantTitle title="Default" invert={inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <IconButton
                  variant={variant}
                  colorScheme={scheme}
                  size={size}
                  inverted={inverted}
                  icon={icon}
                />
              </VariantTitle>
              <VariantTitle title="Pressed" invert={inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <IconButton
                  pressed
                  variant={variant}
                  colorScheme={scheme}
                  size={size}
                  inverted={inverted}
                  icon={icon}
                />
              </VariantTitle>
              <VariantTitle title="Disabled" invert={inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <IconButton
                  disabled
                  variant={variant}
                  colorScheme={scheme}
                  size={size}
                  inverted={inverted}
                  icon={icon}
                />
              </VariantTitle>
              <VariantTitle title="Loading" invert={inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <IconButton
                  loading
                  variant={variant}
                  colorScheme={scheme}
                  disabled
                  size={size}
                  inverted={inverted}
                  icon={icon}
                />
              </VariantTitle>
            </Flex>
          </Box>
        ))}
    </Flex>
  ))}
</Flex>
```

## Custom Color Overrides

The `IconButton` component supports custom color overrides through the `backgroundColor`, `activeBackgroundColor`, and `shadowColor` props.

**⚠️ Important:** These props should be used **sparingly** and only for specific use cases where brand-specific colors are required, such as service buttons (Electricity, Broadband, Mobile, Insurance, Cashback Card).

For most use cases, you should use the standard `colorScheme` and `variant` props which maintain design system consistency.

### Example: Service Icon Buttons

```tsx
<ButtonGroup spacing="md">
  <IconButton
    icon={ElectricityMediumIcon}
    backgroundColor="energyBlue200"
    activeBackgroundColor="energyBlue300"
    variant="emphasis"
    shadowColor="energyBlue300"
    onPress={() => console.log('Pressed')}
  />
  <IconButton
    icon={BroadbandMediumIcon}
    backgroundColor="broadbandGreen200"
    activeBackgroundColor="broadbandGreen300"
    variant="emphasis"
    shadowColor="broadbandGreen300"
    onPress={() => console.log('Pressed')}
  />
  <IconButton
    icon={MobileMediumIcon}
    backgroundColor="mobileRose200"
    activeBackgroundColor="mobileRose300"
    variant="emphasis"
    shadowColor="mobileRose400"
    onPress={() => console.log('Pressed')}
  />
  <IconButton
    icon={InsuranceMediumIcon}
    backgroundColor="insuranceOrange300"
    activeBackgroundColor="insuranceOrange400"
    variant="emphasis"
    shadowColor="insuranceOrange400"
    onPress={() => console.log('Pressed')}
  />
  <IconButton
    icon={CashbackCardMediumIcon}
    backgroundColor="cashbackLilac300"
    activeBackgroundColor="cashbackLilac400"
    variant="emphasis"
    shadowColor="cashbackLilac500"
    onPress={() => console.log('Pressed')}
  />
</ButtonGroup>
```

```tsx
import { IconButton } from '@utilitywarehouse/hearth-react-native';
import {
  ElectricityMediumIcon,
  BroadbandMediumIcon,
  MobileMediumIcon,
  InsuranceMediumIcon,
  CashbackCardMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  return (
    <>
      <IconButton
        icon={ElectricityMediumIcon}
        backgroundColor="energyBlue200"
        activeBackgroundColor="energyBlue300"
        variant="emphasis"
        shadowColor="energyBlue300"
        onPress={() => console.log('Pressed')}
      />
      <IconButton
        icon={BroadbandMediumIcon}
        backgroundColor="broadbandGreen200"
        activeBackgroundColor="broadbandGreen300"
        variant="emphasis"
        shadowColor="broadbandGreen300"
        onPress={() => console.log('Pressed')}
      />
      <IconButton
        icon={MobileMediumIcon}
        backgroundColor="mobileRose200"
        activeBackgroundColor="mobileRose300"
        variant="emphasis"
        shadowColor="mobileRose400"
        onPress={() => console.log('Pressed')}
      />
      <IconButton
        icon={InsuranceMediumIcon}
        backgroundColor="insuranceOrange300"
        activeBackgroundColor="insuranceOrange400"
        variant="emphasis"
        shadowColor="insuranceOrange400"
        onPress={() => console.log('Pressed')}
      />
      <IconButton
        icon={CashbackCardMediumIcon}
        backgroundColor="cashbackLilac300"
        activeBackgroundColor="cashbackLilac400"
        variant="emphasis"
        shadowColor="cashbackLilac500"
        onPress={() => console.log('Pressed')}
      />
    </>
  );
};
```

### Override Props Behavior

- **`backgroundColor`**: Sets the base background color of the button, overriding the color scheme's default background
- **`activeBackgroundColor`**: Sets the background color when the button is pressed or in an active state
- **`shadowColor`**: Sets the shadow/elevation color for the button

These overrides work alongside the existing `variant` and `colorScheme` props, allowing you to maintain the structural styling while customising colors for specific branding requirements.
