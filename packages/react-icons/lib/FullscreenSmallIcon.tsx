import { forwardRef } from 'react';
import { IconProps } from './types';
export const FullscreenSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M2.6 17.4v-6.54h2.042v3.048l9.266-9.266h-3.049V2.6h6.542v6.542h-2.042v-3.05L6.093 15.36h3.049v2.042z" /></svg>;
});
FullscreenSmallIcon.displayName = "FullscreenSmallIcon";