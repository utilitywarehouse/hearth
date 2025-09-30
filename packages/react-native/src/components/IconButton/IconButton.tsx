import { createButton } from '@gluestack-ui/core/button/creator';
import { useButtonGroupContext } from '../Button/ButtonGroup.context';
import { IconButtonProps } from './IconButton.props';
import IconButtonIconComponent from './IconButtonIcon';
import IconButtonRootComponent from './IconButtonRoot';
import IconButtonSpinerComponent from './IconButtonSpinner';

const IconButtonComponent = createButton({
  Root: IconButtonRootComponent,
  Icon: IconButtonIconComponent,
  Group: () => null,
  Text: () => null,
  Spinner: IconButtonSpinerComponent,
});

const IconButtonSpinner = IconButtonComponent.Spinner;
const IconButtonIcon = IconButtonComponent.Icon;

IconButtonSpinner.displayName = 'IconButtonSpinner';
IconButtonIcon.displayName = 'IconButtonIcon';

const IconButton = ({ icon, disabled = false, pressed, ...props }: IconButtonProps) => {
  const { disabled: groupDisabled, loading: groupLoading } = useButtonGroupContext();
  const { loading } = props;
  const isLoading = loading ?? groupLoading;
  const buttonDisabled = isLoading || (disabled ?? groupDisabled);

  return (
    <IconButtonComponent {...props} icon={icon} isDisabled={buttonDisabled} isPressed={pressed}>
      {loading ? <IconButtonSpinner /> : <IconButtonIcon as={icon} />}
    </IconButtonComponent>
  );
};

IconButton.displayName = 'IconButton';

export default IconButton;
