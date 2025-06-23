import { TextProps } from 'react-native';
import { BodyText } from '../../components/BodyText';

const AccordionContentText = ({ children, ...props }: TextProps) => {
  return <BodyText {...props}>{children}</BodyText>;
};

AccordionContentText.displayName = 'AccordionContentText';

export default AccordionContentText;
