import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgPhoneMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M19.95 21q-3.125 0-6.187-1.35T8.2 15.8t-3.85-5.55T3 4.05V3h5.9l.925 5.025-2.85 2.875q.55.975 1.225 1.85t1.45 1.625q.724.725 1.588 1.387.862.663 1.862 1.238l2.9-2.9 5 1.025V21z"
    />
  </Svg>
);
export default SvgPhoneMediumIcon;
