import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBasketMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="m4.47 21.333-3.35-12h6.075l5.224-7.775 5.226 7.775h6.125l-3.35 12zm7.975-4q.824 0 1.412-.587.588-.588.588-1.413t-.588-1.412a1.93 1.93 0 0 0-1.412-.588q-.825 0-1.413.588a1.93 1.93 0 0 0-.588 1.412q0 .825.588 1.413.588.587 1.412.587m-2.825-8h5.625l-2.825-4.2z"
    />
  </Svg>
);
export default SvgBasketMediumIcon;
