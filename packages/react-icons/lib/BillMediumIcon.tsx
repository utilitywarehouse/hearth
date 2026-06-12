import { forwardRef } from 'react';
import { IconProps } from './types';
export const BillMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} fillRule="evenodd" d="M3 2h18v20l-2.25-1.8L16.5 22l-2.25-1.8L12 22l-2.25-1.8L7.5 22l-2.25-1.8L3 22zm13 13a1 1 0 1 1 2 0 1 1 0 0 1-2 0m1-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-1-3a1 1 0 1 1 2 0 1 1 0 0 1-2 0m-9 7a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2zm-1-3a1 1 0 0 1 1-1h6a1 1 0 1 1 0 2H7a1 1 0 0 1-1-1m1-5a1 1 0 0 0 0 2h6a1 1 0 1 0 0-2z" clipRule="evenodd" /></svg>;
});
BillMediumIcon.displayName = "BillMediumIcon";