import { createRadio } from '@gluestack-ui/core/radio/creator';
import { View } from 'react-native';
import { useStyleProps } from '../../hooks';
import ToggleButtonCardProps from './ToggleButtonCard.props';
import StyledToggleButtonCardGroup from './ToggleButtonCardGroup';
import StyledToggleButtonCard from './ToggleButtonCardRoot';

const ToggleButtonCardComponent = createRadio({
  Root: StyledToggleButtonCard,
  Group: StyledToggleButtonCardGroup,
  Indicator: () => null,
  Icon: () => null,
  Label: () => null,
});

const ToggleButtonCardGroup = ToggleButtonCardComponent.Group;

ToggleButtonCardGroup.displayName = 'ToggleButtonCardGroup';

const ToggleButtonCard = ({ children, contentStyle, ...props }: ToggleButtonCardProps) => {
  const { computedStyles } = useStyleProps(props);
  return (
    <ToggleButtonCardComponent {...props}>
      {!!children && <View style={[computedStyles, contentStyle]}>{children}</View>}
    </ToggleButtonCardComponent>
  );
};
ToggleButtonCard.displayName = 'ToggleButtonCard';

export { ToggleButtonCard, ToggleButtonCardGroup };

export default ToggleButtonCard;
