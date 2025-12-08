import { forwardRef } from 'react';
import { IconProps } from './types';
export const PaymentMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M10.988 19.146H2V3h20v9.5l-2.047-1.798-4.918 4.867-2.607-2.619-3.852 3.801zM15.035 21l-4.257-4.249 1.65-1.615 2.607 2.62 5.26-5.223 1.635 1.623zM4.444 7.319v3.383H19.54V7.32z" /></svg>;
});
PaymentMediumIcon.displayName = "PaymentMediumIcon";