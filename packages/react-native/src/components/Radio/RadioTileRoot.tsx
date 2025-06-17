import { StyleSheet } from 'react-native-unistyles';
import { PropsWithChildren } from 'react';
import { useRadioContext } from './Radio.context';
import { View } from 'react-native';

const RadioTileRoot = ({ children }: PropsWithChildren) => {
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
    borderColor: theme.components.radio.tile.borderColor,
    borderRadius: theme.components.radio.tile.borderRadius,
    backgroundColor: theme.components.radio.tile.backgroundColor,
    variants: {
      checked: {
        true: {
          borderWidth: theme.components.radio.tile.borderWidthSelected,
          borderColor: theme.components.radio.tile.borderColorSelected,
          margin: -theme.components.radio.tile.borderWidthSelected / 2,
        },
      },
    },
  },
}));

RadioTileRoot.displayName = 'RadioTileRoot';
export default RadioTileRoot;
