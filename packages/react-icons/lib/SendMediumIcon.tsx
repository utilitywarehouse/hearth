import { forwardRef } from 'react';
import { IconProps } from './types';
export const SendMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M13.314 21.749 9.07 17.506l4.243-7.07-7.071 4.242L2 10.435l19.092-7.778z" /></svg>;
});
SendMediumIcon.displayName = "SendMediumIcon";