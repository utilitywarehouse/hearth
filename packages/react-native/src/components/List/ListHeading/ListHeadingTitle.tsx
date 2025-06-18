import TextProps from '../../DetailText/DetailText.props';
import { DetailText } from '../../DetailText';

const ListHeadingTitle = ({ children, ...props }: TextProps) => {
  return (
    <DetailText size="lg" {...props}>
      {children}
    </DetailText>
  );
};

ListHeadingTitle.displayName = 'ListHeadingTitle';

export default ListHeadingTitle;
