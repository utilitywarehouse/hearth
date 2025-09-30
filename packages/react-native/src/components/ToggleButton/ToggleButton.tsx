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

const ToggleButton = ({ text, toggled = false, onToggle, ...props }: ToggleButtonProps) => {
  return (
    <ToggleButtonComponent toggled={toggled} onToggle={onToggle} {...props}>
      {toggled && <ToggleButtonIcon toggled={toggled} />}
      <ToggleButtonText toggled={toggled}>{text}</ToggleButtonText>
    </ToggleButtonComponent>
  );
};

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
