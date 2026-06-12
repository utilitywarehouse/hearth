import { forwardRef } from 'react';
import { IconProps } from './types';
export const UnlockMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M4 22.5v-14h11v-2q0-1.25-.875-2.125A2.9 2.9 0 0 0 12 3.5q-1.25 0-2.125.875A2.9 2.9 0 0 0 9 6.5H7q0-2.075 1.463-3.537Q9.926 1.5 12 1.5q2.075 0 3.537 1.463Q17 4.425 17 6.5v2h3v14zm8-5q.825 0 1.412-.587Q14 16.325 14 15.5t-.588-1.412A1.93 1.93 0 0 0 12 13.5q-.825 0-1.412.588A1.93 1.93 0 0 0 10 15.5q0 .824.588 1.413.587.587 1.412.587" /></svg>;
});
UnlockMediumIcon.displayName = "UnlockMediumIcon";