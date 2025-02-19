import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCaretDownSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M8.013 12c-.51 0-.99-.24-1.28-.64L2.13 5.06a.649.649 0 0 1 .17-.94c.32-.21.76-.14.99.17l4.593 6.3c.04.05.08.07.13.06.04 0 .09-.01.12-.06l3.902-5.25H8.003c-.39 0-.71-.3-.71-.67 0-.37.32-.67.71-.67h5.173c.31 0 .59.16.73.42s.12.57-.06.81l-4.562 6.13c-.29.4-.76.64-1.27.64Z"
    />
  </Svg>
);
export default SvgCaretDownSmallIcon;
