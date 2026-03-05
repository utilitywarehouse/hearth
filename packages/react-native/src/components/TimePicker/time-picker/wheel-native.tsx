import type { ComponentType } from 'react';
import { Platform } from 'react-native';
import type { PickerOption } from '../TimePicker.props';
import WheelNativeAndroid from './wheel-native.android';
import WheelNativeIOS from './wheel-native.ios';

type WheelProps = {
  value: number | string;
  setValue?: (value: any) => void;
  items: PickerOption[];
};

const WheelNative: ComponentType<WheelProps> =
  Platform.OS === 'android' ? WheelNativeAndroid : WheelNativeIOS;

export default WheelNative;
