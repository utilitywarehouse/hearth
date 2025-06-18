import { View, type ViewProps } from 'react-native';

const ListItemTrailingContent = ({ children, ...props }: ViewProps) => (
  <View {...props}>{children}</View>
);

ListItemTrailingContent.displayName = 'ListItemTrailingContent';

export default ListItemTrailingContent;
