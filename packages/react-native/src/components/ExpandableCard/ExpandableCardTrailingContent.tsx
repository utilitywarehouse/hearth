import { View, type ViewProps } from 'react-native';

const ExpandableCardTrailingContent = ({ children, ...props }: ViewProps) => (
  <View {...props}>{children}</View>
);

ExpandableCardTrailingContent.displayName = 'ExpandableCardTrailingContent';

export default ExpandableCardTrailingContent;
