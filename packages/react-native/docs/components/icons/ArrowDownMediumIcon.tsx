import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgArrowDownMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M3.289 12.746c-.6-.703-.2-1.607.599-1.707H9.98c.5 0 .899-.402.999-.904v-7.13c0-.603.4-1.005.999-1.005.5 0 .899.402.999.904v7.13c0 1.607-1.199 2.913-2.797 3.014H6.185l5.794 6.528 7.292-8.236c.3-.402.899-.402 1.298-.2l.1.1c.4.301.4.904.2 1.305l-.1.1-7.991 9.04c-.4.402-.999.402-1.399.1l-.1-.1-7.99-8.939Z"
    />
  </Svg>
);
export default SvgArrowDownMediumIcon;
