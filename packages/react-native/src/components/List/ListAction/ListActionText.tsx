import { TextProps } from 'react-native';
import { BodyText } from '../../BodyText';

const ListActionText = ({ children, ...props }: TextProps) => {
  return (
    <BodyText size="md" weight="semibold" {...props}>
      {children}
    </BodyText>
  );
};

ListActionText.displayName = 'ListActionText';

export default ListActionText;
