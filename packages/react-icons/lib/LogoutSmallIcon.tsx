import { forwardRef } from 'react';
import { IconProps } from './types';
export const LogoutSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M2.6 17.4V2.6h7.495v2.042H4.642v10.717h5.453v2.042zm10.747-3.334-1.45-1.428 1.616-1.617H7.906V8.98h5.607l-1.617-1.617 1.451-1.428L17.401 10z" /></svg>;
});
LogoutSmallIcon.displayName = "LogoutSmallIcon";