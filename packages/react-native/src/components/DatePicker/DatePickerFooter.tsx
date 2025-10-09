import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '../Button';
import { useDatePickerContext } from './DatePicker.context';

const Footer = () => {
  const { closeDatePicker, onCancel } = useDatePickerContext();

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
    closeDatePicker();
  };
  return (
    <View style={styles.container} testID="footer">
      <Button variant="ghost" colorScheme="functional" onPress={handleCancel}>
        Cancel
      </Button>
      <Button variant="ghost" colorScheme="functional" onPress={closeDatePicker}>
        Ok
      </Button>
    </View>
  );
};

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.components.datePicker.calendar.footer.gap,
    justifyContent: 'flex-end',
  },
}));

export default Footer;
