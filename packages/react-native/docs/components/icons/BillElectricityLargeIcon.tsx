import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBillElectricityLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M26.6 5c.5 0 1 .2 1.4.6l9.9 9.9c.3.3.4.7.4 1.1 0 .4-.2.8-.4 1.1-.2.3-.7.3-1.1.3H30c-2.2 0-4-1.8-4-4v-3c0-.6.4-1 1-1s1 .4 1 1v3c0 1.1.9 2 2 2h5.6l-9-9H13c-1.1 0-2 .9-2 2v30c0 1.1.9 2 2 2h22c1.1 0 2-.9 2-2V22c0-.6.4-1 1-1s1 .4 1 1v17c0 2.2-1.8 4-4 4H13c-2.2 0-4-1.8-4-4V9c0-2.2 1.8-4 4-4h13.6Zm.1 18.1c.5.2.8.8.6 1.3l-2.7 7h1.7c.3 0 .7.2.8.5.2.3.2.6.1 1l-1 2.2 5.8-5h-2.2c-.4 0-.7-.2-.9-.5-.2-.3-.2-.7 0-1l2.3-3.4H29c-.6 0-1-.4-1-1s.4-1 1-1h4.1c.4 0 .7.2.9.5.2.3.2.7 0 1L31.6 28h3.1c.4 0 .8.3.9.7.1.4 0 .8-.3 1.1L24 39.4c-.2.2-.4.2-.7.2-.2 0-.4-.1-.6-.2-.4-.3-.5-.8-.3-1.2l2.3-4.9h-1.6c-.3 0-.6-.2-.8-.4-.2-.2-.3-.6-.1-.9l3.2-8.3c.2-.5.8-.8 1.3-.6Z"
    />
  </Svg>
);
export default SvgBillElectricityLargeIcon;
