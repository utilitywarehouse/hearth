import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgLogoutMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M10.68 2c1.297 0 2.295 1.3 2.295 2.8v2.7a1 1 0 0 1-.998 1 1 1 0 0 1-.998-1V4.7c0-.4-.3-.7-.499-.7H4.594c-.4 0-.599.4-.599.8v14.5c0 .4.3.7.5.7h6.085c.2-.1.4-.4.4-.8v-2.8c.099-.5.598-.9 1.097-.9.498.1.898.5.898 1v2.9c-.1 1.4-1.098 2.6-2.495 2.6H4.295C2.998 21.9 2 20.7 2 19.2V4.6C2.1 3.2 3.197 2 4.594 2h6.086Zm5.886 4.2 5.088 5.1c.3.3.599.7 0 1.3l-4.988 5.1c-.4.4-.998.4-1.397 0s-.399-.9-.1-1.3l4.39-4.4-2.594-2.6V11c0 1.1-.997 2-1.995 2H6.988c-.598 0-.997-.4-.997-1 0-.5.499-1 .898-1h8.08V7c0-.86.999-1.4 1.597-.8Z"
    />
  </Svg>
);
export default SvgLogoutMediumIcon;
