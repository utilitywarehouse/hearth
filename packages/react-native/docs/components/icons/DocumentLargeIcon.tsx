import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgDocumentLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M26.6 5c.5 0 1 .2 1.4.6l9.9 9.9c.3.3.4.7.4 1.1 0 .4-.2.8-.4 1.1-.2.3-.7.3-1.1.3H30c-2.2 0-4-1.8-4-4v-3c0-.6.4-1 1-1s1 .4 1 1v3c0 1.1.9 2 2 2h5.6l-9-9H13c-1.1 0-2 .9-2 2v30c0 1.1.9 2 2 2h22c1.1 0 2-.9 2-2V22c0-.6.4-1 1-1s1 .4 1 1v17c0 2.2-1.8 4-4 4H13c-2.2 0-4-1.8-4-4V9c0-2.2 1.8-4 4-4h13.6ZM33 35c.6 0 1 .4 1 1s-.4 1-1 1H21c-.6 0-1-.4-1-1s.4-1 1-1h12Zm0-4c.6 0 1 .4 1 1s-.4 1-1 1H21c-.6 0-1-.4-1-1s.4-1 1-1h12Zm0-4c.6 0 1 .4 1 1s-.4 1-1 1H21c-.6 0-1-.4-1-1s.4-1 1-1h12Z"
    />
  </Svg>
);
export default SvgDocumentLargeIcon;
