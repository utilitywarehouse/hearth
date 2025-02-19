import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgFullscreenMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M3.311 22C2.556 21.967 2 21.389 2 20.678V14.81a1.324 1.324 0 0 1 2.022-1.122L6.9 15.5l2.167-2.178a1.053 1.053 0 0 1 1.489 1.49l-2.612 2.621a1.298 1.298 0 0 1-1.633.19l-2.211-1.4v3.666h5.567c.577 0 1.044.467 1.044 1.055 0 .59-.467 1.056-1.044 1.056H3.31Z"
    />
    <Path
      fill={color}
      d="M14.211 10.989a1.073 1.073 0 0 1-.755-1.833l2.488-2.5a1.332 1.332 0 0 1 1.667-.19l2.245 1.412V4.156h-5.578a1.079 1.079 0 0 1-1.067-1.09c0-.588.478-1.066 1.067-1.066h6.389c.766.033 1.333.633 1.333 1.356v5.966c0 .49-.267.945-.689 1.178a1.365 1.365 0 0 1-1.367-.033l-2.933-1.845-2.044 2.045a1.05 1.05 0 0 1-.756.31v.012Z"
    />
  </Svg>
);
export default SvgFullscreenMediumIcon;
