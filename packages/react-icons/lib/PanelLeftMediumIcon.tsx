import { forwardRef } from 'react';
import { IconProps } from './types';
export const PanelLeftMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M5 21q-.824 0-1.412-.587A1.93 1.93 0 0 1 3 19V5q0-.824.587-1.412A1.93 1.93 0 0 1 5 3h14q.824 0 1.413.587Q21 4.176 21 5v14q0 .824-.587 1.413A1.93 1.93 0 0 1 19 21zm3-2V5H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1zm2 0h8a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-8z"
        />
      </svg>
    );
  }
);
PanelLeftMediumIcon.displayName = 'PanelLeftMediumIcon';
