import { forwardRef } from 'react';
import { IconProps } from './types';
export const TopUpMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M5 21H3V3h18v10h-2V5H5v14h8v2zm14 2-1.4-1.4 1.575-1.6H15v-2h4.175L17.6 16.4 19 15l4 4zm-8-6h2v-4h4v-2h-4V7h-2v4H7v2h4z" /></svg>;
});
TopUpMediumIcon.displayName = "TopUpMediumIcon";