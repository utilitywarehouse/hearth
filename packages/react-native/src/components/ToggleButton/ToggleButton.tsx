import { ToggleButtonContext } from './ToggleButton.context';
import type { ToggleButtonProps } from './ToggleButton.props';
import ToggleButtonTextComponent from './ToggleButtonText';
import ToggleButtonIconComponent from './ToggleButtonIcon';
import ToggleButtonRoot from './ToggleButtonRoot';
import { useToggleGroupContext } from '../ToggleGroup/ToggleGroup.context';

/**
 * The label of a `ToggleButton`, for composing a custom button. Its colour follows the
 * toggled state of the parent `ToggleButton`.
 */
export const ToggleButtonText = ToggleButtonTextComponent;
/**
 * The icon of a `ToggleButton`, for composing a custom button. Defaults to a tick, and its
 * colour follows the toggled state of the parent `ToggleButton`.
 */
export const ToggleButtonIcon = ToggleButtonIconComponent;

ToggleButtonText.displayName = 'ToggleButtonText';
ToggleButtonIcon.displayName = 'ToggleButtonIcon';

/**
 * A pressable button that switches between an on and off state, such as for a single
 * standalone setting. Inside a `ToggleGroup`, give it a `value` and the group manages its
 * toggled state.
 */
const ToggleButton = ({
  text,
  toggled: toggledProp = false,
  onToggle,
  value,
  children,
  ...props
}: ToggleButtonProps) => {
  const group = useToggleGroupContext();
  const inGroup = group !== null && value !== undefined;
  const toggled = inGroup ? group.isSelected(value) : toggledProp;

  const handleToggle = (nextToggled: boolean) => {
    if (inGroup) group.toggle(value);
    onToggle?.(nextToggled);
  };

  return (
    <ToggleButtonContext.Provider value={{ toggled }}>
      <ToggleButtonRoot
        toggled={toggled}
        onToggle={handleToggle}
        groupType={group?.type}
        {...props}
      >
        {children ?? (
          <>
            {toggled && <ToggleButtonIcon />}
            <ToggleButtonText>{text}</ToggleButtonText>
          </>
        )}
      </ToggleButtonRoot>
    </ToggleButtonContext.Provider>
  );
};

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
