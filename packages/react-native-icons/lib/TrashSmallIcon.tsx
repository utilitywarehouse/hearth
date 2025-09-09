import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTrashSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M8.25 14.444c.525 0 .875-.355.875-.888V7.333c0-.533-.35-.889-.875-.889s-.875.356-.875.89v6.222c0 .533.35.888.875.888m3.5 0c.525 0 .875-.355.875-.888V7.333c0-.533-.35-.889-.875-.889s-.875.356-.875.89v6.222c0 .533.35.888.875.888M3.875 18V4.667H3V2.889h4.375V2h5.25v.889H17v1.778h-.875V18z"
    />
  </Svg>
);
export default SvgTrashSmallIcon;
