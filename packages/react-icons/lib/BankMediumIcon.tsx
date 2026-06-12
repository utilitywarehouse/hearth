import { forwardRef } from 'react';
import { IconProps } from './types';
export const BankMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M5.7 17.4v-6.3h1.8v6.3zm5.4 0v-6.3h1.8v6.3zM3 21v-1.8h18V21zm13.5-3.6v-6.3h1.8v6.3zM3 9.3V7.5L12 3l9 4.5v1.8z" /></svg>;
});
BankMediumIcon.displayName = "BankMediumIcon";