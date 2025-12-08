import { forwardRef } from 'react';
import { IconProps } from './types';
export const LinkSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M9.1 14.5H5.5q-1.867 0-3.184-1.316Q1 11.867 1 10t1.316-3.184T5.5 5.5h3.6v1.8H5.5q-1.125 0-1.912.788A2.6 2.6 0 0 0 2.8 10q0 1.125.788 1.912A2.6 2.6 0 0 0 5.5 12.7h3.6zm-2.7-3.6V9.1h7.2v1.8zm4.5 3.6v-1.8h3.6q1.125 0 1.913-.787A2.6 2.6 0 0 0 17.2 10q0-1.125-.787-1.912A2.6 2.6 0 0 0 14.5 7.3h-3.6V5.5h3.6q1.867 0 3.184 1.316Q19 8.133 19 10t-1.316 3.184Q16.367 14.5 14.5 14.5z" /></svg>;
});
LinkSmallIcon.displayName = "LinkSmallIcon";