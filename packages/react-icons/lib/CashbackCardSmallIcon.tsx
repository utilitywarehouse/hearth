import { forwardRef } from 'react';
import { IconProps } from './types';
export const CashbackCardSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M2 3.5v13h16v-13zM16.4 10H3.6V6.75h12.8z" /></svg>;
});
CashbackCardSmallIcon.displayName = "CashbackCardSmallIcon";