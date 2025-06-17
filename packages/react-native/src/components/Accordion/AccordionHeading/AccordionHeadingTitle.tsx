import TextProps from '../../DetailText/DetailText.props';
import { DetailText } from '../../DetailText';

const AccordionHeadingTitle = ({ children, ...props }: TextProps) => {
  return (
    <DetailText size="lg" {...props}>
      {children}
    </DetailText>
  );
};

AccordionHeadingTitle.displayName = 'AccordionHeadingTitle';

export default AccordionHeadingTitle;
