import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronUpMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m22 16.113-1.775 1.774L12 9.664l-8.225 8.224L2 16.113l10-10z" /></svg>;
});
ChevronUpMediumIcon.displayName = "ChevronUpMediumIcon";