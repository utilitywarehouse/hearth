import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgInsuranceSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M18 10c0-4.4-3.6-8-8-8s-8 3.6-8 8h7.2v5.6c0 .48-.32.8-.8.8s-.8-.32-.8-.8v-.8H6v.8C6 16.96 7.04 18 8.4 18s2.4-1.04 2.4-2.4V10z"
    />
  </Svg>
);
export default SvgInsuranceSmallIcon;
