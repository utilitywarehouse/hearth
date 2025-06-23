import {
  BellMediumIcon,
  EyeMediumIcon,
  LocationMediumIcon,
  LockMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useState } from 'react';
import { List, ListItem, ListItemIcon, Switch } from '../../src';

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
        divider
        leadingContent={<ListItemIcon as={BellMediumIcon} />}
        trailingContent={
          <Switch value={notifications} onValueChange={setNotifications} size="small" />
        }
        onPress={() => setNotifications(!notifications)}
      />
      <ListItem
        text="Secure ID"
        helperText="Use secure ID"
        divider
        leadingContent={<ListItemIcon as={LockMediumIcon} />}
        trailingContent={<Switch value={secureId} onValueChange={setSecureId} size="small" />}
        onPress={() => setSecureId(!secureId)}
      />
      <ListItem
        text="Location"
        helperText="Allow location"
        divider
        leadingContent={<ListItemIcon as={LocationMediumIcon} />}
        trailingContent={<Switch value={location} onValueChange={setLocation} size="small" />}
        onPress={() => setLocation(!location)}
      />
      <ListItem
        text="Dark mode"
        helperText="Enable dark mode"
        divider
        leadingContent={<ListItemIcon as={EyeMediumIcon} />}
        trailingContent={<Switch value={darkMode} onValueChange={setDarkMode} size="small" />}
        onPress={() => setDarkMode(!darkMode)}
      />
    </List>
  );
};

export default SwitchList;
