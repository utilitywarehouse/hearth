import { TextProps } from 'react-native';
import { BodyText } from '../../BodyText';
import { useCardActionContext } from './CardAction.context';

const CardActionText = ({ children, ...props }: TextProps) => {
  const { size } = useCardActionContext();

  return (
    <BodyText size={size} {...props}>
      {children}
    </BodyText>
  );
};

CardActionText.displayName = 'CardActionText';

export default CardActionText;
