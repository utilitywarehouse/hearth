import { forwardRef } from 'react';
import { IconProps } from './types';
export const ShoppingSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M3.333 18.333V5h3.334c0-.917.333-1.667 1-2.333.666-.667 1.416-1 2.333-1s1.667.333 2.333 1c.667.666 1 1.416 1 2.333h3.334v13.333zM8.333 5h3.334c0-.5-.167-.833-.5-1.167-.334-.333-.75-.5-1.167-.5s-.833.167-1.167.5c-.333.334-.5.75-.5 1.167M7.5 9.167c.5 0 .833-.334.833-.834V7.5c0-.5-.333-.833-.833-.833S6.667 7 6.667 7.5v.833c0 .5.333.834.833.834m5 0c.5 0 .833-.334.833-.834V7.5c0-.5-.333-.833-.833-.833s-.833.333-.833.833v.833c0 .5.333.834.833.834" /></svg>;
});
ShoppingSmallIcon.displayName = "ShoppingSmallIcon";