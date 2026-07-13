import { createRadio } from '@gluestack-ui/radio';
import StyledToggleButtonCard from './ToggleButtonCardRoot';
import StyledToggleButtonCardGroup from './ToggleButtonCardGroup';
import ToggleButtonCardProps from './ToggleButtonCard.props';
import ToggleButtonCardGroupProps from './ToggleButtonCardGroup.props';
import { View } from 'react-native';
import { useStyleProps } from '../../hooks';

const ToggleButtonCardComponent = createRadio({
  Root: StyledToggleButtonCard,
  Group: StyledToggleButtonCardGroup,
  Indicator: () => null,
  Icon: () => null,
  Label: () => null,
});

const ToggleButtonCardGroupComponent = ToggleButtonCardComponent.Group;

const ToggleButtonCardGroup = ({
  onChange,
  onValueChange,
  ...props
}: ToggleButtonCardGroupProps) => (
  <ToggleButtonCardGroupComponent
    {...(props as any)}
    onChange={(value: string) => {
      onChange?.(value);
      onValueChange?.(value);
    }}
  />
);

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
