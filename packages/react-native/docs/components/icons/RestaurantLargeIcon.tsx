import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgRestaurantLargeIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={48} height={48} fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill={color}
      d="M16.98 44c-.598 0-.997-.4-.997-1V23.3C13.593 22.2 12 19.7 12 17V5c0-.6.398-1 .996-1 .597 0 .996.4.996 1v12c0 2.1 1.294 4 3.286 4.7.398.1.697.5.697.9V43c0 .6-.398 1-.996 1Zm10.954 0c-.598 0-.996-.4-.996-1V5c0-.6.398-1 .996-1h2.19c.399 0 .698.2.897.5C34.307 10.2 36 16.4 36 23v5c0 .6-.398 1-.996 1h-2.987c-.598 0-.996-.4-.996-1s.398-1 .996-1h1.991v-4c0-6-1.494-11.8-4.481-17h-.598v37c0 .6-.398 1-.995 1ZM18.97 20a2.896 2.896 0 0 1-2.888-2.9V5c0-.6.398-1 .996-1 .597 0 .996.4.996 1v12.1c0 .5.398.9.896.9s.896-.4.896-.9V5c0-.6.399-1 .996-1 .598 0 .996.4.996 1v12.1c0 1.6-1.295 2.9-2.888 2.9Z"
    />
  </Svg>
);
export default SvgRestaurantLargeIcon;
