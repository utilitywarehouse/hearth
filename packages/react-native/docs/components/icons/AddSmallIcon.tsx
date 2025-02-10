import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgProps } from 'react-native-svg';

export interface IconProps extends SvgProps {
  children?: never;
  /** Sets the color of the icon fill */
  color?: string;
}

const SvgAddSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M8.75 2.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgAddSmallIcon;
