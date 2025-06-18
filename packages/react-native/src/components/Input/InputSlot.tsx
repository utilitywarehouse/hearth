import { StyleSheet } from 'react-native-unistyles';
import { View, ViewProps } from 'react-native';

const InputSlot = ({ children, style, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  );
};

InputSlot.displayName = 'InputSlot';

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default InputSlot;
