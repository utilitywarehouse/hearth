import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useStyleProps } from '../../hooks';
import RadioCardProps from './RadioCard.props';
import RadioCardIconComponent from './RadioCardIcon';
import RadioCardIndicatorComponent from './RadioCardIndicator';
import RadioCardLabelComponent from './RadioCardLabel';
import { useRadioCardGroupContext } from './RadioCardGroup.context';
import RadioCardRootComponent from './RadioCardRoot';

const RadioCardIndicator = RadioCardIndicatorComponent;
const RadioCardIcon = RadioCardIconComponent;
const RadioCardLabel = RadioCardLabelComponent;

/**
 * A card-style single-choice selection control, rendered inside a `RadioCardGroup`. Use it when
 * options need more visual weight or supporting content than a plain `Radio`.
 * @summary A card-style single-choice selection control for use inside a RadioCardGroup.
 */
const RadioCard = ({
  children,
  label,
  labelVariant = 'body',
  contentStyle,
  value,
  onChange,
  disabled,
  ...props
}: RadioCardProps) => {
  const { computedStyles } = useStyleProps(props);
  const { disabled: groupDisabled, selectedValue, select } = useRadioCardGroupContext();
  const radioCardDisabled = groupDisabled ?? disabled;
  const checked = selectedValue === value;

  const handlePress = () => {
    if (radioCardDisabled) return;
    select?.(value);
    onChange?.(true);
  };

  return (
    <RadioCardRootComponent
      {...props}
      value={value}
      disabled={radioCardDisabled}
      checked={checked}
      onPress={handlePress}
    >
      <View style={styles.radioContainer}>
        <RadioCardIndicator>{checked && <RadioCardIcon />}</RadioCardIndicator>
        {!!label && <RadioCardLabel variant={labelVariant}>{label}</RadioCardLabel>}
      </View>
      {!!children && <View style={[computedStyles, contentStyle]}>{children}</View>}
    </RadioCardRootComponent>
  );
};

const styles = StyleSheet.create(theme => ({
  radioContainer: {
    flexDirection: 'row',
    gap: theme.components.radio.gap,
  },
}));

RadioCard.displayName = 'RadioCard';

export { RadioCard, RadioCardIcon, RadioCardIndicator, RadioCardLabel };

export default RadioCard;
