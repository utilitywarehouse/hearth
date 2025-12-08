import { forwardRef } from 'react';
import { IconProps } from './types';
export const CalendarAddSmallIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', title, titleId, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={20}
        height={20}
        fill="none"
        viewBox="0 0 20 20"
        aria-hidden={!title}
        focusable="false"
        role="img"
        ref={ref}
        aria-labelledby={titleId}
        {...props}
      >
        {title ? <title id={titleId}>{title}</title> : null}
        <path
          fill={color}
          d="M13.79 19v-2.571h-2.527v-1.715h2.527v-2.571h1.684v2.571H18v1.715h-2.526V19zM2 16.429V2.714h2.526V1h1.685v1.714h5.052V1h1.684v1.714h2.527v7.715H13.79V7.857H3.684v6.857H9.58v1.715z"
        />
      </svg>
    );
  }
);
CalendarAddSmallIcon.displayName = 'CalendarAddSmallIcon';
