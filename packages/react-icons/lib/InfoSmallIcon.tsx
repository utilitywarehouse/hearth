import { forwardRef } from 'react';
import { IconProps } from './types';
export const InfoSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M8.986 13.963h2.028v-4.7H8.986zM10 8.157q.47 0 .788-.318a1.07 1.07 0 0 0 .318-.788 1.07 1.07 0 0 0-.318-.788A1.07 1.07 0 0 0 10 5.945a1.07 1.07 0 0 0-.788.318 1.07 1.07 0 0 0-.318.788q0 .47.318.788t.788.318M10 18a7.8 7.8 0 0 1-3.133-.628 8.1 8.1 0 0 1-2.533-1.706 8.1 8.1 0 0 1-1.706-2.533A7.8 7.8 0 0 1 2 10q0-1.678.628-3.133a8.1 8.1 0 0 1 1.706-2.533 8.1 8.1 0 0 1 2.533-1.706A7.8 7.8 0 0 1 10 2q1.678 0 3.133.628a8.1 8.1 0 0 1 2.533 1.706 8.1 8.1 0 0 1 1.706 2.533Q18 8.322 18 10t-.628 3.133a8.1 8.1 0 0 1-1.706 2.533 8.1 8.1 0 0 1-2.533 1.706A7.8 7.8 0 0 1 10 18" /></svg>;
});
InfoSmallIcon.displayName = "InfoSmallIcon";