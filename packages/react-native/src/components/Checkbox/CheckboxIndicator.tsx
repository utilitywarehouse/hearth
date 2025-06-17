import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useCheckboxContext } from './Checkbox.context';

const CheckboxIndicator = (props: ViewProps) => {
  const { checked, active } = useCheckboxContext();
  styles.useVariants({
    checked,
    active,
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
    backgroundColor: theme.components.checkbox.unchecked.backgroundColor,
    borderColor: theme.components.checkbox.unchecked.borderColor,
    borderWidth: theme.components.checkbox.borderWidth,
    borderRadius: theme.components.checkbox.borderRadius,
    width: 24,
    height: 24,
    outlineWidth: theme.components.checkbox.outlineWidth,
    outlineStyle: 'solid',
    outlineColor: 'transparent',
    _web: {
      _hover: {
        outlineColor: theme.components.checkbox.outlineColorHover,
      },
      '_focus-within': {
        ...theme.helpers.focusVisible,
      },
      _active: {
        outlineColor: theme.components.checkbox.outlineColorActive,
      },
    },
    variants: {
      checked: {
        true: {
          borderColor: theme.components.checkbox.checked.borderColor,
          backgroundColor: theme.components.checkbox.checked.backgroundColor,
        },
      },
      active: {
        true: {
          outlineColor: theme.components.checkbox.outlineColorActive,
        },
      },
    },
  },
}));

CheckboxIndicator.displayName = 'CheckboxIndicator';

export default CheckboxIndicator;
