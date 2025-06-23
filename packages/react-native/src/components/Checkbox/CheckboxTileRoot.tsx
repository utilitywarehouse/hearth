import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useCheckboxContext } from './Checkbox.context';

const CheckboxTileRoot = ({ children }: { children: ViewProps['children'] }) => {
  const { checked } = useCheckboxContext();
  styles.useVariants({
    checked,
  });
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    alignSelf: 'stretch',
    gap: theme.components.checkbox.gap,
    padding: theme.components.checkbox.tile.padding,
    borderWidth: theme.components.checkbox.tile.borderWidth,
    borderColor: theme.components.checkbox.tile.borderColor,
    borderRadius: theme.components.checkbox.tile.borderRadius,
    backgroundColor: theme.components.checkbox.tile.backgroundColor,
    variants: {
      checked: {
        true: {
          borderWidth: theme.components.checkbox.tile.borderWidthSelected,
          borderColor: theme.components.checkbox.tile.borderColorSelected,
          margin: -theme.components.checkbox.tile.borderWidthSelected / 2,
        },
      },
    },
  },
}));

CheckboxTileRoot.displayName = 'CheckboxTileRoot';

export default CheckboxTileRoot;
