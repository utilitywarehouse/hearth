import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTwitterMediumFilledIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M21 6.718c-.675.297-1.39.49-2.121.577a3.68 3.68 0 0 0 1.624-2.027 7.44 7.44 0 0 1-2.345.89A3.702 3.702 0 0 0 15.462 5c-2.04 0-3.692 1.64-3.692 3.665 0 .286.032.567.095.835a10.512 10.512 0 0 1-7.611-3.83 3.629 3.629 0 0 0-.5 1.843c0 1.27.65 2.394 1.642 3.05a3.695 3.695 0 0 1-1.672-.458v.046a3.673 3.673 0 0 0 2.962 3.593 3.726 3.726 0 0 1-1.668.063 3.693 3.693 0 0 0 3.45 2.545A7.446 7.446 0 0 1 3.88 17.92a7.75 7.75 0 0 1-.881-.05 10.513 10.513 0 0 0 5.661 1.646c6.793 0 10.507-5.584 10.507-10.426 0-.16-.003-.318-.01-.475A7.459 7.459 0 0 0 21 6.718Z"
    />
  </Svg>
);
export default SvgTwitterMediumFilledIcon;
