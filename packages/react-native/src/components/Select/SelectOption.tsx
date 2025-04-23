import React from 'react';
import { Pressable, View } from 'react-native';
import { SelectOptionProps } from './Select.props';
import { useSelectContext } from './Select.context';
import { BodyText } from '../BodyText';
import { StyleSheet } from 'react-native-unistyles';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const SelectOption = ({
  label,
  value,
  leftIcon: LeftIcon,
  rightIcon: RightIcon,
  selected,
  disabled,
  onPress,
}: SelectOptionProps) => {
  const { selectedValue, onValueChange, close } = useSelectContext();
  const isSelected = selected !== undefined ? selected : selectedValue === value;

  styles.useVariants({ disabled });

  const handlePress = () => {
    if (disabled) return;

    console.log('SelectOption pressed', value, onValueChange, close);

    if (onPress) {
      onPress(value);
    } else if (onValueChange) {
      onValueChange(value);
    }

    if (close) {
      close();
    }
  };

  console.log('SelectOption', label, value, isSelected);

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {!!LeftIcon && (
        <View>
          <LeftIcon />
        </View>
      )}

      <View style={styles.labelContainer}>
        <BodyText>{label}</BodyText>
      </View>

      {isSelected && (
        <View>
          <TickSmallIcon style={styles.icon} />
        </View>
      )}
      {!!RightIcon && !isSelected && (
        <View>
          <RightIcon />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.components.select.dropdown.item.gap,
    borderRadius: theme.components.select.dropdown.item.borderRadius,
    padding: theme.components.select.dropdown.item.padding,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
    _web: {
      _hover: {
        backgroundColor: theme.components.select.dropdown.item.backgroundColorHover,
      },
    },
  },
  icon: {
    color: theme.components.select.dropdown.item.foregroundColor,
  },
  pressed: {
    backgroundColor: theme.components.select.dropdown.item.backgroundColorActive,
  },
  labelContainer: {
    flex: 1,
  },
}));

SelectOption.displayName = 'SelectOption';

export default SelectOption;
