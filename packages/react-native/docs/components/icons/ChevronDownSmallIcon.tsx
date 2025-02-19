import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronDownSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M7.407 11.105c.342.343.77.343 1.113.086l5.223-5.223a.828.828 0 0 0 0-1.2c-.342-.342-.77-.342-1.113-.085L8.006 9.307 3.468 4.77c-.27-.269-.93-.269-1.2 0-.268.268-.342.77-.085 1.113l5.224 5.223Z"
    />
  </Svg>
);
export default SvgChevronDownSmallIcon;
