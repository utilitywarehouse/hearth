import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCloseSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M5.2 16 4 14.8 8.8 10 4 5.2 5.2 4 10 8.8 14.8 4 16 5.2 11.2 10l4.8 4.8-1.2 1.2-4.8-4.8z"
    />
  </Svg>
);
export default SvgCloseSmallIcon;
