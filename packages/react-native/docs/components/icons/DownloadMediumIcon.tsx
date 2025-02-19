import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgDownloadMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M1 10.718C1.108 9.352 2.363 8.3 3.931 8.3h2.932c.539.039.96.57.94 1.1-.028.53-.519 1.002-1.048 1.002H3.824c-.422 0-.726.236-.736.521v9.55c0 .345.363.423.834.423h16.235c.421 0 .725-.186.735-.52v-9.551c-.059-.285-.421-.423-.833-.423h-2.931c-.638-.059-.961-.658-.942-1.16.02-.55.52-.942 1.05-.942h3.038C21.745 8.409 23 9.46 23 10.924v9.659C22.892 21.949 21.637 23 20.069 23H3.725C2.255 22.892 1 21.84 1 20.377v-9.66Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="m18.059 14.226-5.343 5.355c-.422.422-.941.422-1.363.108L6.01 14.334a1.017 1.017 0 0 1 0-1.474c.421-.423.941-.423 1.363-.108l4.607 4.618 2.726-2.732h-1.677c-1.156 0-1.99-.835-2.098-1.994V2.05c0-.628.422-1.051 1.05-1.051.519 0 .94.423 1.048.943v10.602h4.187c.94 0 1.362 1.052.833 1.68h.01Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgDownloadMediumIcon;
