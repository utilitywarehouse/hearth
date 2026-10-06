import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMotorInsuranceMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M9.494 11.447q.347 0 .59.242a.8.8 0 0 1 .243.587q0 .345-.243.588a.8.8 0 0 1-.59.241.8.8 0 0 1-.591-.242.8.8 0 0 1-.243-.587q0-.345.243-.587a.8.8 0 0 1 .591-.242"
    />
    <Path
      fill={color}
      d="M14.494 11.447q.347 0 .59.242a.8.8 0 0 1 .243.587q0 .345-.243.588a.8.8 0 0 1-.59.241.8.8 0 0 1-.59-.242.8.8 0 0 1-.244-.587q0-.345.244-.587a.8.8 0 0 1 .59-.242"
    />
    <Path fill={color} d="m14.855 8.132.584 1.657h-6.89l.584-1.657z" />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M21 4.65v6.405q0 3.99-2.546 7.258Q15.91 21.582 12 22.5q-3.909-.919-6.453-4.187Q3 15.045 3 11.055V4.65l8.999-3.15zM8.938 7.026a.8.8 0 0 0-.479.152.8.8 0 0 0-.299.4l-1.166 3.317v4.42q0 .236.16.395a.54.54 0 0 0 .395.158h.556a.54.54 0 0 0 .555-.552v-.553h6.667v.553q0 .235.16.394a.54.54 0 0 0 .396.158h.556a.54.54 0 0 0 .554-.552v-4.421l-1.166-3.316a.81.81 0 0 0-.777-.553z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgMotorInsuranceMediumIcon;
