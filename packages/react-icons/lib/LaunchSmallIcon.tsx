import { forwardRef } from 'react';
import { IconProps } from './types';
export const LaunchSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m1.896 8.495 3.5-3.5q.291-.291.687-.416.396-.126.813-.042l1.083.23Q6.854 6.1 6.21 7.182q-.647 1.083-1.25 2.625zm4.27 1.896q.48-1.5 1.303-2.833a13.7 13.7 0 0 1 1.99-2.5 11.9 11.9 0 0 1 4.187-2.74q2.355-.906 4.396-.552.354 2.042-.542 4.396a11.8 11.8 0 0 1-2.73 4.188 14 14 0 0 1-2.5 1.99 12.7 12.7 0 0 1-2.853 1.322zm5.75-2.5q.48.48 1.178.48a1.6 1.6 0 0 0 1.177-.48 1.6 1.6 0 0 0 .479-1.177 1.6 1.6 0 0 0-.48-1.177 1.6 1.6 0 0 0-1.176-.48 1.6 1.6 0 0 0-1.177.48 1.6 1.6 0 0 0-.48 1.177q0 .698.48 1.177m-.583 10.021L10 14.85q1.542-.605 2.635-1.25 1.095-.646 2.428-1.771l.208 1.083q.082.417-.042.823-.125.405-.416.698zM3.23 13.058a2.45 2.45 0 0 1 1.77-.74 2.38 2.38 0 0 1 1.77.719 2.4 2.4 0 0 1 .73 1.77 2.4 2.4 0 0 1-.73 1.772q-.52.52-1.739.895-1.218.375-3.364.667.291-2.145.666-3.354.375-1.208.896-1.73" /></svg>;
});
LaunchSmallIcon.displayName = "LaunchSmallIcon";