import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgStarSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M7.303 2.452a.769.769 0 0 1 1.4-.001l1.418 3.113 3.214.445a.77.77 0 0 1 .427 1.318l-2.456 2.355.742 3.38a.77.77 0 0 1-1.158.819l-2.886-1.8-2.884 1.8a.77.77 0 0 1-1.157-.825l.77-3.37L2.242 7.33a.77.77 0 0 1 .423-1.322l3.23-.444 1.408-3.112Zm.702 1.741L6.997 6.421a.77.77 0 0 1-.596.445l-2.334.32L5.91 8.93a.77.77 0 0 1 .221.73l-.53 2.32 1.996-1.245a.768.768 0 0 1 .813 0l2.013 1.255-.513-2.34a.77.77 0 0 1 .22-.721l1.815-1.742-2.33-.323a.77.77 0 0 1-.595-.443L8.005 4.193Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgStarSmallIcon;
