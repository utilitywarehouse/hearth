import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgPdfMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M20.936 14a1 1 0 0 1 .117 1.993l-.117.007H18v1h3a1 1 0 0 1 .117 1.993L21 19h-3v2a1 1 0 0 1-.883.993L17 22a1 1 0 0 1-.993-.883L16 21v-6a1 1 0 0 1 .883-.993L17 14h3.936ZM12 14a4 4 0 0 1 0 8h-2a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h2Zm-6 0a3 3 0 1 1 0 6 1 1 0 0 1-.117-1.993L6 18a1 1 0 0 0 .117-1.993L6 16H4v5a1 1 0 0 1-1.993.117L2 21v-6a1 1 0 0 1 .883-.993L3 14h3Zm6 2h-1v4h1a2 2 0 1 0 0-4Zm6-14a2 2 0 0 1 1.995 1.85L20 4v8.012a1 1 0 0 1-1.993.116L18 12.012V4H7v8.012a1 1 0 0 1-1.993.116L5 12.012V4a2 2 0 0 1 1.85-1.995L7 2h11Zm-6 9a1 1 0 0 1 .117 1.993L12 13H9a1 1 0 0 1-.117-1.993L9 11h3Zm4-3a1 1 0 0 1 .117 1.993L16 10H9a1 1 0 0 1-.117-1.993L9 8h7Zm0-3a1 1 0 0 1 .117 1.993L16 7H9a1 1 0 0 1-.117-1.993L9 5h7Z"
    />
  </Svg>
);
export default SvgPdfMediumIcon;
