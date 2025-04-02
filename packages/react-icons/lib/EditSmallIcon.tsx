import { forwardRef } from 'react';
import { IconProps } from './types';
export const EditSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M3 17.125v-3.187L14.438 2.5l3.187 3.188L6.188 17.124zM13.969 6.219a.73.73 0 1 0 1.03-1.032l-.03-.03a.73.73 0 1 0-1.031 1.03z" /></svg>;
});
EditSmallIcon.displayName = "EditSmallIcon";