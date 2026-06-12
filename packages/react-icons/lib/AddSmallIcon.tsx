import { forwardRef } from 'react';
import { IconProps } from './types';
export const AddSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M10.849 17.637H9.15v-6.789H2.363V9.151h6.788V2.363h1.697v6.788h6.789v1.697h-6.789z" /></svg>;
});
AddSmallIcon.displayName = "AddSmallIcon";