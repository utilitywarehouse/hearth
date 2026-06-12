import { forwardRef } from 'react';
import { IconProps } from './types';
export const MoneyMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M2 6v12h20V6zm2 10v-2c.5 0 1 .2 1.4.6s.6.9.6 1.4zm1.4-6.6c-.4.4-.9.6-1.4.6V8h2c0 .5-.2 1-.6 1.4m8.7 4.7q-.9.9-2.1.9t-2.1-.9T9 12t.9-2.1T12 9t2.1.9.9 2.1-.9 2.1M20 16h-2c0-.5.2-1 .6-1.4s.9-.6 1.4-.6zm0-6c-.5 0-1-.2-1.4-.6S18 8.5 18 8h2z" /></svg>;
});
MoneyMediumIcon.displayName = "MoneyMediumIcon";