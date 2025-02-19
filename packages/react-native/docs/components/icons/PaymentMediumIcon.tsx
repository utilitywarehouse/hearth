import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgPaymentMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M21 8.8c0-.994-.811-1.8-1.812-1.8H9.463c-.574 0-.906.438-.906.9 0 .497.405.9.906.9h9.725l-.68 5.4H9.463l.225-1.794h6.911c.443 0 .906-.438.906-.9 0-.496-.405-.9-.906-.9H8.89a.934.934 0 0 0-.9.789L7.652 14.2c-.122.9.811 1.8 1.812 1.8h9.046c.798 0 1.69-.723 1.798-1.577l.68-5.4.01-.111L21 8.8ZM5.719 15.1c0-.497-.406-.9-.907-.9h-.906c-.454 0-.906.438-.906.9 0 .497.406.9.906.9h.906c.452 0 .907-.438.907-.9Zm0-4.5c.5 0 .906.403.906.9 0 .462-.455.9-.907.9H4.057a.903.903 0 0 1-.907-.9c0-.462.302-.9.907-.9h1.661Zm1.775-2.7c0-.497-.406-.9-.906-.9l-2.682.006C3.452 7 3 7.438 3 7.9c0 .497.406.9.906.9l2.788-.006c.382.006.8-.432.8-.894Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgPaymentMediumIcon;
