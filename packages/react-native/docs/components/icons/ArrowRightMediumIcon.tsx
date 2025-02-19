import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgArrowRightMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12.67 20.746c-.398.399-.996.299-1.395-.1-.3-.399-.3-.897 0-1.296l.1-.1 8.177-7.277L12.97 6.19v3.79c0 1.595-1.197 2.89-2.792 2.99h-7.18c-.6 0-.998-.398-.998-.996 0-.499.399-.898.898-.997h7.08c.499 0 .898-.4.998-.898V3.997a.996.996 0 0 1 1.595-.798l.1.1 8.975 7.976c.4.399.499.997.1 1.396l-.1.1-8.975 7.975Z"
    />
  </Svg>
);
export default SvgArrowRightMediumIcon;
