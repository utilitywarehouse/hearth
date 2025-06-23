import { View, type ViewProps } from 'react-native';

const ListItemLeadingContent = ({ children, ...props }: ViewProps) => (
  <View {...props}>{children}</View>
);

ListItemLeadingContent.displayName = 'ListItemLeadingContent';

export default ListItemLeadingContent;
