import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSkipRightMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="m4.292 5.722 6.299 6.288-6.299 6.288a.996.996 0 0 0 0 1.41c.39.39 1.02.39 1.42 0L12.7 12.72c.4-.4.4-1.04 0-1.44L5.712 4.292c-.39-.39-1.02-.39-1.42 0a.996.996 0 0 0 0 1.41v.02Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      d="M19 19.99c.55 0 1-.45 1-1V5c0-.55-.45-1-1-1s-1 .45-1 1v14c0 .55.45 1 1 1v-.01Z"
    />
  </Svg>
);
export default SvgSkipRightMediumIcon;
