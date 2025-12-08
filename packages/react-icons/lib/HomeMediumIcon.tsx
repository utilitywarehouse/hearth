import { forwardRef } from 'react';
import { IconProps } from './types';
export const HomeMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M4 21V9l8-6 8 6v12h-6v-5c0-1.1-.9-2-2-2s-2 .9-2 2v5z" /></svg>;
});
HomeMediumIcon.displayName = "HomeMediumIcon";