import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCashbackCardSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M2 16.5v-13h16v13zM5.2 10h9.6c.88 0 1.6-.731 1.6-1.625s-.72-1.625-1.6-1.625H5.2c-.88 0-1.6.731-1.6 1.625S4.32 10 5.2 10"
    />
  </Svg>
);
export default SvgCashbackCardSmallIcon;
