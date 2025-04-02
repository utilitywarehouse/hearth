import { forwardRef } from 'react';
import { IconProps } from './types';
export const ErrorCircleSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M9.996 14q.316 0 .535-.214a.7.7 0 0 0 .219-.532.74.74 0 0 0-.214-.535.7.7 0 0 0-.532-.219.74.74 0 0 0-.535.214.7.7 0 0 0-.219.532q0 .316.214.535t.532.219m-.746-3h1.5V6h-1.5zm.756 7a7.8 7.8 0 0 1-3.11-.625 8.1 8.1 0 0 1-2.552-1.719 8.1 8.1 0 0 1-1.719-2.551A7.8 7.8 0 0 1 2 9.99q0-1.657.625-3.105a8.07 8.07 0 0 1 4.27-4.26A7.8 7.8 0 0 1 10.01 2a7.75 7.75 0 0 1 3.105.625q1.447.625 2.541 1.719a8.1 8.1 0 0 1 1.719 2.546A7.8 7.8 0 0 1 18 9.994a7.8 7.8 0 0 1-.625 3.11 8.1 8.1 0 0 1-1.719 2.552 8.1 8.1 0 0 1-2.546 1.719 7.8 7.8 0 0 1-3.104.625"
        />
      </svg>
    );
  }
);
ErrorCircleSmallIcon.displayName = 'ErrorCircleSmallIcon';
