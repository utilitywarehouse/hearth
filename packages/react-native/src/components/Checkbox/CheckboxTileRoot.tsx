import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useCheckboxContext } from './Checkbox.context';
import { useCheckboxGroupContext } from './CheckboxGroup.context';

const CheckboxTileRoot = ({ children }: { children: ViewProps['children'] }) => {
  const { direction } = useCheckboxGroupContext();
  const { checked } = useCheckboxContext();
  styles.useVariants({
    checked,
    direction,
  });
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    gap: theme.components.checkbox.tile.gap,
    padding: theme.components.checkbox.tile.padding,
    borderWidth: theme.components.checkbox.tile.borderWidth,
    borderColor: theme.color.border.strong,
    borderRadius: theme.components.checkbox.tile.borderRadius,
    backgroundColor: theme.color.surface.neutral.strong,
    variants: {
      checked: {
        true: {
          borderWidth: theme.components.checkbox.tile.borderWidthSelected,
          borderColor: theme.color.border.strong,
          margin: -theme.components.checkbox.tile.borderWidthSelected / 2,
        },
      },
      direction: {
        row: {},
        column: {
          flex: 1,
        },
        default: {
          flex: 1,
        },
      },
    },
  },
}));

CheckboxTileRoot.displayName = 'CheckboxTileRoot';

export default CheckboxTileRoot;
