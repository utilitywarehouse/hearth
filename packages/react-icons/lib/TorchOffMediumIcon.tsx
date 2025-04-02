import { forwardRef } from 'react';
import { IconProps } from './types';
export const TorchOffMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M8.25 22.125v-11.2l-6.6-6.6 1.4-1.4 18.4 18.4-1.4 1.4-3.8-3.8v3.2zm-2-18.85v-1.15h12v3H8.1zm10 10-6.15-6.15h8.15v1l-2 3z" /></svg>;
});
TorchOffMediumIcon.displayName = "TorchOffMediumIcon";