import { forwardRef } from 'react';
import { IconProps } from './types';
export const TorchOffMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M8.7 21.7V10.5L2.1 3.9l1.4-1.4 18.4 18.4-1.4 1.4-3.8-3.8v3.2zm-2-18.85V1.7h12v3H8.55zm10 10L10.55 6.7h8.15v1l-2 3z" /></svg>;
});
TorchOffMediumIcon.displayName = "TorchOffMediumIcon";