import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgElectricitySmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M3.51 15a1.013 1.013 0 0 1-.88-1.509l2.408-4.307H3.579a.9.9 0 0 1-.78-.44.929.929 0 0 1-.04-.899L5.958 1.47a.729.729 0 1 1 1.3.66L4.467 7.714h1.35a1.003 1.003 0 0 1 .869 1.51l-1.609 2.877 6.056-4.976h-1.76a.996.996 0 0 1-.908-.58c-.17-.36-.12-.77.13-1.08l2.448-2.987h-.92c-.4 0-.73-.33-.73-.74s.33-.739.73-.739h2.089c.36 0 .67.2.83.53.15.32.11.7-.12.979l-2.569 3.138h2.179c.41 0 .77.25.909.65.14.389.02.819-.3 1.078L4.14 14.76c-.18.16-.4.24-.63.24Zm-.29-1.379-.02.02.02-.02Z"
    />
  </Svg>
);
export default SvgElectricitySmallIcon;
