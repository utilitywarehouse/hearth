import { createRadio } from '@gluestack-ui/radio';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useStyleProps } from '../../hooks';
import RadioCardProps from './RadioCard.props';
import StyledRadioCardGroup from './RadioCardGroup';
import RadioCardGroupProps from './RadioCardGroup.props';
import StyledRadioCardIcon from './RadioCardIcon';
import StyledRadioCardIndicator from './RadioCardIndicator';
import StyledRadioCardLabel from './RadioCardLabel';
import StyledRadioCard from './RadioCardRoot';

const RadioCardComponent = createRadio({
  Root: StyledRadioCard,
  Group: StyledRadioCardGroup,
  Indicator: StyledRadioCardIndicator,
  Icon: StyledRadioCardIcon,
  Label: StyledRadioCardLabel,
});

const RadioCardGroupComponent = RadioCardComponent.Group;
const RadioCardIndicator = RadioCardComponent.Indicator;
const RadioCardIcon = RadioCardComponent.Icon;
const RadioCardLabel = RadioCardComponent.Label;

const RadioCardGroup = ({ onChange, onValueChange, disabled, ...props }: RadioCardGroupProps) => (
  <RadioCardGroupComponent
    {...(props as any)}
    disabled={disabled}
    isDisabled={disabled}
    onChange={(value: string) => {
      onChange?.(value);
      onValueChange?.(value);
    }}
  />
);

RadioCardGroup.displayName = 'RadioCardGroup';
RadioCardIndicator.displayName = 'RadioCardIndicator';
RadioCardIcon.displayName = 'RadioCardIcon';
RadioCardLabel.displayName = 'RadioCardLabel';

const RadioCard = ({
  children,
  label,
  labelVariant = 'body',
  contentStyle,
  ...props
}: RadioCardProps) => {
  const { computedStyles } = useStyleProps(props);
  return (
    <RadioCardComponent {...props}>
      <View style={styles.radioContainer}>
        <RadioCardIndicator>
          <RadioCardIcon />
        </RadioCardIndicator>
        {!!label && <RadioCardLabel variant={labelVariant}>{label}</RadioCardLabel>}
      </View>
      {!!children && <View style={[computedStyles, contentStyle]}>{children}</View>}
    </RadioCardComponent>
  );
};

const styles = StyleSheet.create(theme => ({
  radioContainer: {
    flexDirection: 'row',
    gap: theme.components.radio.gap,
  },
}));

RadioCard.displayName = 'RadioCard';

export { RadioCard, RadioCardGroup, RadioCardIcon, RadioCardIndicator, RadioCardLabel };

export default RadioCard;
