import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCaretUpMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M11.986 6h.01c.66 0 1.28.32 1.66.85l6.164 8.63c.32.44.2 1.04-.25 1.35-.45.3-1.081.19-1.391-.25l-6.163-8.63-5.223 7.11h5.202c.55 0 1.001.43 1.001.97s-.45.97-1 .97H5.151c-.43 0-.83-.23-1.02-.6-.2-.37-.17-.82.08-1.16l6.123-8.4c.38-.52 1-.83 1.66-.83l-.01-.01Z"
    />
  </Svg>
);
export default SvgCaretUpMediumIcon;
