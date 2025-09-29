import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const InputSlot = ({
  children,
  style,
  accessible,
  importantForAccessibility,
  ...props
}: ViewProps) => {
  return (
    <View
      {...props}
      accessible={accessible ?? false}
      importantForAccessibility={importantForAccessibility ?? 'no'}
      style={[styles.container, style]}
    >
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
