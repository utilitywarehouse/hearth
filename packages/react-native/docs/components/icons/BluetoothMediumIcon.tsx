import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBluetoothMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M10.993 3.017c0-.9 1-1.3 1.599-.8l5.098 5.099c.4.4.4.9.1 1.3l-3.399 3.399 3.3 3.298c.4.4.4.9.1 1.3l-5.099 5.098c-.6.6-1.6.2-1.7-.6v-5.698l-3.298 3.3c-.4.4-1.06.339-1.4 0-.314-.315-.4-.9-.1-1.3l4.799-4.799v-1.2L6.294 6.617c-.4-.3-.384-1.01 0-1.4a.98.98 0 0 1 1.3-.1l3.399 3.4v-5.5Zm1.999 10.397v5.198l2.599-2.599-2.6-2.599Zm0-7.997v5.098l2.599-2.5-2.6-2.598Z"
    />
  </Svg>
);
export default SvgBluetoothMediumIcon;
