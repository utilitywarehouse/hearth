import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTopUpSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="M4.667 17.5H3v-15h15v8.333h-1.667V4.167H4.667v11.666h6.666V17.5zm11.666 1.667L15.167 18l1.312-1.333H13V15h3.48l-1.313-1.333 1.166-1.167 3.334 3.333zm-6.666-5h1.666v-3.334h3.334V9.167h-3.334V5.833H9.667v3.334H6.333v1.666h3.334z"
    />
  </Svg>
);
export default SvgTopUpSmallIcon;
