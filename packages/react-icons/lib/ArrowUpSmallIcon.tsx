import { forwardRef } from 'react';
import { IconProps } from './types';
export const ArrowUpSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M8.896 17.067V7.17l-4.408 4.407L2.933 10 10 2.933 17.067 10l-1.555 1.576-4.408-4.407v9.898z" /></svg>;
});
ArrowUpSmallIcon.displayName = "ArrowUpSmallIcon";