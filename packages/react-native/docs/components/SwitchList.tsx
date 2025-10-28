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
        heading="Notifications"
        helperText="Allow notifications"
        leadingContent={<ListItemIcon as={BellMediumIcon} />}
        trailingContent={
          <Switch value={notifications} onValueChange={setNotifications} size="small" />
        }
        onPress={() => setNotifications(!notifications)}
      />
      <ListItem
        heading="Secure ID"
        helperText="Use secure ID"
        leadingContent={<ListItemIcon as={LockMediumIcon} />}
        trailingContent={<Switch value={secureId} onValueChange={setSecureId} size="small" />}
        onPress={() => setSecureId(!secureId)}
      />
      <ListItem
        heading="Location"
        helperText="Allow location"
        leadingContent={<ListItemIcon as={LocationMediumIcon} />}
        trailingContent={<Switch value={location} onValueChange={setLocation} size="small" />}
        onPress={() => setLocation(!location)}
      />
      <ListItem
        heading="Dark mode"
        helperText="Enable dark mode"
        leadingContent={<ListItemIcon as={EyeMediumIcon} />}
        trailingContent={<Switch value={darkMode} onValueChange={setDarkMode} size="small" />}
        onPress={() => setDarkMode(!darkMode)}
      />
    </List>
  );
};

export default SwitchList;
