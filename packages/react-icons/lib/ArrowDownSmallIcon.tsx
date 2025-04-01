import { forwardRef } from 'react';
import { IconProps } from './types';
export const ArrowDownSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M11.104 2.933v9.899l4.408-4.408L17.067 10 10 17.067 2.933 10l1.555-1.576 4.408 4.408v-9.9z"
        />
      </svg>
    );
  }
);
