import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTrashMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M14 2c1 0 2 1.005 2 2.01v2.01h3c.557 0 1 .503 1 1.106L18.1 20.09C18 21.096 17.5 22 16.3 22H7.9c-1.088 0-1.9-.904-2-1.809l-1.5-9.95c0-.603.3-1.105.9-1.206.5-.1 1 .201 1.1.704L7.9 20.09h8.3L18 8.03h-3c-.5 0-.9-.402-1-.904V4.01h-4v3.015c0 .503-.5 1.005-.9 1.005H5c-.6 0-1-.402-1-1.005 0-.502.4-.904.9-1.005H8V4.01C8 3.005 9 2 10 2h4Zm-4 8.04c.5 0 1 .503 1 1.005v5.025c0 .603-.4 1.005-1 1.005-.5 0-1-.502-1-1.005v-5.025c0-.603.4-1.005 1-1.005Zm4 0c.5 0 1 .503 1 1.005v5.025c0 .603-.4 1.005-1 1.005-.5 0-1-.502-1-1.005v-5.025c0-.603.4-1.005 1-1.005Z"
    />
  </Svg>
);
export default SvgTrashMediumIcon;
