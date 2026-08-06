import { IconButtonProps } from './IconButton.props';
import IconButtonRootComponent from './IconButtonRoot';
import IconButtonIconComponent from './IconButtonIcon';
import IconButtonSpinerComponent from './IconButtonSpinner';
import { useButtonGroupContext } from '../Button/ButtonGroup.context';

const IconButtonSpinner = IconButtonSpinerComponent;
const IconButtonIcon = IconButtonIconComponent;

IconButtonSpinner.displayName = 'IconButtonSpinner';
IconButtonIcon.displayName = 'IconButtonIcon';

const IconButton = ({ icon, disabled = false, pressed, ...props }: IconButtonProps) => {
  const { disabled: groupDisabled, loading: groupLoading } = useButtonGroupContext();
  const { loading } = props;
  const isLoading = loading ?? groupLoading;
  const buttonDisabled = isLoading || (disabled ?? groupDisabled);

  return (
    <IconButtonRootComponent {...props} icon={icon} disabled={buttonDisabled} pressed={pressed}>
      {loading ? <IconButtonSpinner /> : <IconButtonIcon as={icon} />}
    </IconButtonRootComponent>
  );
};

IconButton.displayName = 'IconButton';

export default IconButton;
