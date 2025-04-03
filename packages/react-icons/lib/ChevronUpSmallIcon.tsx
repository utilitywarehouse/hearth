import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronUpSmallIcon = forwardRef<SVGSVGElement, IconProps>(
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
          d="m10 8.934-5.449 5.449-1.658-1.658L10 5.617l7.107 7.108-1.658 1.658z"
        />
      </svg>
    );
  }
);
ChevronUpSmallIcon.displayName = 'ChevronUpSmallIcon';
