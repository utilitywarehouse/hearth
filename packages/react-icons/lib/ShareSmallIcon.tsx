import { forwardRef } from 'react';
import { IconProps } from './types';
export const ShareSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M13.5 18a2.4 2.4 0 0 1-1.77-.73A2.4 2.4 0 0 1 11 15.5q0-.187.083-.604l-4.937-3.021a2.6 2.6 0 0 1-.751.458 2.4 2.4 0 0 1-.895.167 2.4 2.4 0 0 1-1.77-.73A2.4 2.4 0 0 1 2 10q0-1.042.73-1.77A2.4 2.4 0 0 1 4.5 7.5q.48 0 .896.167.417.166.75.458l4.937-3.02A2.2 2.2 0 0 1 11 4.5q0-1.043.73-1.772A2.4 2.4 0 0 1 13.5 2a2.4 2.4 0 0 1 1.77.73q.73.728.73 1.77t-.73 1.77A2.4 2.4 0 0 1 13.5 7a2.4 2.4 0 0 1-.896-.167 2.6 2.6 0 0 1-.75-.458l-4.937 3.02q.04.147.062.289Q7 9.825 7 10a2.2 2.2 0 0 1-.083.604l4.937 3.021q.333-.291.751-.458T13.5 13q1.042 0 1.77.73.73.728.73 1.77t-.73 1.77a2.4 2.4 0 0 1-1.77.73" /></svg>;
});
ShareSmallIcon.displayName = "ShareSmallIcon";