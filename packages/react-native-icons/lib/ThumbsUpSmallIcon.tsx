import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgThumbsUpSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M6.571 15V5.25L11.905 0l1.41 1.388-.991 3.862H18v3.3L15.219 15zM2 15V5.25h3.048V15z"
    />
  </Svg>
);
export default SvgThumbsUpSmallIcon;
