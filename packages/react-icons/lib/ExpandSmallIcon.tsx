import { forwardRef } from 'react';
import { IconProps } from './types';
export const ExpandSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m10 18.9-4.5-4.5 1.45-1.45L10 16l3.05-3.05 1.45 1.45zM6.95 6.95 5.5 5.5 10 1l4.5 4.5-1.45 1.45L10 3.9z"
        />
      </svg>
    );
  }
);
