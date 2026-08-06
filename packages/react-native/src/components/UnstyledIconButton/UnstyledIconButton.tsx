import { ViewStyle } from 'react-native';
import { useButtonGroupContext } from '../Button/ButtonGroup.context';
import { UnstyledIconButtonProps } from './UnstyledIconButton.props';
import UnstyledIconButtonIconComponent from './UnstyledIconButtonIcon';
import UnstyledIconButtonRootComponent from './UnstyledIconButtonRoot';
import UnstyledIconButtonSpinerComponent from './UnstyledIconButtonSpinner';

const UnstyledIconButtonSpinner = UnstyledIconButtonSpinerComponent;
const UnstyledIconButtonIcon = UnstyledIconButtonIconComponent;

UnstyledIconButtonSpinner.displayName = 'UnstyledIconButtonSpinner';
UnstyledIconButtonIcon.displayName = 'UnstyledIconButtonIcon';

const UnstyledIconButton = ({
  icon,
  disabled = false,
  pressed,
  size = 'md',
  inverted = false,
  iconStyle,
  ...props
}: UnstyledIconButtonProps) => {
  const { disabled: groupDisabled, loading: groupLoading } = useButtonGroupContext();
  const {
    loading,
    accessibilityRole = 'button',
    accessible = true,
    focusable = true,
    importantForAccessibility = 'yes',
    ...restProps
  } = props;

  const isLoading = loading ?? groupLoading;
  const buttonDisabled = isLoading || (disabled ?? groupDisabled);

  return (
    <UnstyledIconButtonRootComponent
      {...restProps}
      size={size}
      inverted={inverted}
      disabled={buttonDisabled}
      pressed={pressed}
      accessibilityRole={accessibilityRole}
      accessible={accessible}
      focusable={focusable}
      importantForAccessibility={importantForAccessibility}
      icon={icon}
    >
      {loading ? (
        <UnstyledIconButtonSpinner />
      ) : (
        <UnstyledIconButtonIcon as={icon} style={iconStyle as ViewStyle} />
      )}
    </UnstyledIconButtonRootComponent>
  );
};
UnstyledIconButton.displayName = 'UnstyledIconButton';

export default UnstyledIconButton;
