import { forwardRef } from 'react';
import { IconProps } from './types';
export const LoginMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M11.853 21v-2.426h6.706V5.441h-6.706V3H21v18zm-2.062-3.816L8.06 15.476l2.256-2.255H3v-2.426h7.285L8.029 8.539l1.73-1.707 5.169 5.191z" /></svg>;
});
LoginMediumIcon.displayName = "LoginMediumIcon";