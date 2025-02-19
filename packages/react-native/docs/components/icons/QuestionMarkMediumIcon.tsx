import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgQuestionMarkMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12 17c.6 0 1 .4 1 1s-.4 1-1 1-1-.4-1-1 .4-1 1-1Zm0-12c2.5 0 4.5 2 4.5 4.5 0 2.1-1.5 4-3.5 4.5 0 .6-.5 1-1 1s-1-.5-1-1v-1c0-.6.4-1 1-1 1.4 0 2.5-1.1 2.5-2.5S13.4 7 12 7 9.5 8.1 9.5 9.5c0 .6-.4 1-1 1s-1-.4-1-1C7.5 7 9.5 5 12 5Z"
    />
  </Svg>
);
export default SvgQuestionMarkMediumIcon;
