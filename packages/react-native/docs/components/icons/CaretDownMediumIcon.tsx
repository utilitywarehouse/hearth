import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCaretDownMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12.014 18h-.01c-.66 0-1.28-.32-1.66-.85L4.18 8.52c-.32-.44-.2-1.04.25-1.35.45-.3 1.081-.19 1.391.25l6.164 8.63 5.222-7.11h-5.203c-.55 0-1-.43-1-.97s.45-.97 1-.97h6.844c.43 0 .83.23 1.02.6.2.37.17.82-.08 1.16l-6.123 8.4c-.38.52-1 .83-1.66.83l.01.01Z"
    />
  </Svg>
);
export default SvgCaretDownMediumIcon;
