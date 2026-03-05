import { Platform } from 'react-native';
import type { PickerOption } from '../TimePicker.props';
import WheelNativeAndroid from './wheel-native.android';
import WheelNativeIOS from './wheel-native.ios';

const WheelNative = Platform.OS === 'android' ? WheelNativeAndroid : WheelNativeIOS;

interface PeriodProps {
  value: string;
  setValue?: (value: any) => void;
}

const options: PickerOption[] = [
  { value: 'AM', text: 'AM' },
  { value: 'PM', text: 'PM' },
];

const PeriodNative = ({ value, setValue = () => {} }: PeriodProps) => {
  return <WheelNative value={value} items={options} setValue={setValue} />;
};

export default PeriodNative;
