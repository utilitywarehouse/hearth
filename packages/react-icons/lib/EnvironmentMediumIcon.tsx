import { forwardRef } from 'react';
import { IconProps } from './types';
export const EnvironmentMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M12.2 3.797q-3.35 0-5.675 2.325T4.2 11.797q0 1.4.438 2.65a7.9 7.9 0 0 0 1.237 2.275L4.5 18.097l-.7.7 1.405 1.406L6.5 18.909l.801-.787a7.85 7.85 0 0 0 4.9 1.675q3.35 0 5.675-2.325t2.325-5.675v-8zm2 7.013q0 .412-.3.712l-3.925 3.925q-.3.3-.725.313a.84.84 0 0 1-.7-.313 1.02 1.02 0 0 1-.275-.712q0-.412.275-.688l3.95-3.95a.95.95 0 0 1 .7-.275q.425 0 .7.275.3.3.3.713" /></svg>;
});
EnvironmentMediumIcon.displayName = "EnvironmentMediumIcon";