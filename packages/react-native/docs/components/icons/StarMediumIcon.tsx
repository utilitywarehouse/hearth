import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgStarMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M10.975 3.665c.401-.886 1.657-.887 2.06-.002L15.17 8.36l4.851.671c.937.13 1.311 1.285.628 1.94l-3.71 3.56 1.116 5.09c.215.98-.853 1.735-1.703 1.204l-4.348-2.714-4.343 2.713c-.853.533-1.925-.231-1.7-1.214l1.158-5.075-3.764-3.56c-.69-.653-.319-1.816.623-1.946l4.872-.67 2.124-4.694Zm1.032 2.206-1.635 3.614a1.13 1.13 0 0 1-.876.655l-3.78.52 2.972 2.811c.291.276.415.685.326 1.076l-.866 3.79 3.258-2.035a1.13 1.13 0 0 1 1.197 0l3.282 2.049-.837-3.817a1.134 1.134 0 0 1 .322-1.061l2.93-2.81-3.773-.523a1.132 1.132 0 0 1-.875-.653l-1.645-3.616Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgStarMediumIcon;
