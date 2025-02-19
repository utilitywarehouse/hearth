import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCloseMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M6.352 5.239 12 10.886l5.648-5.647a.769.769 0 0 1 1.113 0 .77.77 0 0 1 0 1.113L13.114 12l5.647 5.648a.77.77 0 0 1 0 1.113.77.77 0 0 1-1.113 0L12 13.114 6.352 18.76a.77.77 0 0 1-1.113 0 .769.769 0 0 1 0-1.113L10.886 12 5.24 6.352a.769.769 0 0 1 0-1.113.769.769 0 0 1 1.113 0Z"
    />
  </Svg>
);
export default SvgCloseMediumIcon;
