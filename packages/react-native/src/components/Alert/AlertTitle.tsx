import type { TextProps } from 'react-native';
import { DetailText } from '../DetailText';

const AlertTitle = ({ children, ...props }: TextProps) => {
  return (
    <DetailText size="md" {...props}>
      {children}
    </DetailText>
  );
};

AlertTitle.displayName = 'AlertTitle';

export default AlertTitle;
