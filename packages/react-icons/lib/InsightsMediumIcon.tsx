import { forwardRef } from 'react';
import { IconProps } from './types';
export const InsightsMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M3.735 18 2 16.32l6.209-6.018a2 2 0 0 1 2.786.002l1.753 1.704a1 1 0 0 0 1.397-.002l3.691-3.615h-2.56V6H22v6.53h-2.444v-2.444l-4.73 4.616a2 2 0 0 1-2.79.003l-1.752-1.703a1 1 0 0 0-1.394 0z" /></svg>;
});
InsightsMediumIcon.displayName = "InsightsMediumIcon";