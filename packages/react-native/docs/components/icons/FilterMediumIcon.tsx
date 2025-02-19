import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgFilterMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M9.682 5.032h12.332c.591 0 .986.387.986.968 0 .58-.395.968-.986.968H9.681"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M3.565 6c0 1.645 1.381 3 3.058 3C8.3 9 9.682 7.645 9.682 6S8.3 3 6.623 3C4.946 3 3.565 4.355 3.565 6Zm1.973 0c0-.58.493-1.065 1.085-1.065S7.71 5.42 7.71 6s-.494 1.065-1.086 1.065c-.592 0-1.085-.484-1.085-1.065Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M3.565 6.968H1.987C1.395 6.968 1 6.58 1 6s.395-.968.987-.968h1.578"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M13.332 12.968H1.987C1.395 12.968 1 12.58 1 12s.395-.968.987-.968h11.345"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M13.332 12c0 1.645 1.381 3 3.058 3 1.677 0 3.058-1.355 3.058-3s-1.38-3-3.058-3c-1.677 0-3.058 1.355-3.058 3Zm1.973 0c0-.58.493-1.065 1.085-1.065s1.085.484 1.085 1.065c0 .58-.493 1.065-1.085 1.065S15.305 12.58 15.305 12Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M19.448 11.032h2.565c.592 0 .987.387.987.968 0 .58-.395.968-.987.968h-2.565"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M11.655 17.032h10.359c.591 0 .986.387.986.968 0 .58-.395.968-.986.968h-10.36"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M5.538 18c0 1.645 1.381 3 3.058 3 1.678 0 3.059-1.355 3.059-3s-1.381-3-3.059-3c-1.677 0-3.058 1.355-3.058 3Zm1.973 0c0-.58.493-1.064 1.085-1.064s1.086.483 1.086 1.064c0 .58-.494 1.064-1.086 1.064-.592 0-1.085-.483-1.085-1.064Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="M5.538 18.968H1.987C1.395 18.968 1 18.58 1 18s.395-.968.987-.968h3.551"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgFilterMediumIcon;
