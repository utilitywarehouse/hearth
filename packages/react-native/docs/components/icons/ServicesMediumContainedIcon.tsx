import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgServicesMediumContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8Z"
    />
    <Path
      fill={color}
      d="M15.136 16.02H9.06c-.753 0-1.364-.61-1.364-1.364V10.85c0-.407.183-.794.499-1.059l2.962-2.463a1.348 1.348 0 0 1 1.69-.02L15.98 9.78c.326.255.52.652.52 1.069v3.796c0 .753-.612 1.364-1.365 1.364v.01Zm-5.415-2.035h4.743v-2.81l-2.442-1.923-2.3 1.903v2.83Z"
    />
  </Svg>
);
export default SvgServicesMediumContainedIcon;
