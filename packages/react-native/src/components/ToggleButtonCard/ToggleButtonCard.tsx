import ToggleButtonCardProps from './ToggleButtonCard.props';
import { View } from 'react-native';
import { useStyleProps } from '../../hooks';
import ToggleButtonCardRootComponent from './ToggleButtonCardRoot';
import { useToggleButtonCardGroupContext } from './ToggleButtonCardGroup.context';

const ToggleButtonCard = ({
  children,
  contentStyle,
  value,
  onChange,
  disabled,
  ...props
}: ToggleButtonCardProps) => {
  const { computedStyles } = useStyleProps(props);
  const { selectedValue, select } = useToggleButtonCardGroupContext();
  const checked = selectedValue === value;

  const handleToggle = () => {
    if (disabled) return;
    select?.(value);
    onChange?.(true);
  };

  return (
    <ToggleButtonCardRootComponent
      {...props}
      value={value}
      disabled={disabled}
      checked={checked}
      onToggle={handleToggle}
    >
      {!!children && <View style={[computedStyles, contentStyle]}>{children}</View>}
    </ToggleButtonCardRootComponent>
  );
};
ToggleButtonCard.displayName = 'ToggleButtonCard';

export { ToggleButtonCard };

export default ToggleButtonCard;
