# ToggleButton

A pressable button that switches between an on and off state, such as for a single standalone setting.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Advanced Usage](#advanced-usage)

## Playground

```tsx
// Example usage
<ToggleButton {...args} />
```

## Usage

```tsx
// Example usage
import { useState } from 'react';
import { ToggleButton } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [toggled, setToggled] = useState(false);

  return <ToggleButton text="Press me" toggled={toggled} onToggle={setToggled} />;
};
```

## Props

`ToggleButton` also accepts all React Native `Pressable` props.

| Property   | Type                         | Description                                                                                                 | Default |
| ---------- | ---------------------------- | ----------------------------------------------------------------------------------------------------------- | ------- |
| `text`     | `string`                     | The text label of the button.                                                                               |         |
| `toggled`  | `boolean`                    | Whether the button is in the toggled (pressed/selected) state.                                              | `false` |
| `onToggle` | `(toggled: boolean) => void` | Called with the new toggled state whenever the button is pressed.                                           |         |
| `children` | `ReactNode`                  | Custom content, typically `ToggleButtonIcon` and `ToggleButtonText`. Replaces the built-in icon and `text`. |         |

## Advanced Usage

Pass `ToggleButtonIcon` and `ToggleButtonText` as `children` to use your own icon and label. When `children` is set, the built-in tick icon and `text` are not rendered. `ToggleButtonIcon` and `ToggleButtonText` read the `toggled` state from the parent `ToggleButton`, so you don't need to pass it to each part.

```tsx
// Example usage
<ToggleButton toggled={toggled} onToggle={setToggled}>
  <ToggleButtonIcon as={MobileSmallIcon} />
  <ToggleButtonText>{toggled ? 'Mobile on' : 'Mobile off'}</ToggleButtonText>
</ToggleButton>
```

```tsx
// Example usage
import { useState } from 'react';
import {
  ToggleButton,
  ToggleButtonIcon,
  ToggleButtonText,
} from '@utilitywarehouse/hearth-react-native';
import { MobileSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  const [toggled, setToggled] = useState(false);

  return (
    <ToggleButton toggled={toggled} onToggle={setToggled}>
      <ToggleButtonIcon as={MobileSmallIcon} />
      <ToggleButtonText>Mobile</ToggleButtonText>
    </ToggleButton>
  );
};
```

### ToggleButtonIcon Props

`ToggleButtonIcon` accepts all `Icon` props, such as `as`, `size` and `color`. It must be used inside a `ToggleButton`.

| Property  | Type            | Description                                                                     | Default         |
| --------- | --------------- | ------------------------------------------------------------------------------- | --------------- |
| `as`      | `ComponentType` | The icon component to render.                                                   | `TickSmallIcon` |
| `toggled` | `boolean`       | Overrides the toggled state read from the parent `ToggleButton`. Rarely needed. |                 |

### ToggleButtonText Props

`ToggleButtonText` accepts all React Native `Text` props. It must be used inside a `ToggleButton`.

| Property   | Type        | Description                                                                     | Default |
| ---------- | ----------- | ------------------------------------------------------------------------------- | ------- |
| `children` | `ReactNode` | The text label.                                                                 |         |
| `toggled`  | `boolean`   | Overrides the toggled state read from the parent `ToggleButton`. Rarely needed. |         |
