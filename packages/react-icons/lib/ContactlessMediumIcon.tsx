import { forwardRef } from 'react';
import { IconProps } from './types';
export const ContactlessMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M8.4 14.65q.224-.6.362-1.263T8.9 12t-.138-1.387A8.5 8.5 0 0 0 8.4 9.35l-1.85.75q.15.45.25.925t.1.975-.1.975-.25.925zM11.6 16a8.7 8.7 0 0 0 .613-1.95A11 11 0 0 0 12.4 12q0-1.05-.187-2.05A8.7 8.7 0 0 0 11.6 8l-1.85.75q.35.75.5 1.563T10.4 12a9.3 9.3 0 0 1-.15 1.688 6.5 6.5 0 0 1-.5 1.562zm3.25 1.35q.525-1.25.787-2.588.263-1.337.263-2.762 0-1.424-.263-2.762a13.3 13.3 0 0 0-.787-2.588l-1.85.8q.45 1.05.675 2.2T13.9 12t-.225 2.35-.675 2.2zM12 22a9.7 9.7 0 0 1-3.9-.788 10.1 10.1 0 0 1-3.175-2.137q-1.35-1.35-2.137-3.175A9.7 9.7 0 0 1 2 12q0-2.075.788-3.9a10.1 10.1 0 0 1 2.137-3.175q1.35-1.35 3.175-2.137A9.7 9.7 0 0 1 12 2q2.075 0 3.9.788a10.1 10.1 0 0 1 3.175 2.137q1.35 1.35 2.137 3.175A9.7 9.7 0 0 1 22 12a9.7 9.7 0 0 1-.788 3.9 10.1 10.1 0 0 1-2.137 3.175q-1.35 1.35-3.175 2.137A9.7 9.7 0 0 1 12 22" /></svg>;
});
ContactlessMediumIcon.displayName = "ContactlessMediumIcon";