import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTrashSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M8.375 12.938a.75.75 0 0 0 1.5 0v-5.5a.75.75 0 0 0-1.5 0zm2.5 0a.75.75 0 0 0 1.5 0v-5.5a.75.75 0 0 0-1.5 0zm-5.5 3.75v-11.5h-1v-1.5h4v-1h4v1h4v1.5h-1v11.5z"
    />
  </Svg>
);
export default SvgTrashSmallIcon;
