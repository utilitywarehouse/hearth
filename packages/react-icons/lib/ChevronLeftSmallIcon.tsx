import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronLeftSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M13.493 2 15 3.42 8.015 10 15 16.58 13.493 18 5 10z" /></svg>;
});
ChevronLeftSmallIcon.displayName = "ChevronLeftSmallIcon";