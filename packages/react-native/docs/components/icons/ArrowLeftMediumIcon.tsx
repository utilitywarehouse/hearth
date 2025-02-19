import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgArrowLeftMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M11.254 3.289c.703-.6 1.607-.2 1.707.599V9.98c0 .5.402.899.904.999h7.13c.603 0 1.005.4 1.005.999 0 .5-.402.899-.904.999h-7.13c-1.608 0-2.913-1.199-3.014-2.797V6.185L4.424 11.98l8.236 7.292c.402.3.402.899.2 1.298l-.1.1c-.301.4-.904.4-1.306.2l-.1-.1-9.039-7.991a1.065 1.065 0 0 1-.1-1.399l.1-.1 8.939-7.99Z"
    />
    <Path
      fill={color}
      d="M11.254 3.289c.703-.6 1.607-.2 1.707.599V9.98c0 .5.402.899.904.999h7.13c.603 0 1.005.4 1.005.999 0 .5-.402.899-.904.999h-7.13c-1.608 0-2.913-1.199-3.014-2.797V6.185L4.424 11.98l8.236 7.292c.402.3.402.899.2 1.298l-.1.1c-.301.4-.904.4-1.306.2l-.1-.1-9.039-7.991a1.065 1.065 0 0 1-.1-1.399l.1-.1 8.939-7.99Z"
    />
  </Svg>
);
export default SvgArrowLeftMediumIcon;
