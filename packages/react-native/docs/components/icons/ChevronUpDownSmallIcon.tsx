import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgChevronUpDownSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M11.208 6a.75.75 0 0 1-.556-.25L7.987 2.872 5.343 5.728a.75.75 0 0 1-1.112 0 .92.92 0 0 1 0-1.213l2.906-3.14a1.143 1.143 0 0 1 1.7 0l2.938 3.163a.905.905 0 0 1 0 1.201.75.75 0 0 1-.557.25l-.01.011Z"
    />
    <Path
      fill={color}
      d="M4.797 9.996c.2 0 .4.08.557.25l2.664 2.879 2.644-2.857a.75.75 0 0 1 1.112 0 .92.92 0 0 1 0 1.213l-2.906 3.14a1.143 1.143 0 0 1-1.7 0l-2.937-3.163a.905.905 0 0 1 0-1.201.75.75 0 0 1 .556-.25l.01-.011Z"
    />
  </Svg>
);
export default SvgChevronUpDownSmallIcon;
