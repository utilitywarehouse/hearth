import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLockSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M3 19V7h2.625V5.286q0-1.78 1.28-3.032Q8.185 1 10 1t3.095 1.254 1.28 3.032V7H17v12zm7-4.286q.721 0 1.236-.503.514-.504.514-1.211t-.514-1.21A1.7 1.7 0 0 0 10 11.285q-.721 0-1.236.503-.514.504-.514 1.211t.514 1.21 1.236.504M7.375 7h5.25V5.286q0-1.072-.766-1.822-.765-.75-1.859-.75t-1.86.75-.765 1.822z"
    />
  </Svg>
);
export default SvgLockSmallIcon;
