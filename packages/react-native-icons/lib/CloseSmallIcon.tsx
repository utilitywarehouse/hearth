import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCloseSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M5.606 16 4 14.394 8.394 10 4 5.606 5.606 4 10 8.394 14.394 4 16 5.606 11.606 10 16 14.394 14.394 16 10 11.606z"
    />
  </Svg>
);
export default SvgCloseSmallIcon;
