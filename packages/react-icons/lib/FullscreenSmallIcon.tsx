import { forwardRef } from 'react';
import { IconProps } from './types';
export const FullscreenSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M2 18v-7.193h1.978v3.827L14.634 3.978h-3.827V2H18v7.193h-1.978V5.366L5.366 16.022h3.827V18z" /></svg>;
});
FullscreenSmallIcon.displayName = "FullscreenSmallIcon";