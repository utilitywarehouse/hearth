# Switch

The Switch component is used to indicate switching between two opposing options. Switches allow users
to turn an individual option on or off. They are usually used to activate or deactivate a specific setting.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Variants](#variants)
- [Examples](#examples)
  - [Switch with Label](#switch-with-label)
  - [List with Switch](#list-with-switch)

## Playground

```tsx
<Switch {...args} value={toggled} onValueChange={handleToggle} />
```

## Usage

```tsx
import { Switch } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [settings, setSettings] = useState(false);

  const handleChange = value => setSettings(value);

  return <Switch value={settings} onValueChange={handleChange} />;
};
```

## Props

| Property      | Type                       | Default    | Description                            |
| ------------- | -------------------------- | ---------- | -------------------------------------- |
| value         | `boolean`                  | `false`    | The value of the switch                |
| onValueChange | `(value: boolean) => void` | -          | Callback when the switch value changes |
| disabled      | `boolean`                  | `false`    | If true, the switch will be disabled   |
| size          | `'small' \| 'medium'`      | `'medium'` | The size of the switch                 |

## Variants

```tsx
<Flex direction="column" spacing="sm">
  <VariantTitle title="Off - medium">
    <Switch value={false} />
  </VariantTitle>
  <VariantTitle title="On - medium">
    <Switch value={true} />
  </VariantTitle>
  <VariantTitle title="Off - medium - Disabled">
    <Switch value={false} disabled />
  </VariantTitle>
  <VariantTitle title="On - medium - Disabled">
    <Switch value={true} disabled />
  </VariantTitle>
  <VariantTitle title="Off - small">
    <Switch value={false} size="small" />
  </VariantTitle>
  <VariantTitle title="On - small">
    <Switch value={true} size="small" />
  </VariantTitle>
  <VariantTitle title="Off - small - Disabled">
    <Switch value={false} size="small" disabled />
  </VariantTitle>
  <VariantTitle title="On - small - Disabled">
    <Switch value={true} size="small" disabled />
  </VariantTitle>
</Flex>
```

### Switch with Label

When the Switch is not placed in a List Item, you should use the `Label` component next to it. See
the `FormField` documentation for more information.

```tsx
import {
  Switch,
  FormField,
  FormFieldLabel,
  FormFieldLabelText,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const [notifications, setNotifications] = useState(false);

  const handleChange = value => setNotifications(value);

  return (
    <FormField>
      <Flex spacing="sm" direction="row" align="center">
        <Switch value={notifications} onValueChange={handleChange} />
        <FormFieldLabel>
          <FormFieldLabelText>Enable notifications</FormFieldLabelText>
        </FormFieldLabel>
      </Flex>
    </FormField>
  );
};
```

### List with Switch

You can also use the list to display a list of switches. You can achieve this by using the `Switch`
component as the `trailingContent` of the `ListItem`. See the `List` documentation
for more information.

```tsx
import React, { useState } from 'react';
import { Card, List, ListItem, ListItemIcon, Switch } from '@utilitywarehouse/hearth-react-native';
import {
  BellMediumIcon,
  LockMediumIcon,
  LocationMediumIcon,
  EyeMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';

const SwitchList = () => {
  const [notifications, setNotifications] = useState(false);
  const [secureId, setSecureId] = useState(false);
  const [location, setLocation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <List container="subtleWhite">
      <ListItem
        text="Notifications"
        helperText="Allow notifications"
        leadingContent={<ListItemIcon as={BellMediumIcon} />}
        trailingContent={
          <Switch value={notifications} onValueChange={setNotifications} size="small" />
        }
        onPress={() => setNotifications(!notifications)}
      />
      <ListItem
        text="Secure ID"
        helperText="Use secure ID"
        leadingContent={<ListItemIcon as={LockMediumIcon} />}
        trailingContent={<Switch value={secureId} onValueChange={setSecureId} size="small" />}
        onPress={() => setSecureId(!secureId)}
      />
      <ListItem
        text="Location"
        helperText="Allow location"
        leadingContent={<ListItemIcon as={LocationMediumIcon} />}
        trailingContent={<Switch value={location} onValueChange={setLocation} size="small" />}
        onPress={() => setLocation(!location)}
      />
      <ListItem
        text="Dark mode"
        helperText="Enable dark mode"
        leadingContent={<ListItemIcon as={EyeMediumIcon} />}
        trailingContent={<Switch value={darkMode} onValueChange={setDarkMode} size="small" />}
        onPress={() => setDarkMode(!darkMode)}
      />
    </List>
  );
};

export default SwitchList;
```
