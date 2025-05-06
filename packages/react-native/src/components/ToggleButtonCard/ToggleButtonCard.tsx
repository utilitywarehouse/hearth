import React, { ElementRef } from 'react';
import { createRadio } from '@gluestack-ui/radio';
import StyledToggleButtonCard from './ToggleButtonCardRoot';
import StyledToggleButtonCardIndicator from './ToggleButtonCardIndicator';
import StyledToggleButtonCardGroup from './ToggleButtonCardGroup';
import StyledToggleButtonCardIcon from './ToggleButtonCardIcon';
import StyledToggleButtonCardLabel from './ToggleButtonCardLabel';
import { forwardRef } from 'react';
import ToggleButtonCardProps from './ToggleButtonCard.props';
import { Pressable, View } from 'react-native';

const ToggleButtonCardComponent = createRadio({
  Root: StyledToggleButtonCard,
  Group: StyledToggleButtonCardGroup,
  Indicator: StyledToggleButtonCardIndicator,
  Icon: StyledToggleButtonCardIcon,
  Label: StyledToggleButtonCardLabel,
}) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof StyledToggleButtonCard> & React.RefAttributes<View>
> & {
  Group: typeof StyledToggleButtonCardGroup;
  Indicator: typeof StyledToggleButtonCardIndicator;
  Icon: typeof StyledToggleButtonCardIcon;
  Label: typeof StyledToggleButtonCardLabel;
};

const ToggleButtonCardGroup = ToggleButtonCardComponent.Group;
const ToggleButtonCardIndicator = ToggleButtonCardComponent.Indicator;
const ToggleButtonCardIcon = ToggleButtonCardComponent.Icon;
const ToggleButtonCardLabel = ToggleButtonCardComponent.Label;

ToggleButtonCardGroup.displayName = 'ToggleButtonCardGroup';
ToggleButtonCardIndicator.displayName = 'ToggleButtonCardIndicator';
ToggleButtonCardIcon.displayName = 'ToggleButtonCardIcon';
ToggleButtonCardLabel.displayName = 'ToggleButtonCardLabel';

const ToggleButtonCard = forwardRef<ElementRef<typeof Pressable>, ToggleButtonCardProps>(
  ({ children, ...props }, ref) => {
    return (
      <ToggleButtonCardComponent ref={ref} {...props}>
        {!!children && <View>{children}</View>}
      </ToggleButtonCardComponent>
    );
  }
);

ToggleButtonCard.displayName = 'ToggleButtonCard';

export {
  ToggleButtonCard,
  ToggleButtonCardGroup,
  ToggleButtonCardIndicator,
  ToggleButtonCardIcon,
  ToggleButtonCardLabel,
};

export default ToggleButtonCard;
