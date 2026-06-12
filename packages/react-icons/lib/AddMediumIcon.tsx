import { forwardRef } from 'react';
import { IconProps } from './types';
export const AddMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M13.131 22.182H10.87v-9.05H1.818v-2.263h9.05V1.818h2.263v9.05h9.051v2.263h-9.05z" /></svg>;
});
AddMediumIcon.displayName = "AddMediumIcon";