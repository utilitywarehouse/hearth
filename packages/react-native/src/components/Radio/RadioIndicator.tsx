import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useRadioContext } from './Radio.context';

const RadioIndicator = (props: ViewProps) => {
  const { checked, active, disabled } = useRadioContext();
  styles.useVariants({
    checked,
    active,
    disabled: !!disabled,
  });
  return (
    <View {...props} style={[styles.container, props.style]}>
      {props.children}
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  outline: {
    alignSelf: 'flex-start',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.color.surface.neutral.strong,
    borderColor: theme.color.border.strong,
    borderWidth: theme.components.radio.borderWidth,
    borderRadius: theme.components.radio.borderRadius,
    width: 24,
    height: 24,
    outlineWidth: theme.components.radio.outlineWidth,
    outlineStyle: 'solid',
    outlineColor: 'transparent',
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
      disabled: {
        false: {
          _web: {
            _hover: {
              outlineColor: theme.components.radio.outlineColorHover,
            },
            _active: {
              outlineColor: theme.components.radio.outlineColorActive,
            },
          },
        },
      },
    },
  },
}));

RadioIndicator.displayName = 'RadioIndicator';

export default RadioIndicator;
