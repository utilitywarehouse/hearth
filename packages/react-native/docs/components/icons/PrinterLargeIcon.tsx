import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgPrinterLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M33 42H15c-1.1 0-2-.9-2-2V27c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v1c0 .6-.4 1-1 1s-1-.4-1-1v-1H15v13h18v-8c0-.6.4-1 1-1h6V17H18c-.6 0-1-.4-1-1s.4-1 1-1h15V8H15v8c0 .6-.4 1-1 1H8v14h2c.6 0 1 .4 1 1s-.4 1-1 1H8c-1.1 0-2-.9-2-2V17c0-1.1.9-2 2-2h5V8c0-1.1.9-2 2-2h18c1.1 0 2 .9 2 2v7h5c1.1 0 2 .9 2 2v14c0 1.1-.9 2-2 2h-5v7c0 1.1-.9 2-2 2Zm-9-7h-6c-.6 0-1-.4-1-1s.4-1 1-1h6c.6 0 1 .4 1 1s-.5 1-1 1Zm6-4H18c-.6 0-1-.4-1-1s.4-1 1-1h12c.6 0 1 .4 1 1s-.5 1-1 1Zm-16-9h-2c-.6 0-1-.4-1-1s.4-1 1-1h2c.6 0 1 .4 1 1s-.5 1-1 1Z"
    />
  </Svg>
);
export default SvgPrinterLargeIcon;
