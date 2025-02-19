import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSearchSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="m14.771 13.674-3.122-3.1a5.876 5.876 0 0 0 1.283-3.655c0-3.267-2.67-5.919-5.96-5.919C3.68 1 1 3.641 1 6.909s2.68 5.92 5.96 5.92a5.922 5.922 0 0 0 3.554-1.18l3.143 3.121a.78.78 0 0 0 .557.23.783.783 0 0 0 .557-1.336v.01ZM2.577 6.91c0-2.401 1.966-4.353 4.384-4.353 2.417 0 4.383 1.952 4.383 4.353s-1.966 4.353-4.383 4.353c-2.418 0-4.384-1.952-4.384-4.353Z"
    />
  </Svg>
);
export default SvgSearchSmallIcon;
