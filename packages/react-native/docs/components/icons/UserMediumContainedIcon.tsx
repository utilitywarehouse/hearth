import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgUserMediumContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8Z"
    />
    <Path
      fill={color}
      d="M11.95 11.79c-1.79 0-3.25-1.46-3.25-3.25s1.46-3.25 3.25-3.25 3.25 1.46 3.25 3.25-1.46 3.25-3.25 3.25Zm0-4.5a1.25 1.25 0 1 0 .001 2.5 1.25 1.25 0 0 0 0-2.5Z"
    />
    <Path
      fill={color}
      d="M7.36 16.74c-.15 0-.31-.04-.46-.11-.49-.25-.68-.86-.43-1.35.91-1.76 2.8-2.87 5.06-2.97 2.48-.1 4.75 1 5.95 2.89.3.47.16 1.08-.31 1.38-.47.3-1.08.16-1.38-.31-.82-1.29-2.42-2.06-4.17-1.97-1.54.07-2.8.78-3.37 1.89-.18.34-.53.54-.89.54v.01Z"
    />
  </Svg>
);
export default SvgUserMediumContainedIcon;
