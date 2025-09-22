import { createButton } from '@gluestack-ui/button';
import { ViewStyle } from 'react-native';
import { useButtonGroupContext } from '../Button/ButtonGroup.context';
import { UnstyledIconButtonProps } from './UnstyledIconButton.props';
import UnstyledIconButtonIconComponent from './UnstyledIconButtonIcon';
import UnstyledIconButtonRootComponent from './UnstyledIconButtonRoot';
import UnstyledIconButtonSpinerComponent from './UnstyledIconButtonSpinner';

const UnstyledIconButtonComponent = createButton({
  Root: UnstyledIconButtonRootComponent,
  Icon: UnstyledIconButtonIconComponent,
  Group: () => null,
  Text: () => null,
  Spinner: UnstyledIconButtonSpinerComponent,
});

const UnstyledIconButtonSpinner = UnstyledIconButtonComponent.Spinner;
const UnstyledIconButtonIcon = UnstyledIconButtonComponent.Icon;

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
  const { loading } = props;
  const isLoading = loading ?? groupLoading;
  const buttonDisabled = isLoading || (disabled ?? groupDisabled);

  return (
    <UnstyledIconButtonComponent
      {...props}
      size={size}
      inverted={inverted}
      isDisabled={buttonDisabled}
      isPressed={pressed}
      icon={icon}
    >
      {loading ? (
        <UnstyledIconButtonSpinner />
      ) : (
        <UnstyledIconButtonIcon as={icon} style={iconStyle as ViewStyle} />
      )}
    </UnstyledIconButtonComponent>
  );
};
UnstyledIconButton.displayName = 'UnstyledIconButton';

export default UnstyledIconButton;
