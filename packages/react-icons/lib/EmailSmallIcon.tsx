import { forwardRef } from 'react';
import { IconProps } from './types';
export const EmailSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M2 16V4h16v12zm7.751-5.143a.5.5 0 0 0 .498 0l5.865-3.365a.768.768 0 0 0-.764-1.332l-5.101 2.926a.5.5 0 0 1-.498 0l-5.1-2.926a.768.768 0 0 0-.765 1.332z" /></svg>;
});
EmailSmallIcon.displayName = "EmailSmallIcon";