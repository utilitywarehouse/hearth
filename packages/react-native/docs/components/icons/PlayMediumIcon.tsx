import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgPlayMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M5 2c.3 0 .5 0 1 .3l14 8.1c.9.5 1 1.225 1 1.6 0 .5-.115 1.08-1.102 1.61C18.912 14.143 4.5 21.9 4.5 21.9c-.5.2-1.1.1-1.4-.4-.2-.4-.1-1 .4-1.4l15.32-8.247L5 4v9.998c0 .5-.267 1.102-1 1.102s-1-.702-1-1.102V4c0-1.1.9-2 2-2Z"
    />
  </Svg>
);
export default SvgPlayMediumIcon;
