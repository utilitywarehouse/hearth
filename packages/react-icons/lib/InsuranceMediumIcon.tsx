import { forwardRef } from 'react';
import { IconProps } from './types';
export const InsuranceMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12h9v7c0 .6-.4 1-1 1s-1-.4-1-1v-1H7v1c0 1.7 1.3 3 3 3s3-1.3 3-3v-7z" /></svg>;
});
InsuranceMediumIcon.displayName = "InsuranceMediumIcon";