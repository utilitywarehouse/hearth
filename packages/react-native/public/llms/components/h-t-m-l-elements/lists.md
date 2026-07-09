# UL & OL (Lists)

The `UL` (Unordered List) and `OL` (Ordered List) components are used to display lists of items. `UL` displays a bulleted list, and `OL` displays a numbered list. The `LI` (List Item) component is used to define each item within these lists.

- [Usage](#usage)
  - [Unordered List (UL)](#unordered-list-ul)
  - [Ordered List (OL)](#ordered-list-ol)
  - [Customising List Styles](#customising-list-styles)
- [Components](#components)

### Unordered List (UL)

```tsx
import { UL, LI } from '@utilitywarehouse/native-ui';

const MyComponent = () => {
  return (
    <UL>
      <LI>First item</LI>
      <LI>Second item</LI>
      <LI>Third item</LI>
    </UL>
  );
};
```

### Ordered List (OL)

```tsx
import { OL, LI } from '@utilitywarehouse/native-ui';

const MyComponent = () => {
  return (
    <OL>
      <LI>First step</LI>
      <LI>Second step</LI>
      <LI>Third step</LI>
    </OL>
  );
};
```

### Customising List Styles

You can customise the appearance of list markers using props like `listStyleIcon`, `listStyleImage`, `listStyleColour`, and dimensions. These props can be applied to the `UL`/`OL` container to affect all items, or on individual `LI` components to override them.

```tsx
<UnorderedList
  {...args}
  listStyleIcon={TickMediumIcon}
  listStyleColour="feedbackDangerSurfaceDefault"
>
  <ListItem>List item 1 with icon</ListItem>
  <ListItem>List item 2 with icon</ListItem>
  <ListItem>
    List item 3 with icon is a long example to test alignment, lorem ipsum dolor sit amet
  </ListItem>
</UnorderedList>
```

```tsx
import { UL, LI } from '@utilitywarehouse/native-ui';
import { TickMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Image } from 'react-native';

const MyComponent = () => {
  return (
    <UL listStyleColour="feedbackDangerSurfaceDefault">
      <LI>Primary colored bullet</LI>
      <LI listStyleColour="feedbackPositiveSurfaceDefault">Danger colored bullet override</LI>
      <LI listStyleIcon={TickMediumIcon}>Icon bullet</LI>
      <LI
        listStyleImage={<Image source={{ uri: '...' }} />}
        listStyleWidth={20}
        listStyleHeight={20}
      >
        Image bullet
      </LI>
    </UL>
  );
};
```

### `UL`

The `UL` component is a container for unordered list items. It inherits all the properties of React Native's [`View` component](https://reactnative.dev/docs/view).

| Property          | Type                  | Default | Description                                              |
| ----------------- | --------------------- | ------- | -------------------------------------------------------- |
| `gap`             | `SpaceValue`          | `'100'` | The gap between the list items.                          |
| `bulletStyle`     | `ViewStyle`           | -       | Custom style for the bullet points.                      |
| `children`        | `React.ReactNode`     | -       | The `LI` components to be rendered within the list.      |
| `listStyleImage`  | `React.ReactElement`  | -       | Custom element (e.g. Image) to use as the bullet/marker. |
| `listStyleIcon`   | `React.ComponentType` | -       | Custom icon component to use as the bullet/marker.       |
| `listStyleWidth`  | `number`              | `20`    | Width of the custom bullet/marker.                       |
| `listStyleHeight` | `number`              | `20`    | Height of the custom bullet/marker.                      |
| `listStyleColour` | `ColorValue`          | -       | Color of the bullet/marker.                              |

### `OL`

The `OL` component is a container for ordered list items. It inherits all the properties of React Native's [`View` component](https://reactnative.dev/docs/view).

| Property          | Type                  | Default | Description                                              |
| ----------------- | --------------------- | ------- | -------------------------------------------------------- |
| `gap`             | `SpaceValue`          | `'100'` | The gap between the list items.                          |
| `bulletStyle`     | `ViewStyle`           | -       | Custom style for the numbers.                            |
| `children`        | `React.ReactNode`     | -       | The `LI` components to be rendered within the list.      |
| `listStyleImage`  | `React.ReactElement`  | -       | Custom element (e.g. Image) to use as the bullet/marker. |
| `listStyleIcon`   | `React.ComponentType` | -       | Custom icon component to use as the bullet/marker.       |
| `listStyleWidth`  | `number`              | `20`    | Width of the custom bullet/marker.                       |
| `listStyleHeight` | `number`              | `20`    | Height of the custom bullet/marker.                      |
| `listStyleColour` | `ColorValue`          | -       | Color of the number/marker.                              |

### `LI`

The `LI` component represents an item in a list. It wraps its children in a `BodyText` component if the children are a string. It inherits all the properties of React Native's [`View` component](https://reactnative.dev/docs/view).

| Property          | Type                  | Default | Description                                              |
| ----------------- | --------------------- | ------- | -------------------------------------------------------- |
| `children`        | `React.ReactNode`     | -       | The content to be displayed inside the list item.        |
| `listStyleImage`  | `React.ReactElement`  | -       | Custom element (e.g. Image) to use as the bullet/marker. |
| `listStyleIcon`   | `React.ComponentType` | -       | Custom icon component to use as the bullet/marker.       |
| `listStyleWidth`  | `number`              | `20`    | Width of the custom bullet/marker.                       |
| `listStyleHeight` | `number`              | `20`    | Height of the custom bullet/marker.                      |
| `listStyleColour` | `ColorValue`          | -       | Color of the bullet/marker/number.                       |
