import { forwardRef } from 'react';
import { IconProps } from './types';
export const TickSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M7.898 15 3 10.438l1.609-1.527 3.29 3.079L15.39 5 17 6.505z" /></svg>;
});
TickSmallIcon.displayName = "TickSmallIcon";