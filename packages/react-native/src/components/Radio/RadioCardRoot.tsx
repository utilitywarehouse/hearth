import { StyleSheet } from 'react-native-unistyles';
import React, { FC, PropsWithChildren } from 'react';
import { useRadioContext } from './Radio.context';
import { View } from 'react-native';

const RadioCardRoot: FC<PropsWithChildren> = ({ children }) => {
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
    padding: theme.components.card.mobile.padding,
    borderWidth: theme.components.card.subtle.borderWidth,
    borderColor: theme.components.card.subtle.borderColor,
    borderRadius: theme.components.card.borderRadius,
    backgroundColor: theme.components.card.white.backgroundColor,
    variants: {
      checked: {
        true: {
          borderWidth: theme.components.card.borderWidthSelected,
          borderColor: theme.components.card.borderColorSelected,
          margin: -theme.components.card.borderWidthSelected / 2,
        },
      },
    },
  },
}));

RadioCardRoot.displayName = 'RadioCardRoot';
export default RadioCardRoot;
