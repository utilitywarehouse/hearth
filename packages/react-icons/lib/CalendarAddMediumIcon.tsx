import { forwardRef } from 'react';
import { IconProps } from './types';
export const CalendarAddMediumIcon = forwardRef<SVGSVGElement, IconProps>(({
  color = 'currentColor',
  title,
  titleId,
  ...props
}, ref) => {
  return <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} fill="none" viewBox="0 0 24 24" aria-hidden={!title} focusable="false" role="img" ref={ref} aria-labelledby={titleId} {...props}>{title ? <title id={titleId}>{title}</title> : null}<path fill={color} d="M15.989 22v-2.76h-2.677v-2.422h2.677v-2.76h2.334v2.76H21v2.422h-2.677V22zM3 19.861V3.533h3.38V2h1.98v1.533h4.804V2h1.986v1.533h3.39v8.87q-.611-.176-1.183-.188a6.3 6.3 0 0 0-1.168.088V9.865H5.336v7.59h6.223q-.075.613 0 1.203t.26 1.203z" /></svg>;
});
CalendarAddMediumIcon.displayName = "CalendarAddMediumIcon";