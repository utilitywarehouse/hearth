import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSpinnerMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M18.364 5.6c-.39.39-.385 1.022-.046 1.459A7.995 7.995 0 0 1 20 11.978c0 4.428-3.582 8.018-8 8.018s-8-3.59-8-8.018a8.013 8.013 0 0 1 7.002-7.957c.548-.068.998-.51.998-1.064 0-.553-.449-1.007-.999-.953C5.947 2.507 2 6.78 2 11.978 2 17.513 6.477 22 12 22s10-4.487 10-10.022a9.995 9.995 0 0 0-2.258-6.345c-.35-.428-.988-.425-1.378-.034Z"
    />
  </Svg>
);
export default SvgSpinnerMediumIcon;
