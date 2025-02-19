import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgStandbyLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M20.58 15.84c.51-.2.77-.78.57-1.29a.993.993 0 0 0-1.29-.57 11.291 11.291 0 0 0-7.23 10.58c0 6.27 5.1 11.37 11.37 11.37s11.37-5.1 11.37-11.37c0-4.64-2.9-8.89-7.22-10.58a.993.993 0 0 0-1.29.57c-.2.51.05 1.09.57 1.29 3.55 1.39 5.94 4.89 5.94 8.71 0 5.17-4.2 9.37-9.37 9.37-5.17 0-9.37-4.2-9.37-9.37a9.3 9.3 0 0 1 5.95-8.71Z"
    />
    <Path
      fill={color}
      d="M25 22.02V11.75c0-.55-.45-1-1-1s-1 .45-1 1v10.27c0 .55.45 1 1 1s1-.45 1-1Z"
    />
    <Path
      fill={color}
      d="M24 4C12.97 4 4 12.97 4 24c0 7.63 4.24 14.49 11.05 17.89.49.25 1.09.05 1.34-.45a.993.993 0 0 0-.45-1.34C9.81 37.04 6 30.87 6 24c0-9.92 8.08-18 18-18s18 8.08 18 18-8.08 18-18 18c-.55 0-1 .45-1 1s.45 1 1 1c11.03 0 20-8.97 20-20S35.03 4 24 4Z"
    />
  </Svg>
);
export default SvgStandbyLargeIcon;
