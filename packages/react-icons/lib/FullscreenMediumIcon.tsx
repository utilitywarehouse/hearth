import { forwardRef } from 'react';
import { IconProps } from './types';
export const FullscreenMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M2.797 21.203v-8.275h2.275v4.403L17.33 5.07h-4.403V2.798h8.275v8.275h-2.275V6.669L6.67 18.929h4.403v2.274z" /></svg>;
});
FullscreenMediumIcon.displayName = "FullscreenMediumIcon";