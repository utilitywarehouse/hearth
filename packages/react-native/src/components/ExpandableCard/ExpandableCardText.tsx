import { TextProps } from 'react-native';
import { BodyText } from '../BodyText';

const ExpandableCardText = ({ children, ...props }: TextProps) => {
  return (
    <BodyText size="lg" {...props}>
      {children}
    </BodyText>
  );
};

ExpandableCardText.displayName = 'ExpandableCardText';

export default ExpandableCardText;
