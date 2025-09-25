import { memo } from 'react';
import { Platform } from 'react-native';
import { PickerOption } from '../DatePicker.props';
import WheelNative from './wheel-native';
import WheelWeb from './wheel-web';

type WheelProps = {
  value: number | string;
  setValue?: (value: any) => void;
  items: PickerOption[];
};

const Wheel = (props: WheelProps) => {
  const Component = Platform.OS === 'web' ? WheelWeb : WheelNative;
  return <Component {...props} />;
};

export default memo(Wheel);
