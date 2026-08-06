import type { ToggleButtonProps } from './ToggleButton.props';
import ToggleButtonTextComponent from './ToggleButtonText';
import ToggleButtonIconComponent from './ToggleButtonIcon';
import ToggleButtonRoot from './ToggleButtonRoot';

export const ToggleButtonText = ToggleButtonTextComponent;
export const ToggleButtonIcon = ToggleButtonIconComponent;

ToggleButtonText.displayName = 'ToggleButtonText';
ToggleButtonIcon.displayName = 'ToggleButtonIcon';

const ToggleButton = ({ text, toggled = false, onToggle, ...props }: ToggleButtonProps) => {
  return (
    <ToggleButtonRoot toggled={toggled} onToggle={onToggle} {...props}>
      {toggled && <ToggleButtonIcon toggled={toggled} />}
      <ToggleButtonText toggled={toggled}>{text}</ToggleButtonText>
    </ToggleButtonRoot>
  );
};

ToggleButton.displayName = 'ToggleButton';

export default ToggleButton;
