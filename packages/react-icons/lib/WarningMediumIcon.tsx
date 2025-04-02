import { forwardRef } from 'react';
import { IconProps } from './types';
export const WarningMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M1 21 12 2l11 19zm11-3q.424 0 .713-.288A.97.97 0 0 0 13 17a.97.97 0 0 0-.287-.712A.97.97 0 0 0 12 16a.97.97 0 0 0-.713.288A.97.97 0 0 0 11 17q0 .424.287.712.288.288.713.288m-1-4a1 1 0 1 0 2 0v-3a1 1 0 1 0-2 0z" /></svg>;
});
WarningMediumIcon.displayName = "WarningMediumIcon";