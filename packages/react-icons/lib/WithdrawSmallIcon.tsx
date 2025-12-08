import { forwardRef } from 'react';
import { IconProps } from './types';
export const WithdrawSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M15.833 17.5H17.5v-15h-15v8.333h1.667V4.167h11.666v11.666H9.167V17.5zM4.167 19.167 5.333 18l-1.312-1.333H7.5V15H4.02l1.313-1.333L4.167 12.5.833 15.833zm1.666-8.334V9.167h8.334v1.666z" /></svg>;
});
WithdrawSmallIcon.displayName = "WithdrawSmallIcon";