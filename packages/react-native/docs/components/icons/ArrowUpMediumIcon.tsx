import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgArrowUpMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M20.746 11.33c.399.398.3.996-.1 1.395-.398.3-.897.3-1.296 0l-.1-.1-7.277-8.077L6.19 11.03h3.79c1.595 0 2.891 1.197 2.99 2.792v7.18c0 .6-.398.998-.996.998-.499 0-.897-.399-.997-.898v-7.08c0-.499-.399-.898-.897-.998H3.997A.997.997 0 0 1 3.2 11.43l.1-.1 7.975-8.975c.399-.4.997-.499 1.396-.1l.1.1 7.975 8.975Z"
    />
  </Svg>
);
export default SvgArrowUpMediumIcon;
