import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronLeftSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m8.934 10 5.449 5.449-1.658 1.659L5.617 10l7.108-7.107 1.658 1.658z"
        />
      </svg>
    );
  }
);
ChevronLeftSmallIcon.displayName = 'ChevronLeftSmallIcon';
