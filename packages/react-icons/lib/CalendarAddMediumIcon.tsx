import { forwardRef } from 'react';
import { IconProps } from './types';
export const CalendarAddMediumIcon = forwardRef<SVGSVGElement, IconProps>(
  ({ color = 'currentColor', title, titleId, ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={24}
        height={24}
        fill="none"
        viewBox="0 0 24 24"
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
          d="M17 22.55v-3h-3v-2h3v-3h2v3h3v2h-3v3zm-14-3v-16h3v-2h2v2h6v-2h2v2h3v9h-2v-3H5v8h7v2z"
        />
      </svg>
    );
  }
);
CalendarAddMediumIcon.displayName = 'CalendarAddMediumIcon';
