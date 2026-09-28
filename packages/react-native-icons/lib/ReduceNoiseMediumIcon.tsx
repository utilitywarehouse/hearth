import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgReduceNoiseMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M11 21V3h2v18zm-4.675-2.625-1.4-1.4A7.1 7.1 0 0 0 6.463 14.7Q7.002 13.425 7 12q0-1.425-.537-2.7a7.1 7.1 0 0 0-1.538-2.275l1.4-1.425a9 9 0 0 1 1.962 9.838 9 9 0 0 1-1.962 2.937m-2.8-2.825L2.1 14.125a3.08 3.08 0 0 0 .9-2.149q0-.6-.238-1.15A3.1 3.1 0 0 0 2.1 9.85l1.425-1.425a4.92 4.92 0 0 1 1.5 3.55q0 1-.388 1.938a4.8 4.8 0 0 1-1.112 1.637M15 13v-2h6v2z"
    />
  </Svg>
);
export default SvgReduceNoiseMediumIcon;
