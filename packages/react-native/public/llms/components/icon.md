# Icons

Icons are often used to enhance the usability and accessibility of digital products by providing users with clear and intuitive visual cues. It serves as an intuitive and easily recognizable way to communicate with users.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [All Icons](#all-icons)

## Playground

```tsx
<Icon as={as} color={color} />
```

## Usage

You can either use the React Native components directy from our `@utilitywarehouse/hearth-react-native-icons` package or use the `Icon`
component from our `@utilitywarehouse/hearth-react-native` package to render the icons with utility props such as `color`.

We recommend that you use the `Icon` component to ensure that the icons are styled correctly and consistently across your application.
The `Icon` component also provides additional functionality such as handling different color modes and sizes as well as automatically applying
light and dark mode colors from the theme.

```jsx
import { Flex, Icon, color } from '@utilitywarehouse/hearth-react-native';
import {
  ElectricityMediumIcon,
  MobileMediumIcon,
  BroadbandMediumIcon,
  InsuranceMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  const { color } = useTheme();
  return (
    <Flex spacing="lg" direction="row" alignItems="center">
      <Icon as={ElectricityMediumIcon} color={color.energyBlue['700']} />
      <Icon as={MobileMediumIcon} color={color.mobileRose['700']} />
      <Icon as={BroadbandMediumIcon} color={color.broadbandGreen['700']} />
      <Icon as={InsuranceMediumIcon} color={color.insuranceOrange['700']} />
    </Flex>
  );
};
```

Or you can use the icons directly from the `@utilitywarehouse/hearth-react-native-icons` package. Make sure you handle the color prop correctly, including light and dark modes.

```jsx
import { Flex, Icon, color } from '@utilitywarehouse/hearth-react-native';
import {
  ElectricityMediumIcon,
  MobileMediumIcon,
  BroadbandMediumIcon,
  InsuranceMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  const { color } = useTheme();
  return (
    <Flex spacing="lg" direction="row" alignItems="center">
      <ElectricityMediumIcon color={color.energyBlue['700']} />
      <MobileMediumIcon color={color.mobileRose['700']} />
      <BroadbandMediumIcon color={color.broadbandGreen['700']} />
      <InsuranceMediumIcon color={color.insuranceOrange['700']} />
    </Flex>
  );
};
```

## Props

| Name    | Type                  | Description                   | Default |
| ------- | --------------------- | ----------------------------- | ------- |
| `as`    | `React.ComponentType` | The icon component to render. | -       |
| `color` | `string`              | The color of the icon.        | -       |

## All Icons

To view all the icons available in the library, please refer to the [Hearth React Native Icons](https://hearth.prod.uw.systems/?path=/docs/icons_search-icons--docs) documentation.
