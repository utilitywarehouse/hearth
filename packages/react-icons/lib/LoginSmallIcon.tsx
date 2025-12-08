import { forwardRef } from 'react';
import { IconProps } from './types';
export const LoginSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m13.75 10-4.687 4.688-1.36-1.313 2.438-2.437H2.5V9.062h7.64L7.704 6.626l1.36-1.312zm3.75 7.5h-4.687v-1.875h2.812V4.375h-2.812V2.5H17.5z" /></svg>;
});
LoginSmallIcon.displayName = "LoginSmallIcon";