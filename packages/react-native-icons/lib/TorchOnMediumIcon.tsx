import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTorchOnMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M6 5V2h12v3zm6 10.5q.624 0 1.063-.437.437-.438.437-1.063t-.437-1.062A1.45 1.45 0 0 0 12 12.5q-.625 0-1.062.438A1.45 1.45 0 0 0 10.5 14q0 .624.438 1.063.437.437 1.062.437M8 22V11L6 8V7h12v1l-2 3v11z"
    />
  </Svg>
);
export default SvgTorchOnMediumIcon;
