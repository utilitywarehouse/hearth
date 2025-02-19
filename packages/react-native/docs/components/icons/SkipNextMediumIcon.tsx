import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSkipNextMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M5.073 3.375c.98.741 10.166 7.555 10.166 7.555 1.22.904.76 1.853.24 2.244l-9.892 7.544c-.52.391-1.186.1-1.376-.155-.19-.254-.473-.84.238-1.381l9.05-6.903-8.462-6.315.043 6.167c0 .652-.674.98-1.069.98-.395 0-1.011-.328-1.011-.98V4.31c0-1.293 1.092-1.676 2.073-.934ZM19.989 3C20.478 3 21 3.5 21 4v15.953c0 .783-.506 1.047-1.011 1.047a1.015 1.015 0 0 1-1.011-1.047V4c.022-.5.522-1 1.01-1Z"
    />
  </Svg>
);
export default SvgSkipNextMediumIcon;
