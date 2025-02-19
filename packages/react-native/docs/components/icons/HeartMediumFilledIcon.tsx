import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgHeartMediumFilledIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M20.966 9.111c-.13-1.164-.529-2.097-1.123-2.814a4.76 4.76 0 0 0-2.077-1.433c-1.448-.525-3.011-.405-3.871-.12-.828.275-1.486.84-1.93 1.314-.42-.482-1.042-1.042-1.86-1.314-.86-.285-2.422-.405-3.871.12-.744.27-1.486.72-2.077 1.433-.594.717-.993 1.65-1.122 2.814-.289 2.586 1.268 4.864 3.017 6.551 1.781 1.719 3.974 3.038 5.453 3.736.108.05.221.08.334.09a.988.988 0 0 0 .57-.083c1.477-.697 3.69-2.016 5.492-3.735 1.768-1.686 3.354-3.967 3.065-6.559Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgHeartMediumFilledIcon;
