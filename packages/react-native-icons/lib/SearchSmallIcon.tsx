import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSearchSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="m15.879 17.318-5.062-5.061q-.613.411-1.353.648a5.2 5.2 0 0 1-1.593.237q-2.19 0-3.73-1.541T2.6 7.87t1.54-3.73Q5.683 2.6 7.87 2.6q2.19 0 3.73 1.54 1.542 1.542 1.542 3.731 0 .866-.237 1.593a5.2 5.2 0 0 1-.648 1.33l5.073 5.085zM7.871 11.1q1.352 0 2.29-.938.939-.94.939-2.291 0-1.352-.938-2.291-.94-.939-2.291-.938-1.353 0-2.291.938-.938.94-.938 2.29 0 1.353.938 2.292.94.938 2.29.938"
    />
  </Svg>
);
export default SvgSearchSmallIcon;
