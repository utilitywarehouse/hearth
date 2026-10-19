import { ToggleButtonContext } from './ToggleButton.context';
import type { ToggleButtonProps } from './ToggleButton.props';
import ToggleButtonTextComponent from './ToggleButtonText';
import ToggleButtonIconComponent from './ToggleButtonIcon';
import ToggleButtonRoot from './ToggleButtonRoot';

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
 * standalone setting.
 */
const ToggleButton = ({
  text,
  toggled = false,
  onToggle,
  children,
  ...props
}: ToggleButtonProps) => {
  return (
    <ToggleButtonContext.Provider value={{ toggled }}>
      <ToggleButtonRoot toggled={toggled} onToggle={onToggle} {...props}>
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
