import { HelperIcon } from '../Helper';
import IconProps from '../Icon/Icon.props';
import { ErrorCircleSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const FormFieldInvalidIcon = (props: Omit<IconProps, 'as'>) => (
  <HelperIcon as={ErrorCircleSmallIcon} {...props} />
);

FormFieldInvalidIcon.displayName = 'FormFieldInvalidIcon';

export default FormFieldInvalidIcon;
