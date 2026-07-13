# Adding Shadows

You can add shadows to your components in Hearth React Native using the Unistyles styling system. Shadows help create depth and visual hierarchy in your UI.

- [Using Predefined Shadows](#using-predefined-shadows)
- [Components with Shadow Props](#components-with-shadow-props)

## Using Predefined Shadows

Hearth provides a set of predefined shadow styles that you can easily apply to your components. These shadows are defined in the theme and can be accessed via the `theme.helpers.shadow` object.

```tsx
// Example usage
import { View } from 'react-native';
import { StyleSheet, Input } from '@utilitywarehouse/hearth-react-native';
import { SearchMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

const styles = StyleSheet.create(theme => ({
  input: {
    boxShadow: theme.helpers.shadow.functional, // Apply a predefined shadow
  },
}));

const MyComponent = () => (
  <View>
    <Input placeholder="Input with shadow" style={styles.input} leadingIcon={SearchMediumIcon} />
  </View>
);
```

## Components with Shadow Props

Some Hearth components, like `Card`, allow you to specify shadow colors directly via props. You can use the `shadowColor` prop to set the shadow color based on the theme.

```tsx
// Example usage
import { Card } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => <Card shadowColor="brand">{/* Card content */}</Card>;
```
