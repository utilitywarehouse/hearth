import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronDownMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m2 7.887 1.775-1.775L12 14.338l8.225-8.226L22 7.887l-10 10z" /></svg>;
});
ChevronDownMediumIcon.displayName = "ChevronDownMediumIcon";