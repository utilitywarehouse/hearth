import { HelperIcon } from '../Helper';
import IconProps from '../Icon/Icon.props';
import { TickCircleSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const FormFieldValidIcon = (props: Omit<IconProps, 'as'>) => (
  <HelperIcon as={TickCircleSmallIcon} {...props} />
);

FormFieldValidIcon.displayName = 'FormFieldValidIcon';

export default FormFieldValidIcon;
