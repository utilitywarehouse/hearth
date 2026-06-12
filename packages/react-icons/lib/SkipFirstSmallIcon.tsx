import { forwardRef } from 'react';
import { IconProps } from './types';
export const SkipFirstSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m10.734 10 5.449 5.45-1.658 1.658L7.417 10l7.108-7.107 1.658 1.658z" /><path fill={color} d="M3.8 3h2.35v14H3.8z" /></svg>;
});
SkipFirstSmallIcon.displayName = "SkipFirstSmallIcon";