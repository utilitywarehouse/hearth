import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBillMobileLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M26.6 5c.5 0 1 .2 1.4.6l9.9 9.9c.3.3.4.7.4 1.1 0 .4-.2.8-.4 1.1-.2.3-.7.3-1.1.3H30c-2.2 0-4-1.8-4-4v-3c0-.6.4-1 1-1s1 .4 1 1v3c0 1.1.9 2 2 2h5.6l-9-9H13c-1.1 0-2 .9-2 2v30c0 1.1.9 2 2 2h22c1.1 0 2-.9 2-2V22c0-.6.4-1 1-1s1 .4 1 1v17c0 2.2-1.8 4-4 4H13c-2.2 0-4-1.8-4-4V9c0-2.2 1.8-4 4-4h13.6ZM33 20c1.1 0 2 .9 2 2v15c0 1.1-.9 2-2 2h-9c-1.1 0-2-.9-2-2V22c0-1.1.9-2 2-2h9Zm0 2h-9v15h9V22Zm-4.1 12.1c.1 0 .2.1.3.2.1.1.2.2.2.3 0 .1.1.2.1.4 0 .3-.1.5-.3.7-.2.2-.4.3-.7.3-.1 0-.3 0-.4-.1-.1 0-.2-.1-.3-.2-.2-.2-.3-.4-.3-.7 0-.1 0-.3.1-.4.1-.1.1-.2.2-.3.3-.3.7-.4 1.1-.2ZM30 23c.6 0 1 .4 1 1s-.4 1-1 1h-3c-.6 0-1-.4-1-1s.4-1 1-1h3Z"
    />
  </Svg>
);
export default SvgBillMobileLargeIcon;
