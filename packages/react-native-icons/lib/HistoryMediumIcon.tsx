import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgHistoryMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M11.943 21q-3.67 0-6.264-2.517Q3.087 15.965 3 12.3h2.439q.133 2.64 1.993 4.456t4.51 1.817q2.755 0 4.692-1.936 1.935-1.936 1.935-4.705 0-2.722-1.941-4.607-1.941-1.884-4.686-1.885A6.2 6.2 0 0 0 9.341 6q-1.232.56-2.16 1.55h1.935v1.877H3.503V3.873h1.835v2.078a9.3 9.3 0 0 1 2.984-2.17A8.6 8.6 0 0 1 11.942 3q1.865 0 3.515.71a9.4 9.4 0 0 1 2.887 1.928 9 9 0 0 1 1.947 2.847A8.7 8.7 0 0 1 21 11.977a8.8 8.8 0 0 1-.709 3.507 9 9 0 0 1-1.947 2.87 9.3 9.3 0 0 1-2.887 1.935q-1.65.711-3.514.711m2.747-5.021-3.561-3.523v-5.13h1.835v4.342l3.058 2.982z"
    />
  </Svg>
);
export default SvgHistoryMediumIcon;
