import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgInsightsSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M6.336 2c.35.003.665.225.8.566l3.173 7.976 1.197-3.483a.879.879 0 0 1 .822-.609h1.797c.483 0 .875.413.875.923s-.392.923-.875.923h-1.183l-1.751 5.096a.88.88 0 0 1-.801.608.874.874 0 0 1-.829-.566L6.314 5.27 5.29 7.742a.875.875 0 0 1-.802.554H1.875c-.483 0-.875-.413-.875-.923s.392-.923.875-.923h2.04l1.613-3.896A.874.874 0 0 1 6.336 2Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgInsightsSmallIcon;
