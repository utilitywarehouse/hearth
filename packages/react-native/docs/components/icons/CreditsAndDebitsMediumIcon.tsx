import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgCreditsAndDebitsMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M19.736 4H4.264C3.01 4 2 5.05 2 6.328V8.6c0 .628.39 1.141 1 1.141s1-.513 1-1.14V6h16v11.954H4v-4.197h10.386l-.988 1.016a1.16 1.16 0 0 0 0 1.61c.222.228.5.33.789.33.288 0 .566-.114.788-.33l2.719-2.797c.233-.228.322-.491.322-.844s-.078-.685-.322-.925l-2.72-2.796a1.084 1.084 0 0 0-1.565 0 1.16 1.16 0 0 0 0 1.61l.833.855H4.42c-1.255 0-2.42.993-2.42 2.271v3.858C2 18.905 3.176 20 4.42 20h15.316C20.99 20 22 18.95 22 17.672V6.328C22 5.038 20.979 4 19.736 4Z"
    />
  </Svg>
);
export default SvgCreditsAndDebitsMediumIcon;
