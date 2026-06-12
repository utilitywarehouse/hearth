import { forwardRef } from 'react';
import { IconProps } from './types';
export const LandlineMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M8.27 8.59V5.4c.31-.09.61-.18.93-.24.89-.2 1.83-.3 2.79-.3a12.8 12.8 0 0 1 3.72.54v3.19l3.73 2.79 3.55-3.55C20.25 4.86 16.34 3 11.99 3S3.74 4.87 1 7.84l3.55 3.55L8.28 8.6z" /><path fill={color} d="m19.45 13.72-5.59-4.19V6.88a11.6 11.6 0 0 0-3.72 0v2.65l-5.59 4.19-1.86 7.91h18.62zM12 19.05c-1.65 0-3-1.35-3-3s1.35-3 3-3 3 1.35 3 3-1.35 3-3 3" /></svg>;
});
LandlineMediumIcon.displayName = "LandlineMediumIcon";