import { forwardRef } from 'react';
import { IconProps } from './types';
export const FacebookMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} fillRule="evenodd" d="M10.045 21h3.622v-8.044h2.675l.535-3.25h-3.21V7.249c0-.912.905-1.427 1.77-1.427H17V3.128l-2.798-.12c-2.675-.158-4.157 1.863-4.157 4.28v2.418H7v3.25h3.045z" clipRule="evenodd" /></svg>;
});
FacebookMediumIcon.displayName = "FacebookMediumIcon";