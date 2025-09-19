import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgWithdrawSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M15.833 17.5H17.5v-15h-15v8.333h1.667V4.167h11.666v11.666H9.167V17.5zM4.167 19.167 5.333 18l-1.312-1.333H7.5V15H4.02l1.313-1.333L4.167 12.5.833 15.833zm1.666-8.334V9.167h8.334v1.666z"
    />
  </Svg>
);
export default SvgWithdrawSmallIcon;
