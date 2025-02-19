import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSkipRightSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="m3.207 3.667 4.37 4.33-4.37 4.329a.67.67 0 0 0 0 .969.704.704 0 0 0 .978 0l4.848-4.804a.695.695 0 0 0 0-.99L4.185 2.698a.704.704 0 0 0-.978 0 .67.67 0 0 0 0 .969Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      d="M12.309 13.5a.687.687 0 0 0 .691-.685V3.193a.687.687 0 0 0-.691-.685.687.687 0 0 0-.692.685v9.622c0 .38.309.685.692.685Z"
    />
  </Svg>
);
export default SvgSkipRightSmallIcon;
