import React, { ElementRef } from 'react';
import { createRadio } from '@gluestack-ui/radio';
import StyledRadioCard from './RadioCardRoot';
import StyledRadioCardIndicator from './RadioCardIndicator';
import StyledRadioCardGroup from './RadioCardGroup';
import StyledRadioCardIcon from './RadioCardIcon';
import StyledRadioCardLabel from './RadioCardLabel';
import RadioCardProps from './RadioCard.props';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useStyleProps } from '../../hooks';

const RadioCardComponent = createRadio({
  Root: StyledRadioCard,
  Group: StyledRadioCardGroup,
  Indicator: StyledRadioCardIndicator,
  Icon: StyledRadioCardIcon,
  Label: StyledRadioCardLabel,
});

const RadioCardGroup = RadioCardComponent.Group;
const RadioCardIndicator = RadioCardComponent.Indicator;
const RadioCardIcon = RadioCardComponent.Icon;
const RadioCardLabel = RadioCardComponent.Label;

RadioCardGroup.displayName = 'RadioCardGroup';
RadioCardIndicator.displayName = 'RadioCardIndicator';
RadioCardIcon.displayName = 'RadioCardIcon';
RadioCardLabel.displayName = 'RadioCardLabel';

const RadioCard = ({ children, label, contentStyle, ...props }: RadioCardProps) => {
  const { computedStyles } = useStyleProps(props);
  return (
    <RadioCardComponent {...props}>
      <View style={styles.radioContainer}>
        <RadioCardIndicator>
          <RadioCardIcon />
        </RadioCardIndicator>
        {!!label && <RadioCardLabel>{label}</RadioCardLabel>}
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

export { RadioCard, RadioCardGroup, RadioCardIndicator, RadioCardIcon, RadioCardLabel };

export default RadioCard;
