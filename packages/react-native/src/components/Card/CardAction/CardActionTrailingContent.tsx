import { View, type ViewProps } from 'react-native';

const CardActionTrailingContent = ({ children, ...props }: ViewProps) => (
  <View {...props}>{children}</View>
);

CardActionTrailingContent.displayName = 'CardActionTrailingContent';

export default CardActionTrailingContent;
