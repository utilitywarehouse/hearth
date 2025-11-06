import { View, type ViewProps } from 'react-native';

const CardActionLeadingContent = ({ children, ...props }: ViewProps) => (
  <View {...props}>{children}</View>
);

CardActionLeadingContent.displayName = 'CardActionLeadingContent';

export default CardActionLeadingContent;
