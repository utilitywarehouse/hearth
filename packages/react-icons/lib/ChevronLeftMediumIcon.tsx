import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronLeftMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m16.113 2 1.774 1.775L9.664 12l8.224 8.225L16.113 22l-10-10z" /></svg>;
});
ChevronLeftMediumIcon.displayName = "ChevronLeftMediumIcon";