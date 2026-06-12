import { forwardRef } from 'react';
import { IconProps } from './types';
export const InsightsSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M2.26 15.4 1 14.14l6.66-6.705 3.6 3.6L15.94 6.4H13.6V4.6H19V10h-1.8V7.66l-5.94 5.94-3.6-3.6z" /></svg>;
});
InsightsSmallIcon.displayName = "InsightsSmallIcon";