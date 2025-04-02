import { forwardRef } from 'react';
import { IconProps } from './types';
export const ChevronUpMediumIcon = forwardRef<SVGSVGElement, IconProps>(
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
        <path fill={color} d="M22.283 16.141 20.408 18 12.14 9.734 3.875 18 2 16.141 12.141 6z" />
      </svg>
    );
  }
);
ChevronUpMediumIcon.displayName = 'ChevronUpMediumIcon';
