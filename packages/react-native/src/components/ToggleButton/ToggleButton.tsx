import { ToggleButtonContext } from './ToggleButton.context';
import type { ToggleButtonProps } from './ToggleButton.props';
import ToggleButtonTextComponent from './ToggleButtonText';
import ToggleButtonIconComponent from './ToggleButtonIcon';
import { createButton } from '@gluestack-ui/button';
import ToggleButtonRoot from './ToggleButtonRoot';

const ToggleButtonComponent = createButton({
  Root: ToggleButtonRoot,
  Group: () => null, // No group for ToggleButton
  Icon: ToggleButtonIconComponent,
  Spinner: () => null, // No spinner for ToggleButton
  Text: ToggleButtonTextComponent,
});

export const ToggleButtonText = ToggleButtonComponent.Text;
export const ToggleButtonIcon = ToggleButtonComponent.Icon;

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
      <ToggleButtonComponent toggled={toggled} onToggle={onToggle} {...props}>
        {children ?? (
          <>
            {toggled && <ToggleButtonIcon />}
            <ToggleButtonText>{text}</ToggleButtonText>
          </>
        )}
      </ToggleButtonComponent>
    </ToggleButtonContext.Provider>
  );
};

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
