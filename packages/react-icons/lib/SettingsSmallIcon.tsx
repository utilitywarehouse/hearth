import { forwardRef } from 'react';
import { IconProps } from './types';
export const SettingsSmallIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} fill="none" viewBox="0 0 20 20" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m8.27 17.813-.458-2.375A7.5 7.5 0 0 1 6.885 15a5.4 5.4 0 0 1-.843-.583l-2.292.77-1.604-2.77 1.812-1.584a6 6 0 0 1-.062-1.541q.021-.25.062-.5L2.146 7.208l1.604-2.77 2.292.77q.396-.333.843-.583a7.5 7.5 0 0 1 .927-.437l.459-2.375h3.208l.459 2.375q.479.187.927.437t.843.583L16 4.438l1.604 2.77-1.812 1.584a6 6 0 0 1 .083 1.02 6 6 0 0 1-.083 1.021l1.812 1.584L16 15.187l-2.292-.77a5.4 5.4 0 0 1-.843.583 7.5 7.5 0 0 1-.928.438l-.458 2.374zm1.605-5q1.25 0 2.125-.876a2.9 2.9 0 0 0 .875-2.124q0-1.25-.875-2.126a2.9 2.9 0 0 0-2.125-.875q-1.25 0-2.125.875a2.9 2.9 0 0 0-.875 2.125q0 1.25.875 2.126a2.9 2.9 0 0 0 2.125.874" /></svg>;
});
SettingsSmallIcon.displayName = "SettingsSmallIcon";