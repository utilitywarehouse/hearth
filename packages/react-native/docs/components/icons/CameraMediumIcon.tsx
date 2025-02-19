import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCameraMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M13 3c1.282 0 2.385.807 2.813 1.97l.009.03H19a3 3 0 0 1 2.995 2.824L22 8v4a1 1 0 0 1-1.993.117L20 12V8a1 1 0 0 0-.883-.993L19 7h-4a1 1 0 0 1-.989-.85l-.01-.113-.004-.113a1 1 0 0 0-.878-.917L13 5h-2a1 1 0 0 0-.993.883L10 6a1 1 0 0 1-.883.993L9 7H5a1 1 0 0 0-.993.883L4 8v10a1 1 0 0 0 .883.993L5 19h14a1 1 0 0 0 .993-.883L20 18v-1.997a1 1 0 0 1 1.993-.117l.007.117V18a3 3 0 0 1-2.824 2.995L19 21H5a3 3 0 0 1-2.995-2.824L2 18V8a3 3 0 0 1 2.824-2.995L5 5h3.17l.005-.012a3.002 3.002 0 0 1 2.649-1.983L11 3h2Zm-1 5a5 5 0 1 1-4.62 3.086 1 1 0 1 1 1.847.766A3 3 0 1 0 12 10a1 1 0 1 1 0-2Z"
    />
  </Svg>
);
export default SvgCameraMediumIcon;
