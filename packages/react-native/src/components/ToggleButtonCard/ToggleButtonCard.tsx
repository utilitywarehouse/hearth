import ToggleButtonCardProps from './ToggleButtonCard.props';
import { View } from 'react-native';
import { useStyleProps } from '../../hooks';
import ToggleButtonCardRootComponent from './ToggleButtonCardRoot';
import { useToggleButtonCardGroupContext } from './ToggleButtonCardGroup.context';
import { useToggleGroupContext } from '../ToggleGroup/ToggleGroup.context';

/**
 * A selectable card used as an option within a `ToggleGroup` or `ToggleButtonCardGroup`. Use
 * it to let users pick from a set of predefined choices in forms or surveys.
 */
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
  const toggleGroup = useToggleGroupContext();
  // A `ToggleButtonCardGroup` keeps its own single-select behaviour; otherwise join a
  // surrounding `ToggleGroup`, if there is one.
  const inToggleGroup = select === undefined && toggleGroup !== null;
  const checked = inToggleGroup ? toggleGroup.isSelected(value) : selectedValue === value;

  const handleToggle = () => {
    if (disabled) return;
    if (inToggleGroup) {
      toggleGroup.toggle(value);
      onChange?.(!checked);
      return;
    }
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
