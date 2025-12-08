import { forwardRef } from 'react';
import { IconProps } from './types';
export const LogoutSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m6.25 10 4.688-4.687 1.359 1.312-2.438 2.438H17.5v1.874H9.86l2.437 2.438-1.36 1.313zM2.5 2.5h4.688v1.875H4.374v11.25h2.813V17.5H2.5z" /></svg>;
});
LogoutSmallIcon.displayName = "LogoutSmallIcon";