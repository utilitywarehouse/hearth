import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSkipLeftSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M12.802 2.698a.651.651 0 0 0-.934 0L7.236 7.503a.718.718 0 0 0 0 .991l4.631 4.806a.653.653 0 0 0 .935 0 .692.692 0 0 0 0-.97L8.627 8l4.175-4.332a.692.692 0 0 0 0-.97Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      d="M3.66 13.5a.672.672 0 0 1-.66-.685V3.193c0-.38.295-.685.66-.685.366 0 .66.306.66.685v9.622a.67.67 0 0 1-.66.685Z"
    />
  </Svg>
);
export default SvgSkipLeftSmallIcon;
