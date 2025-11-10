import { View, type ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const CardActionContent = ({ children, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.container, props.style]}>
      {children}
    </View>
  );
};

CardActionContent.displayName = 'CardActionContent';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CardActionContent;
