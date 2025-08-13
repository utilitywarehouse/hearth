import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Pressable, View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Icon } from '../Icon';
import { useSelectContext } from './Select.context';
import { SelectOptionProps } from './Select.props';

const SelectOption = ({
  label,
  value,
  leadingIcon: LeftIcon,
  trailingIcon: RightIcon,
  selected,
  disabled,
  onPress,
}: SelectOptionProps) => {
  const { selectedValue, onValueChange, close } = useSelectContext();
  const isSelected = selected !== undefined ? selected : selectedValue === value;

  styles.useVariants({ disabled });

  const handlePress = () => {
    if (disabled) return;

    if (onPress) {
      onPress(value);
    } else if (onValueChange) {
      onValueChange(value);
    }

    if (close) {
      close();
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      {!!LeftIcon && (
        <View>
          {(() => {
            const IconAny = Icon as any;
            return <IconAny style={styles.icon as ViewStyle} as={LeftIcon} />;
          })()}
        </View>
      )}

      <View style={styles.labelContainer}>
        <BodyText>{label}</BodyText>
      </View>

      {isSelected && (
        <View>
          <TickSmallIcon style={styles.icon as ViewStyle} />
        </View>
      )}
      {!!RightIcon && !isSelected && (
        <View>
          {(() => {
            const IconAny = Icon as any;
            return <IconAny style={styles.icon as ViewStyle} as={RightIcon} />;
          })()}
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
    paddingVertical: theme.components.select.dropdown.item.padding,
    paddingHorizontal: theme.components.select.dropdown.padding,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
    _web: {
      _hover: {
        backgroundColor: theme.color.interactive.functional.surface.subtle.hover,
      },
    },
  },
  icon: {
    color: theme.color.interactive.functional.foreground.subtle,
  },
  pressed: {
    backgroundColor: theme.color.interactive.functional.surface.subtle.active,
  },
  labelContainer: {
    flex: 1,
  },
}));

SelectOption.displayName = 'SelectOption';

export default SelectOption;
