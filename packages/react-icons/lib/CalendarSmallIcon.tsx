import { forwardRef } from 'react';
import { IconProps } from './types';
export const CalendarSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M9.156 12.095v-1.689h1.689v1.689zm-3.25 0v-1.689h1.689v1.689zm6.5 0v-1.689h1.689v1.689zm-3.25 3v-1.689h1.689v1.689zm-3.25 0v-1.689h1.689v1.689zm6.5 0v-1.689h1.689v1.689zM2.6 18.4V3.6h3.403v-2H7.77v2h4.459v-2h1.768v2H17.4v14.8zm2.042-2.042h10.717V9H4.642z" /></svg>;
});
CalendarSmallIcon.displayName = "CalendarSmallIcon";