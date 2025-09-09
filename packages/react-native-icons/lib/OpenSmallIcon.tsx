import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgOpenSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M2 18V2h8v1.778H3.778v12.444h12.444V10H18v8zm5.956-4.711L6.71 12.044l8.267-8.266h-3.2V2H18v6.222h-1.778v-3.2z"
    />
  </Svg>
);
export default SvgOpenSmallIcon;
