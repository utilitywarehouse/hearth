import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgSkipPreviousMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M18.927 3.375c-.98.741-10.166 7.555-10.166 7.555-1.22.904-.76 1.853-.24 2.244l9.892 7.544c.52.391 1.186.1 1.376-.155.19-.254.473-.84-.238-1.381l-9.05-6.903 8.462-6.315-.043 6.167c0 .652.674.98 1.069.98.395 0 1.011-.328 1.011-.98V4.31c0-1.293-1.092-1.676-2.073-.934ZM4.011 3C3.522 3 3 3.5 3 4v15.953C3 20.736 3.506 21 4.011 21c.506 0 1.011-.395 1.011-1.047V4C5 3.5 4.5 3 4.012 3Z"
    />
  </Svg>
);
export default SvgSkipPreviousMediumIcon;
