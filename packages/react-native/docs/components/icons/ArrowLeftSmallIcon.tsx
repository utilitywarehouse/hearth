import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgArrowLeftSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M1.778 7.325a.867.867 0 0 0 0 1.273l5.697 5.203c.316.289.8.26 1.082-.065a.803.803 0 0 0-.064-1.112L3.39 7.96l3.829-3.497v2.214c0 1.144.902 2.071 2.015 2.071h4.5a.777.777 0 0 0 .767-.788.777.777 0 0 0-.767-.787h-4.5a.49.49 0 0 1-.482-.496V2.853c0-.735-.845-1.124-1.38-.636L1.778 7.325Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgArrowLeftSmallIcon;
