import React, { forwardRef } from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useRadioContext } from './Radio.context';

const RadioIndicator = forwardRef<View, ViewProps>((props, ref) => {
  const { checked, active } = useRadioContext();
  styles.useVariants({
    checked,
    active,
  });
  return (
    <View ref={ref} {...props} style={[styles.container, props.style]}>
      {props.children}
    </View>
  );
});

const styles = StyleSheet.create(theme => ({
  outline: {
    alignSelf: 'flex-start',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.components.radio.unchecked.backgroundColor,
    borderColor: theme.components.radio.unchecked.borderColor,
    borderWidth: theme.components.radio.borderWidth,
    borderRadius: theme.components.radio.borderRadius,
    width: 24,
    height: 24,
    outlineWidth: theme.components.radio.outlineWidth,
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    _web: {
      _hover: {
        outlineColor: theme.components.radio.outlineColorHover,
      },
      '_focus-within': {
        ...theme.helpers.focusVisible,
      },
      _active: {
        outlineColor: theme.components.radio.outlineColorActive,
      },
    },
    variants: {
      checked: {
        true: {
          borderColor: theme.components.radio.checked.color,
          backgroundColor: 'transparent',
        },
      },
      active: {
        true: {
          outlineColor: theme.components.radio.outlineColorActive,
        },
      },
    },
  },
}));

RadioIndicator.displayName = 'RadioIndicator';

export default RadioIndicator;
