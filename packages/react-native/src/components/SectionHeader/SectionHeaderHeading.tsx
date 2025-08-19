import { Heading } from '../Heading';
import HeadingProps from '../Heading/Heading.props';

const SectionHeaderHeading = ({ children, ...props }: HeadingProps) => {
  return (
    <Heading size="md" {...props}>
      {children}
    </Heading>
  );
};

SectionHeaderHeading.displayName = 'SectionHeaderHeading';

export default SectionHeaderHeading;
