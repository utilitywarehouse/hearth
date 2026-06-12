import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronUpSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M18 13.493 16.58 15 10 8.015 3.42 15 2 13.493 10 5z" /></svg>;
});
ChevronUpSmallIcon.displayName = "ChevronUpSmallIcon";