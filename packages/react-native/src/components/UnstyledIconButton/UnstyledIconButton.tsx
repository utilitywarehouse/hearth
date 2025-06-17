import { createButton } from '@gluestack-ui/button';
import { UnstyledIconButtonProps } from './UnstyledIconButton.props';
import UnstyledIconButtonRootComponent from './UnstyledIconButtonRoot';
import UnstyledIconButtonIconComponent from './UnstyledIconButtonIcon';
import UnstyledIconButtonSpinerComponent from './UnstyledIconButtonSpinner';
import { useButtonGroupContext } from '../Button/ButtonGroup.context';

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
      {loading ? <UnstyledIconButtonSpinner /> : <UnstyledIconButtonIcon as={icon} />}
    </UnstyledIconButtonComponent>
  );
};
UnstyledIconButton.displayName = 'UnstyledIconButton';

export default UnstyledIconButton;
