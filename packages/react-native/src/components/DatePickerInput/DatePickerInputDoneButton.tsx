import { InputAccessoryView, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '../Button';

const DatePickerInputDoneButton = ({
  accessoryViewID,
  closeKeyboard,
}: {
  accessoryViewID: string;
  closeKeyboard: () => void;
}) => {
  return (
    <InputAccessoryView nativeID={accessoryViewID}>
      <View style={styles.accessory}>
        <Button
          accessibilityRole="button"
          accessibilityLabel="Done"
          onPress={closeKeyboard}
          variant="ghost"
          colorScheme="functional"
        >
          Done
        </Button>
      </View>
    </InputAccessoryView>
  );
};

const styles = StyleSheet.create(theme => ({
  accessory: {
    paddingHorizontal: 16,
    paddingVertical: 2,
    alignItems: 'flex-end',
    backgroundColor: theme.color.surface.neutral.strong,
    borderTopWidth: theme.borderWidth[1],
    borderTopColor: theme.color.border.subtle,
  },
}));

DatePickerInputDoneButton.DisplayName = 'DatePickerInputDoneButton';

export default DatePickerInputDoneButton;
