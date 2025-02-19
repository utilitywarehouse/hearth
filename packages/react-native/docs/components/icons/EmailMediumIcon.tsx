import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgEmailMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12 5c.6 0 1 .4 1 1 0 .5-.5 1-1 1H5c-.5 0-1 .3-1 .9V16c0 .5.4.9.9 1H19c.5 0 .9-.4 1-.9v-8l-7.4 5.8c-.3.2-.8.2-1.2 0L6 10.3c-.4-.3-.5-1-.2-1.4.3-.4.9-.5 1.4-.2l4.8 3.2 6.8-5.3c.8-.6 2-.6 2.7.2.332.38.5.8.5 1.2v8c0 1.6-1.5 3-3 3H5c-1.6 0-3-1-3-2.8V8c0-1.6 1.5-3 3-3h7Z"
    />
  </Svg>
);
export default SvgEmailMediumIcon;
