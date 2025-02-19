import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTickMediumContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8Z"
    />
    <Path
      fill={color}
      d="M10.75 16.28c-.37 0-.72-.15-.98-.41L6.5 12.59a.996.996 0 1 1 1.41-1.41L10.73 14 16 8.06a.998.998 0 1 1 1.49 1.33l-5.7 6.42c-.25.29-.62.46-1 .47h-.04Z"
    />
  </Svg>
);
export default SvgTickMediumContainedIcon;
