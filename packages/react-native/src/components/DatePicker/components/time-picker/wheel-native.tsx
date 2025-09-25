import { memo } from 'react';
import { Platform } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { PickerOption } from '../../types';
import WheelPicker from './wheel-picker';

interface WheelProps {
  value: number | string;
  setValue?: (value: any) => void;
  items: PickerOption[];
}

const WheelNative = ({ value, setValue = () => {}, items }: WheelProps) => {
  return (
    <WheelPicker
      value={value}
      options={items}
      onChange={setValue}
      containerStyle={styles.container}
      itemHeight={44}
      decelerationRate="fast"
    />
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    ...Platform.select({
      web: {
        userSelect: 'none',
      },
    }),
  },
});

export default memo(WheelNative);
