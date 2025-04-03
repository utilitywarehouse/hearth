import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgGasSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M12.067 6.099C9.607 4.235 10.678 2 10.678 2a7.6 7.6 0 0 0-1.833 1.463 7.3 7.3 0 0 0-1.82 3.665q-.106.61-.108 1.25c0 .91.17 1.785.48 2.591A4.34 4.34 0 0 1 5.81 8.02 5.7 5.7 0 0 0 4 12.181C4 15.395 6.686 18 9.999 18a6.06 6.06 0 0 0 4.72-2.227A5.7 5.7 0 0 0 16 12.183c0-3.041-1.471-4.22-3.933-6.084m-2.05 10.398c-1.023 0-1.852-.804-1.852-1.796 0-.99.83-1.793 1.852-1.793 1.02 0 1.849.802 1.849 1.793 0 .992-.83 1.796-1.85 1.796"
    />
  </Svg>
);
export default SvgGasSmallIcon;
