import { forwardRef } from 'react';
import { IconProps } from './types';
export const LinkSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M8.824 14.4H6q-1.826 0-3.113-1.287Q1.6 11.823 1.6 9.997q0-1.828 1.287-3.113T6 5.6h2.824v2.042H6.005q-.984 0-1.674.688a2.27 2.27 0 0 0-.69 1.67q0 .984.69 1.671t1.674.688h2.819zM6.73 10.846v-1.69h6.541v1.689zm4.447 3.556V12.36h2.818q.985 0 1.675-.688t.69-1.67q0-.984-.69-1.671a2.28 2.28 0 0 0-1.675-.688h-2.818V5.6H14q1.827 0 3.114 1.288 1.287 1.29 1.287 3.116 0 1.828-1.287 3.112T14 14.401z" /></svg>;
});
LinkSmallIcon.displayName = "LinkSmallIcon";