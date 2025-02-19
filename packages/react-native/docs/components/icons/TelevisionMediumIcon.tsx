import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTelevisionMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M20.191 4H3.809C2.811 4 2 4.829 2 5.848v9.351c0 1.019.812 1.848 1.809 1.848h6.264a.857.857 0 0 0 .845-.864.857.857 0 0 0-.845-.863H3.809a.117.117 0 0 1-.118-.12V5.847c0-.07.05-.121.118-.121h16.382c.068 0 .118.052.118.12V15.2c0 .07-.05.121-.118.121h-7.227c-.998 0-1.81.829-1.81 1.848v1.105H9.592a.857.857 0 0 0-.845.864c0 .474.38.863.845.863h4.818a.857.857 0 0 0 .845-.863.857.857 0 0 0-.845-.864h-1.564v-1.105c0-.07.051-.121.119-.121h7.227c.998 0 1.809-.829 1.809-1.848V5.848C22 4.828 21.189 4 20.191 4Z"
    />
  </Svg>
);
export default SvgTelevisionMediumIcon;
