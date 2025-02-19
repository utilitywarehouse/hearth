import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgInformation01SmallContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12Zm.669-8.177a.669.669 0 1 1-1.338 0 .669.669 0 0 1 1.338 0ZM7.357 10.4a.635.635 0 0 0 .634.643.648.648 0 0 0 .643-.643l.017-2.28a.635.635 0 0 0-.634-.643.648.648 0 0 0-.643.643l-.017 2.28Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgInformation01SmallContainedIcon;
