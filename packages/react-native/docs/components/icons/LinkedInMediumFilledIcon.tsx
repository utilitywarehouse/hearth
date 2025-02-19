import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLinkedInMediumFilledIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M16.53 8.68c3.775 0 4.47 2.488 4.47 5.718v6.601L17.272 21v-5.996c-.005-1.37-.095-3.037-1.94-3.037-1.94 0-2.238 1.515-2.238 3.082v5.95H9.367V8.982h3.58v1.639h.052c.497-.944 1.715-1.94 3.53-1.94Zm-9.501.303V21H3.297V8.983h3.732ZM5.162 3c1.192 0 2.16.968 2.161 2.162 0 1.193-.968 2.181-2.162 2.181C3.969 7.343 3 6.355 3 5.162 3 3.968 3.968 3 5.162 3Z"
    />
  </Svg>
);
export default SvgLinkedInMediumFilledIcon;
