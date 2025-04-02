import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgUploadSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="m10 6 5 5-1.4 1.45-2.6-2.6V18H9V9.85l-2.6 2.6L5 11zm8-4v5h-2V4H4v3H2V2z"
    />
  </Svg>
);
export default SvgUploadSmallIcon;
