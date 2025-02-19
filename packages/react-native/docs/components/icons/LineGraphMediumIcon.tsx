import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLineGraphMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M9.535 3a1 1 0 0 1 .952.663l4.577 12.786 1.689-7.34a1 1 0 0 1 .974-.776H21a1 1 0 1 1 0 2h-2.477l-2.276 9.891a1 1 0 0 1-1.916.113L9.577 7.056l-2.356 7.04a1 1 0 0 1-.948.682H3a1 1 0 1 1 0-2h2.553l3.044-9.095A1 1 0 0 1 9.535 3Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgLineGraphMediumIcon;
