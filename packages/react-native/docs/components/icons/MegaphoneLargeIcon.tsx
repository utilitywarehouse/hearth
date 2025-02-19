import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgMegaphoneLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M43 7.5c-.6 0-1 .402-1 1.006v1.207L6 19.271v-.704c0-.604-.4-1.006-1-1.006s-1 .402-1 1.006v10.061c0 .604.4 1.006 1 1.006s1-.402 1-1.006v-.704l15.8 4.225c.5.101 1.1-.2 1.2-.704.1-.503-.2-1.107-.7-1.207L6 25.81v-4.527l36-9.558v23.542l-14.8-3.823c-.5-.1-1.1.201-1.2.704v1.308c0 2.817-2.2 5.03-5 5.03s-5-2.213-5-5.03c0-.603-.4-1.006-1-1.006s-1 .403-1 1.006c0 3.924 3.1 7.043 7 7.043 3.8 0 6.8-3.018 7-6.74l14 3.621v1.308c0 .604.4 1.006 1 1.006s1-.402 1-1.006V8.506c0-.604-.4-1.006-1-1.006Z"
    />
  </Svg>
);
export default SvgMegaphoneLargeIcon;
