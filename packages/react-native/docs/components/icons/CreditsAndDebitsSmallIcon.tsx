import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCreditsAndDebitsSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M13.371 3H2.63C1.726 3 1 3.699 1 4.567v1.481c0 .434.374.794.825.794.452 0 .826-.36.826-.794l-.022-1.46 10.72-.021.022 7.345-10.621.021-.022-2.487h6.79l-.593.572a.777.777 0 0 0 0 1.122.833.833 0 0 0 .583.232.835.835 0 0 0 .583-.232l1.893-1.82a.748.748 0 0 0 .231-.583.805.805 0 0 0-.23-.646l-1.894-1.82a.854.854 0 0 0-1.166 0 .777.777 0 0 0 0 1.122l.484.465H2.728c-.903 0-1.629.699-1.629 1.567v2.508c0 .868.726 1.567 1.629 1.567h10.643c.903 0 1.629-.699 1.629-1.566V4.567C15 3.699 14.274 3 13.371 3Z"
    />
  </Svg>
);
export default SvgCreditsAndDebitsSmallIcon;
