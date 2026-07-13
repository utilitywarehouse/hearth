# Button

The `Button` component is used to trigger an action or event, such as submitting a form, opening a dialog, canceling an action, or performing a delete operation.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Variants](#variants)
- [Advanced Usage](#advanced-usage)
- [Components](#components)
  - [`ButtonGroup`](#buttongroup)
  - [`ButtonIcon`](#buttonicon)
  - [`ButtonText`](#buttontext)
  - [`ButtonSpinner`](#buttonspinner)
- [Examples](#examples)
  - [Padding None](#padding-none)
  - [Full width button](#full-width-button)

## Playground

```tsx
// Example usage
<Button {...args} icon={icon} />
```

## Usage

```tsx
// Example usage
import { Button } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const handlePress = () => {
    console.log('Button pressed');
  };
  return (
    <Button onPress={handlePress} colorScheme="affirmative">
      Button
    </Button>
  );
};
```

## Props

| Property       | Type                                                             | Description                                                                                         | Default     |
| -------------- | ---------------------------------------------------------------- | --------------------------------------------------------------------------------------------------- | ----------- |
| `onPress`      | `() => void`                                                     | Callback function to be called when the button is pressed.                                          | -           |
| `variant`      | `'solid' \| 'outline' \| 'ghost'`                                | The variant of the button.                                                                          | 'solid'     |
| `size`         | `'sm' \| 'md'`                                                   | The size of the button.                                                                             | 'medium'    |
| `colorScheme`  | `'highlight' \| 'affirmative' \| 'destructive' \| 'functional' ` | The colour scheme of the button.                                                                    | 'highlight' |
| `icon`         | `ReactNode`                                                      | The icon to be displayed in the button. _Note: Can't use with advanced usage._                      | -           |
| `iconPosition` | `'left' \| 'right'`                                              | The position of the icon in the button. _Note: Can't use with advanced usage._                      | 'left'      |
| `inverted`     | `boolean`                                                        | Changes the button to an inverted state. (To only be used on `midnight` or `purple` backgrounds).   | `false`     |
| `loading`      | `boolean`                                                        | Shows a loading spinner in the button. _Note: Can't use with advanced usage._                       | `false`     |
| `disabled`     | `boolean`                                                        | Disables the button.                                                                                | `false`     |
| `paddingNone`  | `boolean`                                                        | Removes the horizontal padding from the button (only applies to `sm` size `ghost` variant buttons). | `false`     |
| `pressed`      | `boolean`                                                        | Changes the button to a pressed state.                                                              | `false`     |

## Variants

```tsx
// Example usage
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
              <DetailText size="lg" inverted={inverted}>
                {scheme} - {variant}
              </DetailText>
            </Box>
            <Flex direction="column" spacing="lg">
              <VariantTitle title="Default" invert={inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <Button
                  text={text}
                  variant={variant}
                  colorScheme={scheme}
                  size={size}
                  inverted={inverted}
                />
              </VariantTitle>
              <VariantTitle title="Pressed" invert={inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <Button
                  text={text}
                  pressed
                  variant={variant}
                  colorScheme={scheme}
                  size={size}
                  inverted={inverted}
                />
              </VariantTitle>
              <VariantTitle title="Disabled" invert={inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <Button
                  text={text}
                  disabled
                  variant={variant}
                  colorScheme={scheme}
                  size={size}
                  inverted={inverted}
                />
              </VariantTitle>
              <VariantTitle title="Icon Left" invert={inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <Button
                  text={text}
                  icon={AddSmallIcon}
                  variant={variant}
                  colorScheme={scheme}
                  size={size}
                  inverted={inverted}
                />
              </VariantTitle>
              <VariantTitle title="Icon Left" invert={inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <Button
                  text={text}
                  icon={ChevronRightSmallIcon}
                  iconPosition="right"
                  variant={variant}
                  colorScheme={scheme}
                  size={size}
                  inverted={inverted}
                />
              </VariantTitle>
              <VariantTitle title="Loading" invert={inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <Button
                  text={text}
                  loading
                  variant={variant}
                  colorScheme={scheme}
                  disabled
                  size={size}
                  inverted={inverted}
                />
              </VariantTitle>
            </Flex>
          </Box>
        ))}
    </Flex>
  ))}
</Flex>
```

## Advanced Usage

For more advanced usage, you can use the `ButtonText`, `ButtonIcon` and `ButtonSpinner` components to customise the button.

```tsx
// Example usage
import {
  Button,
  ButtonIcon,
  ButtonText,
  ButtonSpinner,
} from '@utilitywarehouse/hearth-react-native';
import { AddSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = ({ doSomething }) => {
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setLoading(true);
    doSomething();
  };
  return (
    <Button colorScheme="highlight" disabled={loading}>
      {loading ? <ButtonSpinner /> : <ButtonIcon as={AddSmallIcon} />}
      <ButtonText onPress={handleClick}>Button</ButtonText>
    </Button>
  );
};
```

## Components

The `Button` component is composed of the following components under the hood and can be used to customise the button further:

- [ButtonGroup](#buttongroup)
- [ButtonText](#buttontext) (Advanced usage only)
- [ButtonIcon](#buttonicon) (Advanced usage only)
- [ButtonSpinner](#buttonspinner) (Advanced usage only)

### `ButtonGroup`

The `ButtonGroup` component is used to group multiple buttons together.

```tsx
// Example usage
import { ButtonGroup, Button } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <ButtonGroup flexDirection="column">
      <Button colorScheme="highlight">Button 1</Button>
      <Button colorScheme="functional" variant="outline">
        Button 2
      </Button>
      <Button colorScheme="destructive" variant="ghost">
        Button 3
      </Button>
    </ButtonGroup>
  );
};
```

#### Props

| Property        | Type                                                     | Description                                                    | Default |
| --------------- | -------------------------------------------------------- | -------------------------------------------------------------- | ------- |
| `flexDirection` | `'row' \| 'column' \| 'row-reverse' \| 'column-reverse'` | Set the direction of Button group to vertical or horizontal    | `'row'` |
| `disabled`      | `boolean`                                                | When true, this will disable all the buttons in a ButtonGroup. | `false` |
| `loading`       | `boolean`                                                | When true, this will show a loading spinner in all buttons.    | `false` |
| `attached`      | `boolean`                                                | When attached, all buttons will be attached to each other.     | `false` |
| `reversed`      | `boolean`                                                | To reverse the order of components.                            | `false` |
| `spacing`       | `string`                                                 | It sets the space between different buttons.                   | `'md'`  |

### `ButtonIcon`

The `ButtonIcon` component is used to add an icon to the button.

**Note:** The `ButtonIcon` component should be used only when utilising [advanced usage](#advanced-usage) with the `Button` component.
We recommend using the `icon` prop on the `Button` component for simpler usage.

```tsx
// Example usage
import { Button, ButtonIcon, ButtonText } from '@utilitywarehouse/hearth-react-native';
import { AddSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  return (
    <Button colorScheme="highlight">
      <ButtonIcon as={AddSmallIcon} />
      <ButtonText>Button</ButtonText>
    </Button>
  );
};
```

### `ButtonText`

The `ButtonText` component is used to add text to the button.

**Note:** The `ButtonText` component should be used only when utilising [advanced usage](#advanced-usage) with the `Button` component.
We recommend using the children prop on the `Button` component for simpler usage.

```tsx
// Example usage
import { Button, ButtonText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <Button colorScheme="highlight">
      <ButtonText>Button</ButtonText>
    </Button>
  );
};
```

### `ButtonSpinner`

The `ButtonSpinner` component is used to add a spinner to the button and show loading state.

> This component is used for buttons that trigger long-running actions, like form submissions or data loading.
> The Button's appearance resembles a disabled state, as user interaction is prevented during the loading process.

**Note:** The `ButtonSpinner` component should be used only when utilising [advanced usage](#advanced-usage) with the `Button` component and
should inlude the `disabled` prop. We recommend using the `loading` prop on the `Button` component for simpler usage.

```tsx
// Example usage
import { Button, ButtonSpinner, ButtonText } from '@utilitywarehouse/hearth-react-native';

const MyComponent = ({ loading }) => {
  return (
    <Button colorScheme="highlight" disabled>
      {loading ? <ButtonSpinner /> : null}
      <ButtonText>Button</ButtonText>
    </Button>
  );
};
```

### Padding None

Similar to the `UnstyledIconButton`, the `paddingNone` prop can be used to remove the horizontal padding from the `sm` size `ghost` variant button.
This is useful when you want to create a button that looks like a link or a text button without any padding around it.

```tsx
// Example usage
import { Button } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <Button variant="ghost" colorScheme="functional" size="sm" paddingNone>
      No Padding
    </Button>
  );
};
```

### Full width button

Use layout components, like `Box` or `Flex`, to define your UI layouts, which can also be responsive.

```tsx
// Example usage
<Flex align="stretch">
  <Button>Full width button</Button>
</Flex>

// Card example
<Card>
  <DetailText size="xl">Button inside a Card component</DetailText>
  <Box width="100%" paddingTop="md">
    <Button>Refetch</Button>
  </Box>
</Card>
```
