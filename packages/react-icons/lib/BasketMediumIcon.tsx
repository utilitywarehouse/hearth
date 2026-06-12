import { forwardRef } from 'react';
import { IconProps } from './types';
export const BasketMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m4.47 21.333-3.35-12h6.075l5.224-7.775 5.226 7.775h6.125l-3.35 12zm7.975-4q.824 0 1.412-.587.588-.588.588-1.413 0-.824-.588-1.412a1.93 1.93 0 0 0-1.412-.588q-.825 0-1.413.588a1.93 1.93 0 0 0-.588 1.412q0 .825.588 1.413.588.587 1.412.587m-2.825-8h5.625l-2.825-4.2z" /></svg>;
});
BasketMediumIcon.displayName = "BasketMediumIcon";