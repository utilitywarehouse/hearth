import { TextProps } from 'react-native';
import { BodyText } from '../BodyText';

const ExpandableCardText = ({ children, ...props }: TextProps) => {
  return (
    <BodyText size="md" weight="semibold" {...props}>
      {children}
    </BodyText>
  );
};

ExpandableCardText.displayName = 'ExpandableCardText';

export default ExpandableCardText;
