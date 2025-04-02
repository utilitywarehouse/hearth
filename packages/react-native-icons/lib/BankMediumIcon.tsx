import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBankMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={22} fill="none" viewBox="0 0 24 22" {...props}>
    <Path
      fill={color}
      d="M6.21 17.302a1 1 0 0 1-1-1v-5.163a1 1 0 0 1 1-1h.155a1 1 0 0 1 1 1v5.163a1 1 0 0 1-1 1zm5.945 0a1 1 0 0 1-1-1v-5.163a1 1 0 0 1 1-1h.132a1 1 0 0 1 1 1v5.163a1 1 0 0 1-1 1zM2.167 20.57v-2.348h20v2.348zm15.786-3.268a1 1 0 0 1-1-1v-5.163a1 1 0 0 1 1-1h.155a1 1 0 0 1 1 1v5.163a1 1 0 0 1-1 1zM2.167 9.212v-2.43l9.992-5.212 10.008 5.21v2.43z"
    />
  </Svg>
);
export default SvgBankMediumIcon;
