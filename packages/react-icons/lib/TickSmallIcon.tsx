import { forwardRef } from 'react';
import { IconProps } from './types';
export const TickSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M7.595 15.5 2 10.286l1.399-1.304 4.196 3.91L16.601 4.5 18 5.804z" /></svg>;
});
TickSmallIcon.displayName = "TickSmallIcon";