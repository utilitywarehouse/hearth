import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBookmarkMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M16.981 6c.3 0 .6.1.8.4l3.994 5c.3.4.3.9 0 1.2l-3.995 5c-.2.3-.5.4-.799.4H3c-.6 0-.999-.4-.999-1V7c0-.6.4-1 .999-1h13.98Zm-.5 2H3.998v8h12.485l3.196-4-3.196-4Zm-2.496 1c.6 0 .999.4.999 1 0 .5-.484 1-.999 1-.6 0-.999.4-.999 1s.4 1 .999 1c.5 0 .999-.5.999-1 0-.6.4-1 .998-1 .6 0 1 .4 1 1 0 1.7-1.3 3-2.997 3-1.698 0-2.996-1.3-2.996-3s1.298-3 2.996-3Z"
    />
  </Svg>
);
export default SvgBookmarkMediumIcon;
