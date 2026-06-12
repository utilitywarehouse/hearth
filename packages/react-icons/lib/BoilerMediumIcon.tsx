import { forwardRef } from 'react';
import { IconProps } from './types';
export const BoilerMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M4 2v18h5v2h2v-2h2v2h2v-2h5V2zm6.12 5.11c.41-.61 1.04-1.28 1.88-1.99.84.71 1.47 1.38 1.88 1.99.41.6.62 1.18.62 1.69 0 .74-.24 1.35-.72 1.84-.47.49-1.06.73-1.78.73s-1.31-.24-1.78-.73c-.48-.49-.72-1.1-.72-1.84 0-.51.21-1.09.62-1.69M16 16H8v-2h8z" /></svg>;
});
BoilerMediumIcon.displayName = "BoilerMediumIcon";