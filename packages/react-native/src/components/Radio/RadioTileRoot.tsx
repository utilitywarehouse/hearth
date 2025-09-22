import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useRadioContext } from './Radio.context';

const RadioTileRoot = ({ children }: { children: ViewProps['children'] }) => {
  const { checked } = useRadioContext();
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
    gap: theme.components.radio.gap,
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
    },
  },
}));

RadioTileRoot.displayName = 'RadioTileRoot';
export default RadioTileRoot;
