import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCashbackCardSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M13.411 13.5H2.7c-.88 0-1.59-.69-1.59-1.53v-1.54c0-.84.71-1.53 1.59-1.53h8.733c.43 0 .78.34.78.75s-.35.75-.78.75H2.7l-.03 1.57 10.74.03.03-7.47L2.59 4.5l-.03 2.51c0 .41-.35.75-.78.75-.43 0-.779-.34-.779-.75V4.53C1.01 3.69 1.72 3 2.599 3H13.41c.881 0 1.59.69 1.59 1.53v7.44c0 .84-.71 1.53-1.589 1.53Z"
    />
  </Svg>
);
export default SvgCashbackCardSmallIcon;
