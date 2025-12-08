import { forwardRef } from 'react';
import { IconProps } from './types';
export const UserSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M10 10q-1.547 0-2.648-1.102Q6.25 7.797 6.25 6.25t1.102-2.648Q8.453 2.5 10 2.5t2.648 1.102Q13.75 4.703 13.75 6.25t-1.102 2.648T10 10m-7.5 7.5v-2.625q0-.797.41-1.465A2.73 2.73 0 0 1 4 12.39a14 14 0 0 1 2.953-1.09q1.5-.362 3.047-.363 1.547 0 3.047.364 1.5.363 2.953 1.09.68.351 1.09 1.02.41.667.41 1.464V17.5z" /></svg>;
});
UserSmallIcon.displayName = "UserSmallIcon";