import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgConfettiMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="m1.625 22.063 5-14 9 9zM14.7 12.088a.743.743 0 0 1-1.05-1.05l6.646-6.647a.5.5 0 0 1 .708 0l1.646 1.646a.742.742 0 1 1-1.05 1.05l-.596-.596a.5.5 0 0 0-.708 0zm-4-4a.742.742 0 1 1-1.05-1.05l.571-.572a.5.5 0 0 0 0-.707L9.6 5.137a.742.742 0 1 1 1.05-1.05l1.671 1.672a.5.5 0 0 1 0 .707zm2 2a.743.743 0 0 1-1.05-1.05l3.596-3.597a.5.5 0 0 0 0-.707L13.65 3.138a.743.743 0 0 1 1.05-1.05l2.646 2.646a.5.5 0 0 1 0 .707zm4 4a.743.743 0 0 1-1.05-1.05l2.646-2.647a.5.5 0 0 1 .708 0l2.646 2.646a.742.742 0 1 1-1.05 1.05l-1.596-1.596a.5.5 0 0 0-.708 0z"
    />
  </Svg>
);
export default SvgConfettiMediumIcon;
