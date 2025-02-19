import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCloseSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M3.244 3.244a.833.833 0 0 1 1.179 0l8.333 8.333a.833.833 0 1 1-1.179 1.179L3.244 4.423a.833.833 0 0 1 0-1.179Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M3.244 12.756a.833.833 0 0 1 0-1.179l8.333-8.333a.833.833 0 1 1 1.179 1.179l-8.333 8.333a.833.833 0 0 1-1.179 0Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgCloseSmallIcon;
