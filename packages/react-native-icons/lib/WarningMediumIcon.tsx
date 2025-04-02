import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgWarningMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M1 21 12 2l11 19zm11-3q.424 0 .713-.288A.97.97 0 0 0 13 17a.97.97 0 0 0-.287-.712A.97.97 0 0 0 12 16a.97.97 0 0 0-.713.288A.97.97 0 0 0 11 17q0 .424.287.712.288.288.713.288m-1-4a1 1 0 1 0 2 0v-3a1 1 0 1 0-2 0z"
    />
  </Svg>
);
export default SvgWarningMediumIcon;
