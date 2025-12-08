import { forwardRef } from 'react';
import { IconProps } from './types';
export const RefundSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M10 11.667q-.687 0-1.177-.49A1.6 1.6 0 0 1 8.333 10q0-.687.49-1.177T10 8.333t1.177.49.49 1.177-.49 1.177-1.177.49m0 5.833q-2.895 0-5.02-1.906-2.126-1.907-2.438-4.76H4.25Q4.542 13 6.177 14.416 7.813 15.833 10 15.833q2.438 0 4.135-1.698 1.698-1.697 1.698-4.135t-1.698-4.135T10 4.167q-1.437 0-2.687.666a6.2 6.2 0 0 0-2.105 1.834H7.5v1.666h-5v-5h1.667v1.959A7.3 7.3 0 0 1 6.76 3.229Q8.291 2.5 10 2.5q1.563 0 2.927.594 1.365.593 2.375 1.604a7.6 7.6 0 0 1 1.604 2.375Q17.5 8.437 17.5 10a7.3 7.3 0 0 1-.594 2.927 7.6 7.6 0 0 1-1.604 2.375 7.6 7.6 0 0 1-2.375 1.604A7.3 7.3 0 0 1 10 17.5" /></svg>;
});
RefundSmallIcon.displayName = "RefundSmallIcon";