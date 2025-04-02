import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBroadbandMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M13.177 18.959q-.486.54-1.177.541-.69 0-1.177-.541-.485-.54-.485-1.311t.486-1.312T12 15.795t1.177.541q.485.54.485 1.312 0 .77-.486 1.311m7.058-7.869q-1.72-1.918-3.86-2.86-2.14-.943-4.375-.943t-4.375.942-3.86 2.861L2 9.123q2.088-2.328 4.676-3.475Q9.265 4.499 12 4.5q2.735 0 5.323 1.148T22 9.123zm-3.53 3.935q-.984-1.099-2.198-1.632a6.17 6.17 0 0 0-5.014 0q-1.214.534-2.199 1.631L5.53 13.058q1.352-1.508 3.029-2.245A8.5 8.5 0 0 1 12 10.074q1.765 0 3.441.738 1.677.737 3.03 2.245z"
    />
  </Svg>
);
export default SvgBroadbandMediumIcon;
