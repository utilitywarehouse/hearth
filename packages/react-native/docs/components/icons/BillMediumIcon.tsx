import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgBillMediumIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={24} height={24} fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill={color}
      d="M18 2c2 0 3 1.5 3 3v12c0 .5-.487 1-1 1s-1-.5-1-1V5c0-.5-.617-1.007-1-1H6c-.5 0-1.007.617-1 1v14.404l2.722-1.311a1 1 0 0 1 .637.002l3.643 1.79 3.68-1.791a.99.99 0 0 1 .636 0l4.121 2.008.102.057a1 1 0 0 1 .402 1.173l-.045.108-.057.101a1 1 0 0 1-1.173.402l-.108-.045L16 20.155l-3.56 1.743-.123.05a1 1 0 0 1-.638-.001l-.122-.05-3.524-1.742S4.873 21.8 4.436 21.9C4 22 3 22 3 21V5c0-2 1-3 3-3h12Zm-6 12a1 1 0 0 1 1 1c0 .513-.5 1-1 1H8a1 1 0 0 1-1-1c0-.513.5-1 1-1h4Zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-4-4a1 1 0 0 1 1 1c0 .513-.5 1-1 1H8a1 1 0 0 1-1-1c0-.513.5-1 1-1h4Zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-4-4a1 1 0 0 1 1 1c0 .513-.5 1-1 1H8a1 1 0 0 1-1-1c0-.513.5-1 1-1h4Zm4 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Z"
    />
  </Svg>
);
export default SvgBillMediumIcon;
