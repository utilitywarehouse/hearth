import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronLeftMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M16.141 2 18 3.849l-8.266 8.15L18 20.152 16.141 22 6 12z" /></svg>;
});
ChevronLeftMediumIcon.displayName = "ChevronLeftMediumIcon";