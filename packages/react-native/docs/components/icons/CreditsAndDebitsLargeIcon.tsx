import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCreditsAndDebitsLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M40.431 10H7.57C5.602 10 4 11.468 4 13.26v4.315c0 .557.497 1.012 1.105 1.012s1.105-.455 1.105-1.012V13.26c0-.679.608-1.236 1.36-1.236h32.86c.751 0 1.36.557 1.36 1.236v21.478c0 .689-.609 1.246-1.36 1.246H7.89c-.752 0-1.36-.557-1.36-1.246v-7.301c0-.678.608-1.235 1.36-1.235H32.1l-4.233 3.878a.95.95 0 0 0 0 1.428c.221.202.498.293.785.293.287 0 .564-.1.785-.293l5.779-5.296a.945.945 0 0 0 .298-.851.946.946 0 0 0-.298-.901l-5.78-5.296a1.172 1.172 0 0 0-1.557 0 .95.95 0 0 0 0 1.427l3.9 3.575H7.89c-1.966 0-3.568 1.468-3.568 3.26v7.302C4.32 36.532 5.923 38 7.89 38h32.54c1.967 0 3.57-1.468 3.57-3.27V13.26c0-1.802-1.603-3.26-3.57-3.26Z"
    />
  </Svg>
);
export default SvgCreditsAndDebitsLargeIcon;
