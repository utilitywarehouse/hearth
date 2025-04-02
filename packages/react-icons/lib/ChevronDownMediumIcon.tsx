import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronDownMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M2 7.859 3.849 6l8.15 8.267L20.152 6 22 7.859 12 18z" /></svg>;
});
ChevronDownMediumIcon.displayName = "ChevronDownMediumIcon";