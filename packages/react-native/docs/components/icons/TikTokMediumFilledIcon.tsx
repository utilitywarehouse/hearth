import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTikTokMediumFilledIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M19.084 7.265c-.875-.117-1.631-.587-2.268-1.291-.757-.822-1.194-1.918-1.155-2.974h-3.144v12.326c0 1.448-1.194 2.622-2.707 2.622-.875 0-1.67-.43-2.189-1.096-.318-.43-.477-.977-.477-1.526 0-1.447 1.194-2.622 2.666-2.622.28 0 .557.04.796.118V9.69a4.965 4.965 0 0 0-.796-.079h-.119C6.507 9.691 4 12.234 4 15.326c0 1.487.597 2.857 1.552 3.874a5.969 5.969 0 0 0 4.26 1.8c3.223 0 5.85-2.543 5.85-5.674V8.908A5.857 5.857 0 0 0 20 10.355V7.264a1.806 1.806 0 0 1-.916 0v.001Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgTikTokMediumFilledIcon;
