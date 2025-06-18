import { TextProps } from 'react-native';
import { BodyText } from '../../BodyText';

const ListItemText = ({ children, ...props }: TextProps) => {
  return (
    <BodyText size="lg" {...props}>
      {children}
    </BodyText>
  );
};

ListItemText.displayName = 'ListItemText';

export default ListItemText;
