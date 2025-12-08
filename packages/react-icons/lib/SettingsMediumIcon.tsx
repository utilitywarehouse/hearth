import { forwardRef } from 'react';
import { IconProps } from './types';
export const SettingsMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="m9.472 22.333-.4-3.2a4 4 0 0 1-.612-.3 8 8 0 0 1-.563-.375l-2.975 1.25-2.75-4.75 2.575-1.95a2.4 2.4 0 0 1-.025-.337v-.675q0-.163.025-.338l-2.575-1.95 2.75-4.75 2.975 1.25q.275-.2.575-.375.3-.174.6-.3l.4-3.2h5.5l.4 3.2q.325.126.613.3.287.175.562.375l2.975-1.25 2.75 4.75-2.575 1.95q.025.176.025.338v.675q0 .162-.05.337l2.575 1.95-2.75 4.75-2.95-1.25a7 7 0 0 1-.575.375q-.3.175-.6.3l-.4 3.2zm2.8-6.5q1.45 0 2.475-1.025a3.37 3.37 0 0 0 1.025-2.475q0-1.449-1.025-2.475a3.37 3.37 0 0 0-2.475-1.025q-1.475 0-2.487 1.025a3.4 3.4 0 0 0-1.013 2.475q0 1.45 1.013 2.475t2.487 1.025" /></svg>;
});
SettingsMediumIcon.displayName = "SettingsMediumIcon";