import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgHomeAndBoilerCoverSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      d="M1.75 14.2a.76.76 0 0 1-.75-.757.76.76 0 0 1 .75-.758h11.49c.11 0 .24-.1.25-.151V7.91a.178.178 0 0 0-.05-.132L7.965 3.245s-.13-.04-.18 0L2.55 7.788s-.05.071-.05.111v2.585a.76.76 0 0 1-.75.758.76.76 0 0 1-.751-.758V7.9c0-.484.21-.939.57-1.252l5.244-4.543a1.623 1.623 0 0 1 2.101-.03L14.4 6.617c.39.323.61.808.6 1.313v4.634c-.02.899-.82 1.636-1.75 1.636H1.75Z"
    />
    <Path
      fill={color}
      d="M8.745 9.454V5.638a.76.76 0 0 0-.75-.757.76.76 0 0 0-.75.757v3.816c-.34.233-.571.586-.571 1.01 0 .697.59 1.262 1.32 1.262.731 0 1.322-.565 1.322-1.262 0-.424-.23-.777-.57-1.01Z"
    />
  </Svg>
);
export default SvgHomeAndBoilerCoverSmallIcon;
