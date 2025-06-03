import React, { ElementRef } from 'react';
import { createRadio } from '@gluestack-ui/radio';
import StyledToggleButtonCard from './ToggleButtonCardRoot';
import StyledToggleButtonCardGroup from './ToggleButtonCardGroup';
import { forwardRef } from 'react';
import ToggleButtonCardProps from './ToggleButtonCard.props';
import { Pressable, View } from 'react-native';
import { useStyleProps } from '../../hooks';

const ToggleButtonCardComponent = createRadio({
  Root: StyledToggleButtonCard,
  Group: StyledToggleButtonCardGroup,
  Indicator: View,
  Icon: View,
  Label: View,
}) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof StyledToggleButtonCard> & React.RefAttributes<View>
> & {
  Group: typeof StyledToggleButtonCardGroup;
};

const ToggleButtonCardGroup = ToggleButtonCardComponent.Group;

ToggleButtonCardGroup.displayName = 'ToggleButtonCardGroup';

const ToggleButtonCard = forwardRef<ElementRef<typeof Pressable>, ToggleButtonCardProps>(
  ({ children, contentStyle, ...props }, ref) => {
    const { computedStyles } = useStyleProps(props);
    return (
      <ToggleButtonCardComponent ref={ref} {...props}>
        {!!children && <View style={[computedStyles, contentStyle]}>{children}</View>}
      </ToggleButtonCardComponent>
    );
  }
);

ToggleButtonCard.displayName = 'ToggleButtonCard';

export { ToggleButtonCard, ToggleButtonCardGroup };

export default ToggleButtonCard;
