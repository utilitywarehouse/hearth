import { forwardRef } from 'react';
import { IconProps } from './types';
export const SkipLastSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M9.349 10 3.9 4.551l1.658-1.658L12.666 10l-7.108 7.108L3.9 15.449z" /><path fill={color} d="M16.283 17h-2.35V3h2.35z" /></svg>;
});
SkipLastSmallIcon.displayName = "SkipLastSmallIcon";