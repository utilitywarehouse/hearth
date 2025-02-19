import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgHomeMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M11.3 2.3c.4-.4.9-.4 1.3-.1l9.1 9.088c.2.2.3.399.3.599v9.087c0 .5-.4.899-.9.999H15c-.5 0-1-.473-1-.899v-5.093c0-1.098-.9-1.983-2-1.983-1 0-2 1.002-2 1.983v4.993c0 .6-.5.999-1 .999s-1-.486-1-.999v-4.993c0-1.98 1.4-3.967 4-3.98 2.6-.014 4 2.2 4 3.98v3.995h4v-7.59l-8-7.989-8 7.989v8.602c0 .499-.5.999-1 .999s-1-.5-1-1.013v-8.987c0-.2 0-.489.2-.7.2-.21 9.1-8.987 9.1-8.987Z"
    />
  </Svg>
);
export default SvgHomeMediumIcon;
