import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgUploadSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={20} height={20} fill="none" viewBox="0 0 20 20" {...props}>
    <Path
      fill={color}
      d="m10 6.25 4.688 4.688-1.313 1.359-2.437-2.438V17.5H9.062V9.86l-2.437 2.437-1.312-1.36zm7.5-3.75v4.688h-1.875V4.374H4.375v2.813H2.5V2.5z"
    />
  </Svg>
);
export default SvgUploadSmallIcon;
