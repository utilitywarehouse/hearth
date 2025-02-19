import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgFullscreenSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M2.83 14a.843.843 0 0 1-.83-.84V9.51c0-.31.17-.59.43-.73a.86.86 0 0 1 .85.03l1.76 1.12 1.33-1.34a.664.664 0 1 1 .94.94L5.7 11.16c-.27.28-.71.33-1.04.12l-1.34-.85v2.25h3.43a.67.67 0 0 1 0 1.34H2.83V14Z"
    />
    <Path
      fill={color}
      d="M9.25 7.52c-.17 0-.34-.06-.47-.19a.664.664 0 0 1 0-.94l1.51-1.53c.28-.28.71-.33 1.04-.12l1.34.85V3.34H9.3A.67.67 0 0 1 9.3 2h3.88c.48.03.83.39.83.84v3.65c0 .3-.17.59-.43.73-.27.14-.59.14-.85-.03l-1.76-1.12-1.23 1.24c-.13.13-.3.2-.47.2l-.02.01Z"
    />
  </Svg>
);
export default SvgFullscreenSmallIcon;
