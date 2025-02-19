import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTrashSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M10.522 14.5h-5.34c-.477 0-.894-.37-.972-.86L3.016 5.498c-.059-.37.048-.75.29-1.04.244-.289.584-.449.953-.449h1.01v-1.02c0-.819.65-1.488 1.437-1.488h2.437c.777 0 1.418.65 1.418 1.459V4h1.155c.389 0 .748.169.99.479.244.31.34.7.273 1.089l-1.505 8.104a.995.995 0 0 1-.962.819l.01.01Zm-.398-1.499 1.388-7.494h-1.427a.993.993 0 0 1-.98-1.01V2.97l-2.4.04.02 1.489a.993.993 0 0 1-.98 1.009H4.491L5.589 13h4.535Z"
    />
    <Path
      fill={color}
      d="M6.75 11.09c-.41 0-.75-.34-.75-.75V7.25c0-.41.34-.75.75-.75s.75.34.75.75v3.09c0 .41-.34.75-.75.75Z"
    />
    <Path
      fill={color}
      d="M9.15 11.09c-.41 0-.75-.34-.75-.75V7.25c0-.41.34-.75.75-.75s.75.34.75.75v3.09c0 .41-.34.75-.75.75Z"
    />
  </Svg>
);
export default SvgTrashSmallIcon;
