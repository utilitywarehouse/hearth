import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSendMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M19.687 3.077c.84-.343 1.48.542 1.274 1.15l-5.363 15.756c-.48 1.412-1.453 1.17-1.843.385l-1.6-3.78c-.189-.472 0-1.039.47-1.228.471-.189 1.097 0 1.319.473l.476 1.387 3.96-11.632L6.515 9.651l4.608 1.867 2.444-2.583a.908.908 0 0 1 1.318 0c.377.378.377.85.094 1.228l-2.918 2.93c-.283.283-.855.593-1.45.352l-6.939-2.811c-.925-.375-.838-1.794-.085-2.077l16.1-5.48Z"
    />
  </Svg>
);
export default SvgSendMediumIcon;
