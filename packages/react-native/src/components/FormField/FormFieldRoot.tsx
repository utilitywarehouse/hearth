import { StyleSheet } from 'react-native-unistyles';
import { View, ViewProps } from 'react-native';

const FormFieldRoot = ({ children, style, ...props }: ViewProps) => {
  return (
    <View {...props} style={[styles.container, style]}>
      {children}
    </View>
  );
};

FormFieldRoot.displayName = 'FormFieldRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'column',
    gap: theme.components.formField.gap,
  },
}));

export default FormFieldRoot;
