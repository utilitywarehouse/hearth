import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgOpenSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M8.602 8.156a.742.742 0 0 1-.533-1.268l1.668-1.649a1.43 1.43 0 0 1 1.776-.176l.977.644V3.434l-3.878.068a.756.756 0 0 1-.76-.75.75.75 0 0 1 .76-.752h3.947C13.36 2 14 2.644 14 3.424V6.38c0 .41-.227.79-.602.986-.375.195-.82.175-1.164-.049l-1.49-.976-1.61 1.59a.759.759 0 0 1-.532.215v.01Z"
    />
    <Path
      fill={color}
      d="M9.993 13.99H3.59A1.579 1.579 0 0 1 2 12.42V5.794c0-.868.71-1.57 1.589-1.57h3.957a.75.75 0 1 1 0 1.502H3.59s-.08.03-.08.078v6.624s.04.078.08.078h6.404s.08-.039.08-.078V8.566c0-.41.335-.751.76-.751a.75.75 0 0 1 .76.75v3.864A1.58 1.58 0 0 1 10.004 14l-.01-.01Z"
    />
  </Svg>
);
export default SvgOpenSmallIcon;
