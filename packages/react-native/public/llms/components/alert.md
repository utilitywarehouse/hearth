# Alert

The `Alert` component displays a short, important message in a way that attracts the user's attention without interrupting the user's task.
This component should be used to flag information of high importance, whether it be an error, warning, success or information.
The Alert offers different colour schemes, the colour scheme is mapped to an icon.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Variants](#variants)
- [Advanced Usage](#advanced-usage)

## Playground

```tsx
<Alert
  colorScheme="info"
  title="Information"
  text="Unlock the power of knowledge with the following information."
  link="Learn more"
  onPress={() => alert('Alert pressed')}
  onClose={() => alert('Alert closed')}
  onPressIconButton={() => alert('Icon button pressed')}
/>
```

## Usage

```tsx
import { Alert } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <Alert
      colorScheme="info"
      title="Information"
      text="Unlock the power of knowledge with the following information."
    />
  );
};
```

## Props

| Property            | Type                                            | Description                                                       | Default |
| ------------------- | ----------------------------------------------- | ----------------------------------------------------------------- | ------- |
| `colorScheme`       | `'info' \| 'positive' \| 'warning' \| 'danger'` | The colour scheme of the alert. Mapped to an icon.                | 'info'  |
| `title`             | `string`                                        | The title of the alert.                                           |         |
| `text`              | `string`                                        | The text of the alert.                                            |         |
| `link`              | `string`                                        | The text of the link.                                             |         |
| `linkTestID`        | `string`                                        | The testID of the link.                                           |         |
| `iconButtonTestID`  | `string`                                        | The testID of the icon button.                                    |         |
| `onPress`           | `() => void`                                    | A callback function to be called when the alert is tapped.        |         |
| `onPressLink`       | `() => void`                                    | A callback function to be called when the link is tapped.         |         |
| `onPressIconButton` | `() => void`                                    | A callback function to be called when the icon button is tapped.  |         |
| `onClose`           | `() => void`                                    | A callback function to be called when the close button is tapped. |         |

## Variants

The `Alert` component has four colour schemes: info, positive, warning and danger. Each colour scheme is mapped to an icon.

```tsx
<Flex spacing="sm">
  <VariantTitle title="Info - Blue">
    <Alert
      colorScheme="info"
      text="Unlock the power of knowledge with the following information."
    />
  </VariantTitle>
  <VariantTitle title="Success - positive">
    <Alert
      colorScheme="positive"
      text="Boom! You did it! Please take a moment to pat yourself on the back. You've earned it!"
    />
  </VariantTitle>
  <VariantTitle title="Error - Red">
    <Alert
      colorScheme="danger"
      text="Uh-oh! It looks like the matrix has glitched. Our team of tech ninjas are already on the
      case. Please hold tight while we fix the issue"
    />
  </VariantTitle>
  <VariantTitle title="Warning - warning">
    <Alert
      colorScheme="warning"
      text="Warning: Reading the following content may cause spontaneous outbursts of 'aha!' moments"
    />
  </VariantTitle>
</Flex>
```

## Advanced Usage

If you need to use the Alert component in a more advanced way, you can use the parts of the component directly.

```tsx
import {
  Alert,
  AlertIcon,
  AlertText,
  AlertTitle,
  AlertLink,
  AlertLinkText,
  AlertIconButton,
  AlertCloseButton,
  AlertContent,
} from '@utilitywarehouse/hearth-react-native';
import { InfoMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  return (
    <Alert colorScheme="info">
      <AlertIcon as={InfoMediumIcon} />
      <AlertContent>
        <AlertTitle>Information</AlertTitle>
        <AlertText>Unlock the power of knowledge with the following information.</AlertText>
        <AlertLink onPress={() => console.log('Link tapped')}>Learn more</AlertLink>
      </AlertContent>
      {/* Note: AlertIconButton should not be used with the AlertLink component */}
      <AlertIconButton onPress={() => console.log('Icon button tapped')} />
      <AlertCloseButton onClose={() => console.log('Close button tapped')} />
    </Alert>
  );
};
```
