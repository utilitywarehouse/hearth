# Avatar

Avatars help humanise the product experience by connecting users with the product and to each other.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<Avatar
  size="md"
  name="Jane Doe"
  src={{ uri: 'https://ca.slack-edge.com/T0HR00WDA-U05SHRATW7Q-3ad4ae7c75b8-512' }}
/>
```

### Icon

The icon variant is the default `Avatar` type. It ensures UI remains balanced and visually complete, even with limited data.

```tsx
// Example usage
import { Avatar } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Avatar />;
```

### Initials

The initials variant can be used when a profile image is not available, but you have the user's name.

```tsx
// Example usage
import { Avatar } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Avatar name="Jane Doe" />;
```

### Image

The image variant is available to use in journeys where a user is able to upload their own profile picture.

```tsx
// Example usage
import { Avatar } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Avatar
    name="Jane Doe"
    src={{ uri: 'https://ca.slack-edge.com/T0HR00WDA-U05SHRATW7Q-3ad4ae7c75b8-512' }}
  />
);
```

## Props

| Property                | Type                                                           | Description                                                                        | Default |
| ----------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------- | ------- |
| `src`                   | `ImageSourcePropType`                                          | The image source to display.                                                       |         |
| `name`                  | `string`                                                       | The name associated with the avatar, used for creating initials and accessibility. |         |
| `size`                  | `'sm' \| 'md'`                                                 | Sets the avatar size.                                                              | `md`    |
| `delayMs`               | `number`                                                       | Delay in milliseconds before the image is rendered to avoid flickering.            | `0`     |
| `onLoadingStatusChange` | `(status: 'idle' \| 'loading' \| 'loaded' \| 'error') => void` | Callback fired when the loading status of the image changes.                       |         |

## Accessibility

When passing a user image to the `src` prop, you should also pass their name to the `name` prop so it can be used as an accessible description for the image.

If the image fails to load, the component will automatically fall back to displaying the initials (if `name` is provided) or the default user icon.
