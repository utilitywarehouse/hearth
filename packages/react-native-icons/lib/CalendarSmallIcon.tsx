import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCalendarSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M9.111 11.8V10h1.778v1.8zm-3.555 0V10h1.777v1.8zm7.11 0V10h1.778v1.8zm-3.555 3.6v-1.8h1.778v1.8zm-3.555 0v-1.8h1.777v1.8zm7.11 0v-1.8h1.778v1.8zM2 19V2.8h2.667V1h1.777v1.8h7.112V1h1.777v1.8H18V19zm1.778-1.8h12.444v-9H3.778z"
    />
  </Svg>
);
export default SvgCalendarSmallIcon;
