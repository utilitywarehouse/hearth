import TextProps from '../DetailText/DetailText.props';
import { DetailText } from '../DetailText';

const SectionHeaderTitle = ({ children, ...props }: TextProps) => {
  return (
    <DetailText size="lg" {...props}>
      {children}
    </DetailText>
  );
};

SectionHeaderTitle.displayName = 'SectionHeaderTitle';

export default SectionHeaderTitle;
