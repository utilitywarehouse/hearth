import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCaretUpSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M7.983 4c.51 0 .99.24 1.28.64l4.603 6.3c.23.31.15.73-.17.94-.32.21-.76.14-.99-.17l-4.593-6.3c-.04-.05-.08-.07-.13-.06-.04 0-.09.01-.12.06l-3.902 5.25h4.032c.39 0 .71.3.71.67 0 .37-.32.67-.71.67H2.82a.82.82 0 0 1-.73-.42.746.746 0 0 1 .06-.81l4.563-6.13c.29-.4.77-.63 1.28-.63L7.983 4Z"
    />
  </Svg>
);
export default SvgCaretUpSmallIcon;
