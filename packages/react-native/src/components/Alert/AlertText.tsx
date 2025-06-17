import { TextProps } from 'react-native';
import { BodyText } from '../BodyText';

const AlertText = ({
  children,
  semibold = false,
  ...props
}: TextProps & { semibold?: boolean }) => {
  return (
    <BodyText size="md" {...props}>
      {children}
    </BodyText>
  );
};

AlertText.displayName = 'AlertText';

export default AlertText;
