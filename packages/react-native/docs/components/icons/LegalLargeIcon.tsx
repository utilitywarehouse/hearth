import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLegalLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M24 6c1.9 0 3.5 1.3 3.9 3H39c.6 0 1 .4 1 1s-.4 1-1 1h-1.9l5.8 12.6c.1.1.1.3.1.3 0 3.9-3.1 7-7 7s-7-3.1-7-7c0-.6.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1h-6.9c.5 2.3 2.5 4 4.9 4 2.7 0 4.9-2.1 5-4.8l-5-10.8-3.7 8c-.2.5-.8.7-1.3.5-.5-.2-.7-.8-.5-1.3l4.4-9.5H27c-.6 0-1-.4-1-1 0-1.1-.9-2-2-2s-2 .9-2 2 .9 2 2 2c.6 0 1 .4 1 1v27h6c.6 0 1 .4 1 1s-.4 1-1 1H17c-.6 0-1-.4-1-1s.4-1 1-1h6V13.9c-1.7-.5-3-2-3-3.9 0-2.2 1.8-4 4-4Zm-6 3c.6 0 1 .4 1 1s-.4 1-1 1h-4.9l5.8 12.6c.1.1.1.3.1.4 0 3.9-3.1 6.9-7 6.9s-7-3.1-7-7c0-.6.4-1 1-1h8c.6 0 1 .4 1 1s-.4 1-1 1H7.1c.5 2.3 2.5 4 4.9 4 2.7 0 4.9-2.1 5-4.8l-5-10.8-3.7 8c-.2.5-.8.7-1.3.5-.5-.2-.7-.8-.5-1.3l4.4-9.5H9c-.6 0-1-.4-1-1s.4-1 1-1h9Z"
    />
  </Svg>
);
export default SvgLegalLargeIcon;
