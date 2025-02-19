import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgEmailSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M13.57 3H2.43C1.638 3 1 3.648 1 4.452v7.095C1 12.352 1.638 13 2.43 13h11.14c.792 0 1.43-.648 1.43-1.453V4.452C15 3.648 14.362 3 13.57 3Zm-1.296 1.567L8.13 7.013a.239.239 0 0 1-.237 0L3.849 4.567h8.425ZM2.543 5.602 7.09 8.36c.277.168.596.262.915.262.319 0 .617-.084.895-.24l4.557-2.697v5.748H2.543V5.602Z"
    />
  </Svg>
);
export default SvgEmailSmallIcon;
