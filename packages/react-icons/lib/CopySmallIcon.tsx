import { forwardRef } from 'react';
import { IconProps } from './types';
export const CopySmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M5.62 15.38V1.579h11.801v13.8zm-3.54 3.54V5.12h2.04v11.76h9.76v2.041z" /></svg>;
});
CopySmallIcon.displayName = "CopySmallIcon";