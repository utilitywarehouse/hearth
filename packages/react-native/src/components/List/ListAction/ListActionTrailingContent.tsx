import { View, type ViewProps } from 'react-native';

const ListActionTrailingContent = ({ children, ...props }: ViewProps) => (
  <View {...props}>{children}</View>
);

ListActionTrailingContent.displayName = 'ListActionTrailingContent';

export default ListActionTrailingContent;
