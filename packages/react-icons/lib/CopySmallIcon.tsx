import { forwardRef } from 'react';
import { IconProps } from './types';
export const CopySmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M6.03 15.4V1H17.5v14.4zM2.5 19V4.6h1.765v12.6h9.706V19z" /></svg>;
});
CopySmallIcon.displayName = "CopySmallIcon";