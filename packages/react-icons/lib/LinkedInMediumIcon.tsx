import { forwardRef } from 'react';
import { IconProps } from './types';
export const LinkedInMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M16.53 8.68c3.775 0 4.47 2.488 4.47 5.718v6.601L17.272 21v-5.996c-.005-1.37-.095-3.037-1.94-3.037-1.94 0-2.238 1.515-2.238 3.082v5.95H9.367V8.982h3.58v1.639h.052c.497-.944 1.715-1.94 3.53-1.94m-9.501.303V21H3.297V8.983zM5.162 3c1.192 0 2.16.968 2.161 2.162s-.968 2.181-2.161 2.181S3 6.355 3 5.162 3.968 3 5.162 3" /></svg>;
});
LinkedInMediumIcon.displayName = "LinkedInMediumIcon";