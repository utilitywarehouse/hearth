# Link

Links are used to navigate a user to another screen or website, another place on the same page, or to open a link in a new tab.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)

## Playground

```tsx
<Link {...args} icon={icon} />
```

## Usage

```jsx
import { Link } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Link>Welcome to Utility Warehouse</Link>;
```

## Props

| Property       | Type                                         | Description                                     | Default   |
| -------------- | -------------------------------------------- | ----------------------------------------------- | --------- |
| `href`         | `string`                                     | The URL to navigate to.                         | `-`       |
| `onPress`      | `() => void`                                 | Function to be called on press.                 | `-`       |
| `target`       | `'_self' \| '_blank' \| '_parent' \| '_top'` | The target of the link.                         | `'_self'` |
| `inverted`     | `boolean`                                    | Invert the link colours for purple backgrounds. | `false`   |
| `disabled`     | `boolean`                                    | Disable the link.                               | `false`   |
| `icon`         | `ReactNode`                                  | Icon to be displayed next to the link.          | `-`       |
| `iconPosition` | `'left' \| 'right'`                          | Position of the icon.                           | `'left'`  |
| `showIcon`     | `boolean`                                    | Show the icon.                                  | `false`   |
