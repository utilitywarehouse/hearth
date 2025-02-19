import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgTickLargeContainedIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M13.389 7.049a19.999 19.999 0 0 1 25.309 3.387c.316.343.353.853.102 1.235l-.075.1-15.97 18.79c-.354.417-.968.47-1.387.143l-.093-.082-8.056-8.056a1.007 1.007 0 0 1 1.33-1.508l.094.084 7.283 7.282 14.672-17.26-.19-.185a17.986 17.986 0 0 0-21.621-2.425l-.33.202a17.985 17.985 0 0 0 12.897 32.913A17.985 17.985 0 0 0 41.986 23.97 1.007 1.007 0 1 1 44 23.967a19.999 19.999 0 0 1-16.27 19.68A19.999 19.999 0 0 1 13.389 7.05Z"
    />
  </Svg>
);
export default SvgTickLargeContainedIcon;
