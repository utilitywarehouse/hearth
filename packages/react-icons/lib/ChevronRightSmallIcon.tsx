import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronRightSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="M11.066 10 5.617 4.551l1.658-1.658L14.383 10l-7.108 7.107-1.658-1.658z"
        />
      </svg>
    );
  }
);
ChevronRightSmallIcon.displayName = 'ChevronRightSmallIcon';
