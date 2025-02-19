import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgArrowRightSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M14.222 7.325a.868.868 0 0 1 0 1.273l-5.697 5.203a.752.752 0 0 1-1.082-.065.803.803 0 0 1 .064-1.112L12.61 7.96 8.782 4.464v2.214c0 1.144-.902 2.071-2.015 2.071h-4.5a.777.777 0 0 1-.767-.788c0-.435.343-.787.767-.787h4.5a.49.49 0 0 0 .482-.496V2.853c0-.735.845-1.124 1.38-.636l5.593 5.108Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgArrowRightSmallIcon;
