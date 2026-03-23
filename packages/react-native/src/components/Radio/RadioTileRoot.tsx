import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useRadioContext } from './Radio.context';
import { useRadioGroupContext } from './RadioGroup.context';

const RadioTileRoot = ({ children }: { children: ViewProps['children'] }) => {
  const { direction } = useRadioGroupContext();
  const { checked } = useRadioContext();
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
    gap: theme.components.radio.tile.gap,
    padding: theme.components.radio.tile.padding,
    borderWidth: theme.components.radio.tile.borderWidth,
    borderColor: theme.color.border.strong,
    borderRadius: theme.components.radio.tile.borderRadius,
    backgroundColor: theme.color.surface.neutral.strong,
    variants: {
      checked: {
        true: {
          borderWidth: theme.components.radio.tile.borderWidthSelected,
          borderColor: theme.color.border.strong,
          margin: -theme.components.radio.tile.borderWidthSelected / 2,
        },
      },
      direction: {
        row: {},
        column: {
          flex: 1,
        },
      },
    },
  },
}));

RadioTileRoot.displayName = 'RadioTileRoot';
export default RadioTileRoot;
