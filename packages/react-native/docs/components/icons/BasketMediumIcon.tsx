import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBasketMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M4.757 8.18C4.757 4.074 7.877 1 12 1s7.243 3.074 7.243 7.18a.993.993 0 1 1-1.986 0c0-2.991-2.211-5.195-5.257-5.195S6.743 5.19 6.743 8.18a.993.993 0 1 1-1.986 0Zm-2.536 2.47a.993.993 0 0 1 .772-.369h18.014a.993.993 0 0 1 .971 1.2L19.68 22.22a.993.993 0 0 1-.97.785H5.29a.993.993 0 0 1-.97-.785L2.022 11.482a.993.993 0 0 1 .199-.832Zm2 1.617 1.872 8.751h11.814l1.873-8.752H4.22Zm3.735 1.199c.548 0 .993.444.993.993v4.367a.993.993 0 0 1-1.986 0V14.46c0-.549.445-.993.993-.993Zm4.044 0c.548 0 .993.444.993.993v4.367a.993.993 0 0 1-1.986 0V14.46c0-.549.445-.993.993-.993Zm4.044 0c.548 0 .993.444.993.993v4.367a.993.993 0 1 1-1.985 0V14.46c0-.549.444-.993.992-.993Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgBasketMediumIcon;
