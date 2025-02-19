import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgQuestionMarkMediumContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path fill={color} d="M12.14 18.18a.91.91 0 1 0 0-1.82.91.91 0 0 0 0 1.82Z" />
    <Path
      fill={color}
      d="M15.88 10.36c0-2.06-1.68-3.74-3.74-3.74-2.06 0-3.74 1.68-3.74 3.74 0 .55.45 1 1 1s1-.45 1-1a1.741 1.741 0 0 1 3.48 0c0 .96-.78 1.74-1.74 1.74-.55 0-1 .45-1 1v.94c0 .55.45 1 1 1s1-.45 1-1v-.09a3.726 3.726 0 0 0 2.74-3.59Z"
    />
    <Path
      fill={color}
      d="M12 22C6.49 22 2 17.51 2 12S6.49 2 12 2s10 4.49 10 10-4.49 10-10 10Zm0-18c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8Z"
    />
  </Svg>
);
export default SvgQuestionMarkMediumContainedIcon;
