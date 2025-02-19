import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgInsightsMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M9.28 3a1 1 0 0 1 .92.614l5.598 13.617 2.324-6.543a.999.999 0 0 1 .945-.658H22a.99.99 0 0 1 1 .98.99.99 0 0 1-1 .98h-2.223l-2.966 8.352a.998.998 0 0 1-.92.658 1 1 0 0 1-.952-.614L9.255 6.558l-2.066 4.83a1 1 0 0 1-.922.602H2a.99.99 0 0 1-1-.98.99.99 0 0 1 1-.98h3.602L8.35 3.6a1 1 0 0 1 .93-.6Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgInsightsMediumIcon;
