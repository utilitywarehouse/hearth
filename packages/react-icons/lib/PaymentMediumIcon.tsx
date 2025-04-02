import { forwardRef } from 'react';
import { IconProps } from './types';
export const PaymentMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M10.988 19.146H4.444q-1.02 0-1.732-.707A2.33 2.33 0 0 1 2 16.72V5.441q0-1.012.712-1.726A2.35 2.35 0 0 1 4.444 3H19.54q1.02 0 1.739.715T22 5.44v5.261h-2.047l-4.918 4.867-2.607-2.619-3.852 3.801zM15.035 21l-4.257-4.249 1.65-1.615 2.607 2.62 5.26-5.223 1.635 1.623zm-8.9-13.681a1.692 1.692 0 1 0 0 3.383H17.85a1.692 1.692 0 0 0 0-3.383z" /></svg>;
});
PaymentMediumIcon.displayName = "PaymentMediumIcon";