import { View, type ViewProps } from 'react-native';

const ExpandableCardLeadingContent = ({ children, ...props }: ViewProps) => (
  <View {...props}>{children}</View>
);

ExpandableCardLeadingContent.displayName = 'ExpandableCardLeadingContent';

export default ExpandableCardLeadingContent;
