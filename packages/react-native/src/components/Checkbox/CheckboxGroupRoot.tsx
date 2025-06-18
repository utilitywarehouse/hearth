import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import CheckboxGroupProps from './CheckboxGroup.props';

const CheckboxGroup = ({
  children,
  style,
  isCard = false,
  ...props
}: CheckboxGroupProps & { isCard?: boolean }) => {
  styles.useVariants({ type: isCard ? 'tile' : 'checkbox' });
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  );
};

CheckboxGroup.displayName = 'CheckboxGroup';

const styles = StyleSheet.create(theme => ({
  container: {
    variants: {
      type: {
        checkbox: {
          gap: theme.components.checkbox.group.gap,
        },
        tile: {
          gap: theme.components.checkbox.tile.group.gap,
        },
      },
    },
  },
}));

export default CheckboxGroup;
